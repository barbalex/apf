/*
 *
 * Benutzer
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import selectBenutzer from './selectors'
import styles from './styles.css'

export class Benutzer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.benutzer}>
        <Helmet
          title="Benutzer"
          meta={[
            { name: 'description', content: 'Description of Benutzer' },
          ]}
        />
        This is Benutzer page
      </div>
    )
  }
}

const mapStateToProps = selectBenutzer()

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Benutzer)
