<template>
  <div class="layout">
    <div class="side" :style="{ width: sideShrink ? '65px' : '240px'}">
      <div class="ads">
        <div class="logo" @click="$router.push('/')">
          <span v-if="sideShrink">DPM</span>
          <span v-else>Dumii Projects Manage</span>
        </div>
      </div>
      <Menu ref="side" class="sidemenu" mode="vertical" :active-name="activeSide" @on-select="changeSide" :width="sideShrink ? '65px' : '240px'">
        <MenuItem v-for="side in sides" :key="side.name" v-if="visibilitySide(side)" class="sidemenuitem" :name="side.name">
          <Icon class="icon" size="20" :type="side.icon"></Icon>
          <div class="span" v-if="!sideShrink">
            <span>{{side.title}}</span>
          </div>
        </MenuItem>
      </Menu>
    </div>
    <div class="main" :style="{ left: sideShrink ? '65px' : '240px'}">
      <div class="header">
        <div class="shrink" @click="shrinkSide">
          <Icon type="navicon-round" :style="{transform: 'rotateZ(' + (sideShrink ? '-90' : '0') + 'deg)'}"></Icon>
        </div>
        <div class="menu">
          <div class="nav" :class="{active: activeMenu === menu.name}" v-for="(menu, index) in menus" :key="index" @click="changeMenu(menu)">{{menu.title}}</div>
        </div>
        <User></User>
      </div>
      <div class="content" :style="{height: 'calc(100% - 50px)'}">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import User from '@/components/User'
export default {
  components: { User },
  data () {
    return {
      sideShrink: false,
      activeSide: ''
    }
  },
  created () {
    this.$utils.setActiveMenu(this, this.$route.name)
    this.$utils.setSides(this, this.activeMenu)
    this.activeSide = this.$route.name
  },
  methods: {
    changeMenu (menu) {
      this.$router.push(menu.path)
    },
    shrinkSide () {
      this.sideShrink = !this.sideShrink
    },
    changeSide (side) {
      this.$router.push({name: side})
    },
    visibilitySide (side) {
      return !(side.meta && side.meta.hidden) || side.name === this.activeSide
    }
  },
  computed: {
    activeMenu () {
      return this.$store.state.activeMenu
    },
    menus () {
      return this.$store.state.menus
    },
    sides () {
      return this.$store.state.sides
    },
  },
  watch: {
    $route (to) {
      this.$utils.setActiveMenu(this, to.name)
      this.$utils.setSides(this, this.activeMenu)
      this.activeSide = this.$route.name
      this.$nextTick(() => {
        this.$refs.side.updateActiveName()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .layout{
    min-height: 100%;
    height: 100%;
    padding-top: 50px;
    position: relative;
    .side{
      position: absolute;
      top: 0;
      bottom: 0;
      background-color: #fff;
      transition: width 300ms;
      border-right: 1px solid #dddee1;
      .ads{
        text-align: center;
        .logo{
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          color: #fff;
          cursor: pointer;
          background-color: red;
        }
        img{
          width: 80%;
        }
      }
      .sidemenu{
        transition: width 300ms;
        .sidemenuitem{
          height: 50px;
          overflow: hidden;
          white-space: nowrap;
          text-align: center;
          .icon{
            vertical-align: middle;
            display: inline-block;
            width: 20px;
          }
          .span{
            display: inline-block;
            vertical-align: middle;
            text-align: left;
            width: 100px;
          }
        }
      }
    }
    .main{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      transition: left 300ms;
      .header{
        position: fixed;
        top: 0;
        right: 0;
        height: 50px;
        line-height: 50px;
        background-color: #fff;
        border-bottom: 1px solid #ccc;
        z-index: 100;
        display: flex;
        position: relative;
        .shrink{
          width: 50px;
          color: red;
          text-align: center;
          font-size: 20px;
          cursor: pointer;
        }
        .menu{
          display: flex;
          .nav{
            padding: 0 20px;
            transition: all 300ms;
            height: 49px;
            line-height: 49px;
            font-size: 14px;
          }
          .nav.active{
            color: red;
            border-bottom: 2px solid red;
          }
          .nav:hover{
            border-bottom: 2px solid red;
            cursor: pointer;
          }
        }
        // .user{
        //   position: absolute;
        //   right: 0;
        //   top: 0;
        //   height: 50px;
        // }
      }
      .content{
        position: relative;
      }
    }
  }
</style>
