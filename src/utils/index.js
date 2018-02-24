import { moduleRoutes } from '@/view/public/routes'

let utils = {

}

utils.setActiveMenu = (vm, name) => {
  moduleRoutes.forEach(menu => {
    if (menu.name === name) {
      vm.$store.commit('changeMenu', menu.name)
    }
    menu.children.forEach(item => {
      if (item.name === name) {
        vm.$store.commit('changeMenu', menu.name)
      }
    })
  })
}

utils.setSides = (vm, name) => {
  vm.$store.commit('setSides', moduleRoutes.find(menu => {
    return menu.name === name
  }).children)
}

export default utils
