<template>
  <div class="card">
    <div class="list-head">
      <div class="left">
        <!-- <Select v-model="label" @on-change="labelChange" placeholder="请选择项目" size="small" style="width: 120px;">
          <Option value="all">所有项目</Option>
          <Option v-for="label in labels" :key="label" :value="label">{{label}}</Option>
        </Select> -->
      </div>
      <!-- <div class="right">
        <Button size="small" type="primary" icon="plus-round" @click="$router.push('/template/new')">新建模板</Button>
      </div> -->
    </div>
    <div v-if="templates.length === 0" class="template">
      <div class="none">暂无模板，点击右上角新建模板</div>
    </div>
    <List v-else>
      <div class="template" v-for="(template,index) in templates" :key="index">
        <div class="name" @click="$router.push(`/template/edit/${template.id}`)">{{template.name}}</div>
        <!-- <div class="info">
          {{template.num}}
          {{template.label}}
        </div> -->
      </div>
    </List>
    <div class="bottom">
      <Page></Page>
    </div>
  </div>
</template>

<script>
import List from '@/components/List'
export default {
  components: { List },
  data () {
    return {
      templates: []
    }
  },
  mounted () {
    this.templates = [
      { name: '项目管控表', id: '01' },
      { name: '项目组成员表', id: '02' },
      { name: '项目评价表', id: '03' },
    ]
  }
}
</script>

<style lang="less" scoped>
  .card{
    width: 960px;
    margin: 0 auto;
    .list-head{
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      background-color: #fcfcfc;
      border: 1px solid #ddd;
      border-bottom: none;
      display: flex;
      justify-content: space-between;
    }
    .template{
      height: 80px;
      border: 1px solid #ddd;
      border-bottom: none;
      background-color: #fff;
      padding: 10px 20px;
      .name{
        font-size: 20px;
        font-weight: bold;
      }
      .name:hover{
        cursor: pointer;
      }
      .info{
        color: #888;
      }
      .none{
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        line-height: 60px;
      }
    }
    .template:last-child{
      border-bottom: 1px solid #ddd;
    }
    .bottom {
      text-align: center;
      margin-top: 10px;
    }
  }
</style>
