<template>
  <div>
    <div v-for="(items, index) in Group" :key="index">
      <h1 class="rb-font rb-600 size-20 py-3">{{items[0].field_group.name}}</h1>
      <div class="content sh-box bg-color col-md-12">
        <div class="row mb-3" v-for="(item, index) in items" :key="index">
          <div class="col-md-6 col-sm-6">
            <label class="cc-font cc-600 size-16 d-block">Key</label>
            <label class="cc-font cc-500 size-16 d-block">{{item.key}}</label>
          </div>
          <div class="col-md-6 col-sm-6">
            <label class="cc-font cc-600 size-16 d-block">Value</label>
            <label class="cc-font cc-500 size-16 d-block">{{item.value}}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ListEnvItem",
  props: ["items"],
  data() {
    return {
      data: {}
    };
  },
  computed:{
    Group(){
      return this.GroupBy(this.items, 'field_group_id')
    }
  },
  methods:{
    GroupBy(dataList,key){
      const result = {}
      dataList.forEach(item => {
        if(!result[item[key]]){
          result[item[key]] = []
        }
        result[item[key]].push(item)
      });
      return result;
    }
  }
};
</script>