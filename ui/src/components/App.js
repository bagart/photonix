import React from 'react'
import Cookies from 'js-cookie'
import { Route, Switch } from 'react-router-dom'
import { ModalRoute } from 'react-router-modal'
import { refreshToken, logIn } from '../auth'
import 'normalize.css'
import 'react-router-modal/css/react-router-modal.css'

import BrowseContainer from '../containers/BrowseContainer'
import ComponentsBrowser from '../components/ComponentsBrowser'
import Login from '../components/Login'
import Logout from '../components/Logout'
import PhotoDetailContainer from '../containers/PhotoDetailContainer'
import Onboarding from '../components/Onboarding'
import Settings from '../components/Settings'
import Account from '../components/Account'
import history from '../history'
import '../static/css/App.css'
import '../static/css/typography.css'

if (Cookies.get('refreshToken')) {
  logIn()
  refreshToken()
} else {
  history.push('/login')
}

const App = ({
  selectedFilters,
  onFilterToggle,
  onClearFilters,
  search,
  updateSearchText,
}) => (
  <>
    <Switch>
      <Route path="/login" render={() => <Login />} />
      <Route path="/logout" render={() => <Logout />} />
      <Route path="/components" render={ComponentsBrowser} />
      <Route
        path="/"
        render={() => (
          <BrowseContainer
            selectedFilters={selectedFilters}
            onFilterToggle={onFilterToggle}
            onClearFilters={onClearFilters}
            search={search}
            updateSearchText={updateSearchText}
          />
        )}
      />
    </Switch>
    <Switch>
      <ModalRoute path="/account" parentPath="/" component={Account} />
      <ModalRoute
        path="/onboarding"
        parentPath="/"
        component={Onboarding}
        onBackdropClick={() => {}}
      />
      <ModalRoute path="/settings" parentPath="/" component={Settings} />
      <ModalRoute
        path="/photo/:photoId"
        parentPath="/"
        component={PhotoDetailContainer}
      />
    </Switch>
  </>
)

export default App
