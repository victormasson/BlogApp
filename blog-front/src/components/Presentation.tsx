import * as React from 'react'

export interface IPresentationProps {
  name: string;
  isMarried: boolean;
}

export interface IPresentationState {
  age: number;
}

export default class Presentation extends React.Component<IPresentationProps, IPresentationState> {

  public static defaultProps: Partial<IPresentationProps> = {
    isMarried: false,
    name: "someone",
  }

  public state = {
    age: 24
  }

  public render() {
    return (
      <div>
        <p className="App-intro">
          I'm <b>{this.props.name}</b> and I'm <code>developer</code> and I'm <i>{this.renderMarried()}</i> and I'm <u>{this.state.age}</u>yo
          {/* To get started, edit <code>src/App.tsx</code> and save to reload. */}
        </p>
      </div>
    )
  }

  public renderMarried(): string {
    return this.props.isMarried ? (
      "married"
    ) : (
        "not married"
      )
  }
}
