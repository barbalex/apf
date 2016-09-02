/*
 * BenutzerPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import Helmet from 'react-helmet'

export default class BenutzerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        <Helmet
          title="AP Flora Benutzer"
          meta={[
            { name: 'description', content: 'Benutzer von apfora.ch' },
          ]}
        />
        this is Benutzer page
      </div>
    )
  }
}
