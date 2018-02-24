import axios from 'axios'
import Auth from '@/utils/auth'

const http = {}

http.get = (url, cbSuccess, cbError) => {
  axios.get(url,
    {
      headers: {'Authorization': 'Bearer ' + Auth.getAccessToken()},
    }
  )
    .then(response => {
      callback(response, cbSuccess, cbError)
    })
    .catch(error => {
      console.log(error)
    })
}

http.post = (url, params, cbSuccess, cbError) => {
  axios.post(url, params,
    {
      headers: {'Authorization': 'Bearer ' + Auth.getAccessToken()},
    }
  )
    .then(response => {
      callback(response, cbSuccess, cbError)
    })
    .catch(error => {
      console.log(error)
    })
}

http.delete = (url, cbSuccess, cbError) => {
  axios.delete(url,
    {
      headers: {'Authorization': 'Bearer ' + Auth.getAccessToken()},
    }
  )
    .then(response => {
      callback(response, cbSuccess, cbError)
    })
    .catch(error => {
      console.log(error)
    })
}

const callback = (response, cbSuccess, cbError) => {
  let token = response.headers.authorization
  if (token) {
    Auth.setAccessToken(token.replace(/^Bearer\s+?/i, ''))
  }
  if (response.status === 200) {
    cbSuccess(response.data)
  } else if (cbError) {
    cbError(response)
  } else {
    switch (response.status) {
      case 401:
        Auth.clearAuth()
        // 重新刷新页面可以让登录页面带上来源页
        // Browser.reload()
        break
      case 403:
        Auth.setPermissions({})
        Auth.setRoles({})
        window.VUE_ROUTER.replace(`/error?code=${response.status}&message=无权访问该资源`)
        break
      case 404:
        window.VUE_ROUTER.replace(`/error?code=${response.status}&message=页面找不到`)
        break
      case 503:
        window.VUE_ROUTER.replace(`/error?code=${response.status}&message=服务器正在维护，请稍后再来吧`)
        break
      default:
        window.VUE_ROUTER.replace(`/error?code=${response.status}&message=出现了一点错误`)
    }
  }
}

export default http
