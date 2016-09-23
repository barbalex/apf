/*
 *
 * Benutzer
 *
 */

import React from 'react'
import Helmet from 'react-helmet'
import styles from './styles.css'

export default class Benutzer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.benutzer}>
        <Helmet
          title="AP Flora: Benutzer"
          meta={[
            { name: 'description', content: 'Description of Benutzer' },
          ]}
        />
        Benutzer
      </div>
    )
  }
}
