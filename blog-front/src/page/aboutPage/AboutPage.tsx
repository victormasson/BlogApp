import * as React from 'react'

// Components
import Mycomp from '../../components/MyComp'
import Presentation from '../../components/Presentation'

export default class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <Presentation name={'Victor'} isMarried={false} />
        <Mycomp name={'tech'} />
      </div>
    )
  }
}