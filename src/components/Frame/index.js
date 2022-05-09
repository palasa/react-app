import { useNavigate, useParams } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { adminRoutes } from '../../routes'
import logo from './logo.png'
import './frame.less'

function Frame(props) {
  const navigate = useNavigate()
  const params = useParams()
  const key = '*'
  const menuSelectedKeys = '/' + params[key].split('/')[0]
  const { Header, Content, Footer, Sider } = Layout

  const onMenuItemClick = ({ key, keyPath, domEvent }) => {
    // console.log( key, keyPath, domEvent)
    navigate(`/admin${key}`)
    // console.log(params)
  }

  const menuItems = adminRoutes
    .filter(item => item.isNav)
    .map((item, index) => {
      return {
        key: item.path,
        icon: item.icon,
        label: item.title,
        // children: [],
        // type: null,
        onClick: onMenuItemClick,
      }
    })

  // console.log(menuItems)

  return (
    <Layout style={{ minHeight: '100%' }}>
      <Header className="header pr-header">
        <div className="logo pr-logo">
          <img src={logo} alt="logo" />
        </div>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Layout
          className="site-layout-background"
          style={{
            padding: '24px 0',
          }}
        >
          <Sider
            className="site-layout-background"
            width={200}
            style={{ height: '500px' }}
          >
            <Menu
              mode="inline"
              style={{
                height: '100%',
              }}
              items={menuItems}
              defaultSelectedKeys={[menuSelectedKeys]}
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default Frame
