import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Card, Button, Form, Input } from 'antd'
import {
  EditOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons'

export default function ArticleEdit() {
  const location = useLocation()
  // console.log(location.state)

  const handleSubmit = e => {
    e.preventDefault()
    console.log('submit')
  }

  return (
    <Card
      title="文章编辑"
      extra={
        <Link to="/admin/article">
          <Button>取消</Button>
        </Link>
      }
      style={{ width: '100%' }}
    >
      <Form
        className="edit-article"
        requiredMark={true}
        onSubmitCapture={handleSubmit}
      >
        <Form.Item
          label="文章标题"
          name="title"
          rules={[
            {
              required: true,
              message: '请输入文章标题!',
            },
            {
              min: 5,
              message: '文章标题长度最少为5位',
            },
            {
              max: 20,
            },
            {
              validator: (rule, value) => {
                console.log({ rule, value })
                if (/^\d{5}$/.test(value)) {
                  return Promise.resolve('是5位数字')
                } else {
                  return Promise.reject('不是5位数字')
                }
                // return new Promise((resolve, reject)=>{
                //   if (/^\d{5}$/.test(value)) {
                //     resolve('是5位数字')
                //   } else {
                //     reject('不是5位数字')
                //   }
                // })
                // return (async () => {
                //   if (/^\d{5}$/.test(value)) {
                //     return Promise.resolve('是5位数字')
                //   } else {
                //     return Promise.reject('不是5位数字')
                //   }
                // })()
              },
            },
          ]}
        >
          <Input type="text" prefix={<EditOutlined />} placeholder="文章标题" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          确认修改
        </Button>
      </Form>
    </Card>
  )
}
