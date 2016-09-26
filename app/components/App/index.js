/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import DevTools from 'mobx-react-devtools'
import { Provider } from 'mobx-react'
import store from '../../store'
import AppBar from '../../components/AppBar'
import styles from './styles.css'

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentWillMount() {
    // TODO: check if logged in
    /* see: http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488 */
  }

  render() {
    const theme = Object.assign({}, darkBaseTheme, {
      appBar: {
        height: 51,
      },
    })
    return (
      <Provider store={store}>
        <MuiThemeProvider
          muiTheme={getMuiTheme(theme)}
          className={styles.content}
        >
          <div
            className={styles.content}
          >
            <DevTools />
            <AppBar {...this.props} />
            {React.Children.toArray(this.props.children)}
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}
