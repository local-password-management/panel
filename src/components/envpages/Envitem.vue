<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      <h1 class="rb-font rb-600 size-20 py-3">{{item.field_group.name}}</h1>
      <div class="content sh-box bg-color col-md-12">
        <div class="row align-items-end">
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
  name: "EnvItem",
  props: ["items"],
  data() {
    return {};
  },
  mounted(){
  }
};
</script>