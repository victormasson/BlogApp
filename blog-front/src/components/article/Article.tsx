import * as React from 'react'
import { Link } from 'react-router-dom'

export interface ITag {
  name: string,
  color: string,
  _id: string,
}

export interface IArticleProps {
  name: string,
  date: Date,
  text: string,
  author: string,
  tags: ITag[],
  _id: string,
}

interface IArticleState {
  defautPath: string,
  articlePath: string
}


export class Article extends React.Component<IArticleProps, IArticleState> {

  public static defaultProps: Partial<IArticleProps> = {
    _id: "",
    name: "testName",
    date: new Date(),
    tags: [{
      name: "Tag1",
      color: "red",
      _id: "1"
    }],
    text: "testText",
    author: "John"
  }

  constructor(props: IArticleProps) {
    super(props)
    this.state = {
      defautPath: '/articles/',
      articlePath: `/articles/${props._id}`
    }

    // console.log(props)
  }

  componentDidMount() {
    this.setState({
      articlePath: this.state.defautPath + this.props._id
    })
  }

  componentWillReceiveProps() {
    this.setState({
      articlePath: this.state.defautPath + this.props._id
    })
  }

  public render() {
    return (
      <div key={this.props._id} className="card border-primary mb-3" >
        <div className="card-header">{this.props.author}</div>
        <div className="card-body">
          <Link className="nav-link" to={this.state.articlePath} >
            <h4 className="card-title">{this.props.name}</h4>
          </Link>
          <p className="card-text text-justify">{this.props.text}</p>
          <p className="card-text">{this.props.date.toString() !== null ?
            new Date(this.props.date.toString()).toDateString() : ""}</p>
          <p>
            {
              this.props.tags !== null ? this.props.tags.map((item, index) => index % 2 ?
                <a href="#" className="badge badge-light" key={index}>{item.name}</a>
                : <a href="#" className="badge badge-dark" key={index}>{item.name}</a>) : null
            }
          </p>
        </div>
      </div>
    )
  }
}