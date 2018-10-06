import * as React from 'react'

interface IMyCompProps {
  name: 'tech' | 'interview'
}

const Mycomp = (props: IMyCompProps) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

export default Mycomp