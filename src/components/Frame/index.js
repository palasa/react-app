import { useNavigate } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd'
import { adminRoutes } from '../../routes'
import logo from './logo.png'
import './frame.less'

function Frame(props) {

  const navigate = useNavigate()
  const { Header, Content, Footer, Sider } = Layout

  const onMenuItemClick = ({ item, key, keyPath, domEvent }) => {
    // console.log(item, key, keyPath, domEvent)
    navigate(`/admin${key}`)
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

  

  return (
    <Layout>
      <Header className="header pr-header">
        <div className="logo pr-logo">
          <img
            src={logo}
            alt="logo"
            onClick={() => navigate(`/admin/settings`)}
          />
        </div>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          className="site-layout-background"
          style={{
            padding: '24px 0',
          }}
        >
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{
                height: '100%',
              }}
              items={menuItems}
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
