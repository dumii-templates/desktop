// 重定向页面，只能调用一次，用于代替 location.href=xxx
const redirect = href => {
  if (window.IS_REDIRECTING) {
    return false
  }

  window.IS_REDIRECTING = true

  const link = document.createElement('a')
  link.href = href
  link.click()
}

export default { redirect }
