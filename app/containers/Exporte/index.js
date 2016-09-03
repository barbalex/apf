/*
 *
 * Exporte
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectExporte from './selectors';
import styles from './styles.css';

export class Exporte extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.exporte}>
        <Helmet
          title="Exporte"
          meta={[
            { name: 'description', content: 'Description of Exporte' },
          ]}
        />
        Exporte Page
      </div>
    );
  }
}

const mapStateToProps = selectExporte();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Exporte);
