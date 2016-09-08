/*
 *
 * Arten
 *
 */

import React from 'react'
import Helmet from 'react-helmet'
import styles from './styles.css'

export default class Arten extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.arten}>
        <Helmet
          title="AP Flora: Arten"
          meta={[
            { name: 'description', content: 'Description of Arten' },
          ]}
        />
        Arten Page
      </div>
    )
  }
}
