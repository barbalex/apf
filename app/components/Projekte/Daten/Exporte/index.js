/*
 *
 * Exporte
 *
 */

import React from 'react'
import Helmet from 'react-helmet'
import styles from './styles.css'

export default class Exporte extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.exporte}>
        <Helmet
          title="AP Flora: Exporte"
          meta={[
            { name: 'description', content: 'Description of Exporte' },
          ]}
        />
        Exporte
      </div>
    )
  }
}
