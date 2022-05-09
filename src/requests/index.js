import axios from 'axios'
import { message } from 'antd'

const isDev = process.env.NODE_ENV === 'development'

const services = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/302162' : '',
})

services.interceptors.request.use(
  config => {
    config.data = {
      // authToken: window.localStorage.getItem('authToken'),
      authToken: 'auth token placeholder',
      ...config.data,
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

services.interceptors.response.use(
  res => {
    if (res.data.code === 200) {
      // return res.data
      return res.data.data
    } else {
      // deal with error
      message.error('获取文章列表错误：' + res.data.errMsg)
    }
  },
  err => {
    return Promise.reject(err)
  }
)

/**
 * 获取文章列表的方法
 * @param {number} offset
 * @param {number} limited
 * @returns
 */
export const getArticles = async (offset = 0, limited = 10) => {
  await delay(0.5)
  return await services.post('/api/v1/article/list', {
    offset: offset,
    limited: limited,
  })
}

/**
 * 删除文章的方法
 * @param {string} id 要删除的文章编号
 * @returns object
 */
export const deleteArticleById = async id => {
  await delay(1)
  return services.post('/api/v1/article/delete/' + id, {
    id,
  })
}

async function delay(seconds = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, seconds * 1000)
  })
}
