import './App.less'
import { Button } from 'antd'
import { Component } from 'react'

const testHOC = WrapperComponent => {
  return class HocComponent extends Component {
    render() {
      return (
        <>
          <WrapperComponent />
          <div>这是HOC中的信息</div>
        </>
      )
    }
  }
}

@testHOC
export default class App extends Component {
  render() {
    return (
      <div>
        App
        <Button type="primary">测试按钮</Button>
      </div>
    )
  }
}

// export default testHOC(App)
