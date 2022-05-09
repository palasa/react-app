import { Card, Button, Table, Tag, Modal, message } from 'antd'
import { useEffect, useState } from 'react'
import { deleteArticleById, getArticles } from '../../requests'
import moment from 'moment'
import ButtonGroup from 'antd/lib/button/button-group'
import { useNavigate } from 'react-router-dom'

const titleMap = {
  id: '编号',
  title: '文章标题',
  author: '文章作者',
  readAmount: '阅读量',
  createAt: '创建时间',
}

const exportExcel = () => {
  // front end send request , back end return a csv file
  message.info('导出成excel')
}

export default function ArticleList() {
  let pageSizeChange = false
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [columns, setColumns] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 10,
    pageSize: 10,
    current: 1,
  })

  const operationColumn = {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record, index) => (
      <ButtonGroup>
        <Button
          size="small"
          type="primary"
          onClick={() => {
            editArticle(record)
          }}
        >
          编辑
        </Button>
        <Button
          size="small"
          type="danger"
          onClick={() => {
            deleteArticle(record)
          }}
        >
          删除
        </Button>
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

  const deleteArticle = record => {
    Modal.confirm({
      title: record.title,
      content: '是否确认要删除？',
      // confirmLoading: true,
      onOk: async () => {
        const result = await deleteArticleById(record.id)
        message.success(result.msg)
        // 回到首页
        setPagination({
          current: 1,
          offset: 0,
        })
      },
    })
  }

  const editArticle = record => {
    message.info(record.id)
    navigate(`/admin/article/edit/${record.id}`, { state: record })
  }

  const onPageChange = (page, pageSize) => {
    setPagination({
      pageSize: pageSize,
      limit: pageSize,
      offset: pageSizeChange ? 0 : (page - 1) * pageSize,
      current: pageSizeChange ? 1 : page,
    })
    pageSizeChange = false
  }

  // 每页条数发生变化时，跳转到第一页
  const onShowSizeChange = (current, size) => {
    setPagination({
      limit: size,
      pageSize: size,
    })
    pageSizeChange = true
  }

  useEffect(() => {
    ;(async function () {
      console.log(pagination)
      setLoading(true)
      const { total, list } = await getArticles(
        pagination.offset,
        pagination.limit
      )
      setTotal(total)
      const columnKeys = Object.keys(list[0])
      setColumns(createColumns(columnKeys))
      setData(list)
      setLoading(false)
    })()
  }, [pagination])

  return (
    <Card
      title="文章列表"
      extra={<Button onClick={exportExcel}>导出excel</Button>}
      style={{ width: '100%' }}
    >
      <Table
        dataSource={data}
        columns={columns}
        rowKey={record => record.id}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: total,
          hideOnSinglePage: true,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: onPageChange,
          onShowSizeChange: onShowSizeChange,
        }}
        loading={isLoading}
      />
    </Card>
  )
}
