// import React, { useState, useEffect } from "react"
// import { getArticles } from "../../requests"

// function getArticlesApi (props) {
//   const [data, setData] = useState([])
//   const [total, setTotal] = useState(0)
//   const [columns, setColumns] = useState([])
//   const [isLoading, setLoading] = useState(false)
//   const [offset, setOffset] = useState(0)
//   const [limit, setLimit] = useState(10)
//   const [pageSize, setPageSize] = useState(10)

//   const onPageChange = (page, pageSize) => {
//     setLimit(pageSize)
//     setOffset((page-1)*pageSize)
//   }

//   // 每页条数发生变化时，跳转到第一页
//   const onShowSizeChange = (current, size) => {
//     // console.log(current, size)
//     setOffset(0)
//     setLimit(size)
//     setPageSize(size)
//   }

//   useEffect(() => {
//     setLoading(true)
//     console.log(limit, offset, pageSize)
//     getArticles(offset,limit).then(res => {
//       setTotal(res.total)
//       const columnKeys = Object.keys(res.list[0])
//       setColumns(createColumns(columnKeys))
//       setData(res.list)
//     }).catch( err => {
//       // deal with err
//     }).finally(() => {
//       setLoading(false)
//     })
//   }, [limit, offset, pageSize])

//   return { data,total,columns,isLoading,onPageChange,onShowSizeChange }
// }
