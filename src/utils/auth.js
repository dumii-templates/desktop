import storage from '@/utils/storage'
import Http from '@/utils/http'

const auth = {}

auth.setUser = (user) => {
  return storage.set('auth_user', user)
}

auth.getUser = () => {
  return storage.get('auth_user', {})
}

auth.setAccessToken = (token) => {
  return storage.set('auth_token', token)
}

auth.getAccessToken = () => {
  const token = storage.get('auth_token', '')

  try {
    if (JSON.parse(atob(token.split('.')[1])).exp * 1000 > (new Date()).getTime()) {
      return token
    }
  } catch (e) {}

  auth.setAccessToken('')
  return ''
}

auth.getPermissions = () => {
  return storage.get('auth_permissions', {})
}

auth.setPermissions = (permissions) => {
  return storage.set('auth_permissions', permissions)
}

auth.getRoles = () => {
  return storage.get('auth_roles', {})
}

auth.setRoles = (roles) => {
  return storage.set('auth_roles', roles)
}

auth.isLogin = () => {
  return !!auth.getAccessToken()
}

auth.checkRole = (role) => {
  let roles = auth.getRoles()
  return Object.keys(roles).indexOf(role) > -1
}

auth.checkPermission = (permissions, permission) => {
  if (!Array.isArray(permissions)) {
    permissions = Object.keys(permissions)
  }

  if (permissions.indexOf(permission) > -1 || permissions.indexOf(permission + '/*') > -1) {
    return true
  }

  let pos = permission.lastIndexOf('/')
  while (pos > -1) {
    pos = permission.lastIndexOf('/')
    permission = permission.substring(0, pos)
    if (permissions.indexOf(permission + '/*') > -1) {
      return true
    }
  }

  return false
}

auth.can = (item, callback) => {
  if (callback) {
    Http.get('/api/limits', result => {
      auth.setRoles(result.data.roles)
      auth.setPermissions(result.data.perms)
      callback(auth.checkRole(item) || auth.checkPermission(auth.getPermissions(), item))
    })
  } else {
    return auth.checkRole(item) || auth.checkPermission(auth.getPermissions(), item)
  }
}

auth.requireAuth = (to, from, next) => {
  if (to.meta.accessType === 'guest') { // 游客可以访问
    next()
    return
  }

  if (auth.isLogin()) {
    if (to.meta.accessType === 'member') { // 登录后可以访问
      next()
      return
    }

    // 其他情况就是需要验证路径权限了
    let perm = to.meta.permission || to.path // 可以自定义权限名，如果没有就用路径做权限名

    if (auth.can(perm)) {
      next()
    } else {
      auth.can(perm, allow => {
        if (allow) {
          next()
        } else {
          next({name: 'error', query: {code: 403, message: '无权访问资源', from: from.fullPath}})
        }
      })
    }
  } else {
    next({name: 'login', query: {next: to.fullPath}})
  }
}

auth.clearAuth = () => {
  auth.setAccessToken('')
  auth.setPermissions({})
  auth.setRoles({})
  auth.setUser('')
}

export default auth
