/*
 *
 * Programme
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectProgramme from './selectors';
import styles from './styles.css';

export class Programme extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.programme}>
        <Helmet
          title="Programme"
          meta={[
            { name: 'description', content: 'Description of Programme' },
          ]}
        />
        Programme Page
      </div>
    );
  }
}

const mapStateToProps = selectProgramme();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Programme);
