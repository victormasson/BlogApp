import Axios from 'axios'
import * as React from 'react'
import { Article, IArticleProps } from '../../components/article/Article'
import Server from '../../http/server';
import { ILink } from './../../class/Link'
import { Breadcrumb } from './../../components/breadcrumb/Breadcrumb'

export interface IArticlesPageProps {
  key: number
}

export interface IArticlesPageState {
  listArticle: IArticleProps[],
  isLoading: boolean,
}

export default class ArticlesPage extends React.Component<any, IArticlesPageState> {

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      listArticle: []
    }
  }

  componentDidMount() {
    this.getArticles()
  }
  async getArticles() {

    try {
      console.log(Server.getApiArticles())
      const response = await Axios.get<IArticleProps[]>(Server.getApiArticles())
        .then(res => {
          this.setState({
            isLoading: true,
            listArticle: res.data
          })

          res.data.map(d => {
            console.log(d)
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
        listArticle: []
      })
    }
  }

  public render() {
    return this.state.listArticle.length >= 0 ? (
      <div>
        <Breadcrumb listLink={this.getLinks()} />
        {
          this.state.listArticle.map(item =>
            <Article key={item._id} _id={item._id} name={item.name} date={item.date} tags={item.tags} text={item.text} author={item.author} />
          )
        }
      </div>
    ) : (
        <div>
          <i>There is no article.</i>
        </div>
      )
  }

  public getLinks(): ILink[] {
    const l1: ILink = { name: "Articles", path: "/articles", position: 1, active: false }
    const links: ILink[] = [l1]
    return links
  }
}