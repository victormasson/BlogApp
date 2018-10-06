import * as React from 'react'
import { Route as Route } from 'react-router-dom'

// Pages
import About from '../page/about/About'
import Articles from '../page/articles/Articles'
import Home from '../page/home/Home'

const Routes = () => {
  return (
    <div>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/home" component={Home} />
      <Route exact={true} path="/articles" component={Articles} />
      <Route exact={true} path="/about" component={About} />
    </div>
  )
}

export default Routes