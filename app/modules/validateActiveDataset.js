import _forEach from 'lodash/forEach'
import Joi from 'joi-browser'

export default (activeDataset, allFields) => {
  const { table, row, valid } = activeDataset
  if (!valid) {
    throw new Error(`valid object missing`)
  }
  if (!table || !row || !allFields || !allFields.length) {
    console.log(`validateActiveDataset: table, row or fields missing`)  // eslint-disable-line no-console
    return valid
  }
  const fields = allFields.filter(f => f.table_schema === `apflora` && f.table_name === table)
  if (fields.length === 0) {
    console.log(`validateActiveDataset: no fields found for table ${table}`)  // eslint-disable-line no-console
    return valid
  }

  _forEach((row), (value, key) => {
    let validDataType = true
    const field = fields.find(f => f.column_name === key)
    if (field) {
      // TODO: validate
      const dataType = field.data_type
      switch (dataType) {
        case `integer`: {
          validDataType = Joi.validate(value, Joi.number().integer().min(-2147483648).max(+2147483647))
          break
        }
        case `smallint`: {
          validDataType = Joi.validate(value, Joi.number().integer().min(-32768).max(+32767))
          break
        }
        case `double precision`: {
          validDataType = Joi.validate(value, Joi.number().precision(15))
          break
        }
        case `character varying`: {
          validDataType = Joi.validate(value, Joi.string().allow(``))
          // - if field type is varchar: check if value length complies to character_maximum_length
          const maxLen = field.character_maximum_length
          if (!validDataType.error && maxLen) {
            validDataType = Joi.validate(value, Joi.string().max(maxLen))
          }
          break
        }
        case `uuid`: {
          validDataType = Joi.validate(value, Joi.string().guid())
          break
        }
        case `date`: {
          validDataType = Joi.validate(value, Joi.string())
          break
        }
        case `text`: {
          validDataType = Joi.validate(value, Joi.string().allow(``))
          break
        }
        default:
          // do nothing
      }
      if (validDataType && validDataType.error && validDataType.error.message) {
        valid[key] = validDataType.error.message
      } else if (valid[key] !== ``) {
        valid[key] = ``
      }
    }
  })
}
