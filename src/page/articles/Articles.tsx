import Axios from 'axios'
import * as React from 'react'
import { Article as Article, IArticleProps as IArticleProps } from '../../components/article/Article'
import Server from '../../http/server';

export interface IArticlesProps {
  key: number
}

export interface IArticlesState {
  listArticle: IArticleProps[],
  isLoading: boolean,
}

export default class Articles extends React.Component<{}, IArticlesState> {

  constructor({ }) {
    super({});
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
      const response = await Axios.get<IArticleProps[]>(Server.getApiArticles())
        .then(res => {
          this.setState({
            isLoading: true,
            listArticle: res.data
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
    }
  }

  public render() {
    // const listArticle = [{
    //   key: "1",
    //   name: "Name",
    //   date: new Date(),
    //   tags: ["Tag1", "Tag2"],
    //   text: "Text",
    //   author: "John"
    // }, {
    //   key: "2",
    //   name: "Name2",
    //   date: new Date("2018/10/01"),
    //   tags: ["Tag1", "Tag2"],
    //   text: "Text2",
    //   author: "Vic"
    // }]

    return (
      <div>
        {
          this.state.listArticle.sort((a, b) => a.date.getTime() + b.date.getTime()).map(item =>
            <Article key={item._id} name={item.name} date={item.date} tags={item.tags} text={item.text} author={item.author} />
          )
        }
      </div>
    )
  }
}