import Axios from 'axios'
import * as React from 'react'
import { Article, IArticleProps } from '../../components/article/Article'
import Server from '../../http/server'
import { ILink } from './../../class/Link'
import { Breadcrumb } from './../../components/breadcrumb/Breadcrumb'

export interface IArticlesPageProps {
  key: number
}

export interface IArticlesPageProps {
  article: IArticleProps,
  isLoading: boolean,
}

export interface IArticlesPageState {
  article: IArticleProps,
  isLoading: boolean,
}

export default class ArticlesPage extends React.Component<any, IArticlesPageState> {

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      article: {
        _id: '',
        author: '',
        date: new Date(),
        name: '',
        tags: [],
        text: ''
      }
    }
  }

  componentDidMount() {
    const idArticle = this.props.match.params.id
    this.getArticle(idArticle)
  }

  async getArticle(idArticle: string) {
    try {
      console.log(Server.getApiArticles())
      const response = await Axios.get<IArticleProps>(Server.getApiArticleById() + idArticle)
        .then(res => {
          this.setState({
            isLoading: true,
            article: res.data
          })
        })
        .then(() => {
          this.setState({
            isLoading: false
          })
        })
      console.log(response)
    } catch (error) {
      console.error(error)
      this.setState({
        isLoading: false,
        article: {
          _id: '',
          author: '',
          date: new Date(),
          name: '',
          tags: [],
          text: ''
        }
      })
    }
  }

  public render() {
    return this.state.article !== undefined ? (
      <div>
        <Breadcrumb listLink={this.getLinks()} />
        <Article key={this.state.article._id} _id={this.state.article._id} name={this.state.article.name} date={this.state.article.date} tags={this.state.article.tags} text={this.state.article.text} author={this.state.article.author} />
      </div>
    ) : (
        <div>
          <i>There is no article.</i>
        </div>
      )
  }

  public getLinks(): ILink[] {
    const l1: ILink = { name: "Articles", path: "/articles", position: 1, active: true }
    const l2: ILink = { name: this.state.article.name, path: "", position: 2, active: false }
    const links: ILink[] = [l1, l2]
    return links
  }
}