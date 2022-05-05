import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export default function index() {
  const indicator = <LoadingOutlined style={{ fontSize: 24 }} spin />
  return <Spin indicator={indicator} />
}
