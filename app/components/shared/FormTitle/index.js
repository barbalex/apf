import React, { PropTypes } from 'react'
import styles from './styles.css'

const FormTitle = ({ title }) =>
  <div className={styles.container}>
    <div className={styles.title}>
      {title}
    </div>
  </div>

FormTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

export default FormTitle
