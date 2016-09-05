/*
 *
 * Arten
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import selectArten from './selectors'
import styles from './styles.css'

export class Arten extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.arten}>
        <Helmet
          title="Arten"
          meta={[
            { name: 'description', content: 'Description of Arten' },
          ]}
        />
        Arten Page
      </div>
    )
  }
}

const mapStateToProps = selectArten()

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Arten)
