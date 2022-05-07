import { Card, Button, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { getArticles } from '../../requests'
import moment from 'moment'
import ButtonGroup from 'antd/lib/button/button-group'

const titleMap = {
  id: '编号',
  title: '文章标题',
  author: '文章作者',
  readAmount: '阅读量',
  createAt: '创建时间',
}

const operationColumn = {
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
  render: (text, record, index) => (
    <ButtonGroup>
      <Button
        size='small'
        type="primary"
        onClick={() => {
          console.log(text, index, record)
        }}
      >
        编辑
      </Button>
      <Button size='small' type="danger">删除</Button>
    </ButtonGroup>
  ),
}

const createColumns = columnKeys => {
  const buildColumns = columnKeys.map(key => {
    if (key === 'readAmount') {
      return {
        title: titleMap[key],
        key: key,
        dataIndex: key,
        render: text => {
          const color = text > 7000 ? 'red' : 'geekblue'
          return (
            <Tag key={key} color={color}>
              {text}
            </Tag>
          )
        },
      }
    } else if (key === 'createAt') {
      return {
        title: titleMap[key],
        dataIndex: key,
        key: key,
        render: text => moment(text).format('YYYY.MM.DD'),
      }
    } else {
      return {
        title: titleMap[key],
        dataIndex: key,
        key: key,
      }
    }
  })
  buildColumns.push(operationColumn)
  return buildColumns
}

export default function ArticleList() {
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [columns, setColumns] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getArticles().then(res => {
      setTotal(res.total)
      const columnKeys = Object.keys(res.list[0])
      setColumns(createColumns(columnKeys))
      setData(res.list)
    }).catch( err => {
      // deal with err
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <Card
      title="文章列表"
      extra={<Button>导出excel</Button>}
      style={{ width: '100%' }}
    >
      <Table
        dataSource={data}
        columns={columns}
        rowKey={record => record.id}
        pagination={{
          pageSize: 10,
          total: total,
          hideOnSinglePage: true,
        }}
        loading={isLoading}
      />
    </Card>
  )
}
