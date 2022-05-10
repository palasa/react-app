import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Card, Button, Form, Input, DatePicker } from 'antd'
import {
  EditOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { MyEditor } from '../../components'

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
  size: 'large',
  requiredMark: true,
}


export default function ArticleEdit() {
  const location = useLocation()
  const [form] = Form.useForm();
  const onEditorChange = html => {
    console.log(html)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit', form.getFieldsValue())
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
        {...formLayout}
        form={form}
        className="edit-article"
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
                // console.log({ rule, value })
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

        <Form.Item
          label="文章作者"
          name="author"
          rules={[
            {
              required: true,
              message: '请输入作者!',
            },
          ]}
        >
          <Input
            type="text"
            prefix={<UserOutlined />}
            placeholder="作者"
          />
        </Form.Item>

        <Form.Item
          label="阅读量"
          name="readAmount"
          rules={[
            {
              required: true,
              message: '请输入阅读量!',
            },
          ]}
        >
          <Input
            type="number"
            prefix={<UserOutlined />}
            placeholder="阅读量"
            min={0}
            precision={0}
          />
        </Form.Item>

        <Form.Item
          label="创建时间"
          name="createAt"
          rules={[
            {
              required: true,
              message: '请选择创建时间!',
            },
          ]}
        >
          <DatePicker  showTime={true} />
        </Form.Item>

        <Form.Item
          label="文章内容"
          wrapperCol={{ span: 18 }}
          rules={[
            {
              required: true,
              message: '请输入内容!',
            },
          ]}
        >
          <MyEditor className="my-editor" onChange={onEditorChange} editorStyle={{minHeight: 300}}/>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            保存修改
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
