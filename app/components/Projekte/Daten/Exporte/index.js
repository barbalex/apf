import React from 'react'
import FormTitle from '../../../shared/FormTitle'
import styles from './styles.css'

export default class Exporte extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.container}>
        <FormTitle title="Exporte" />
        <div className={styles.fieldsContainer}>
          Exporte
        </div>
      </div>
    )
  }
}
