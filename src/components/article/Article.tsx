import * as React from 'react'

// Style
import './Article.css';

export interface IArticleProps {
  name: string,
  date: Date,
  text: string,
  author: string,
  tags: ITag[],
  _id: string,
}

export interface ITag {
  name: string,
  color: string,
  _id: string,
}

export class Article extends React.Component<IArticleProps> {

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

  public render() {
    return (
      <div key={this.props._id} className="card border-primary mb-3" >
        <div className="card-header">{this.props.author}</div>
        <div className="card-body">
          <h4 className="card-title">{this.props.name}</h4>
          <p className="card-text text-justify">{this.props.text}</p>
          <p className="card-text">{this.props.date.toString() !== null ?
            new Date(this.props.date.toString()).toDateString() : ""}</p>
          < p >
            {
              this.props.tags.map((item, index) => index % 2 ?
                <a href="#" className="badge badge-light" key={index}>{item.name}</a>
                : <a href="#" className="badge badge-dark" key={index}>{item.name}</a>)
            }
          </p>
        </div>
      </div>
    )
  }
}