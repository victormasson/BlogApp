import * as React from 'react'
import { Route as Route } from 'react-router-dom'

// Pages
import AboutPage from '../page/aboutPage/AboutPage'
import ArticlePage from '../page/articlePage/ArticlePage'
import ArticlesPage from '../page/articlePage/ArticlesPage'
import ChatPage from '../page/chatPage/ChatPage'
import HomePage from '../page/homePage/HomePage'

const Routes = () => {
  return (
    <div>
      <Route exact={true} path="/" component={HomePage} />
      <Route exact={true} path="/home" component={HomePage} />
      <Route exact={true} path="/articles/:id" component={ArticlePage} />
      <Route exact={true} path="/articles" component={ArticlesPage} />
      <Route exact={true} path="/chat" component={ChatPage} />
      <Route exact={true} path="/about" component={AboutPage} />
    </div>
  )
}

export default Routes