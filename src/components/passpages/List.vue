<template>
  <div>
    <div class="col-lg-10 col-md-12 mx-auto" v-for="(item, index) in AllData" :key="index">
      <h1 class="rb-font rb-600 size-20 mb-1 py-3">{{item.name}}</h1>
      <div class="content sh-box bg-color col-md-12">
        <div class="content__add row">
          <div class="form-group col-md-4">
            <label for class="cc-font cc-600 size-16">Domain Name</label>
            <label class="cc-font cc-500 size-16 d-block">{{item.domain}}</label>
          </div>
          <div class="form-group col-md-4">
            <label for class="cc-font cc-600 size-16">Host Name</label>
            <label class="cc-font cc-500 size-16 d-block">{{item.host}}</label>
          </div>
          <div class="form-group col-md-4">
            <label for class="cc-font cc-600 size-16" s>Status</label>
            <label v-if="item.status == 1" class="cc-font cc-500 size-16 d-block">Active</label>
            <label v-else class="cc-font cc-500 size-16 d-block">Passive</label>
          </div>
          <div class="col-md-12">
            <router-link :to="`/edit/${item.id}`" class="create-btn cc-font cc-600 d-inline-block mx-auto">Edit</router-link>
            <router-link
              :to="`/createfield/${item.id}`"
              class="create-btn cc-font cc-600 d-inline-block mx-auto"
            >Create a field</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "List",
  data() {
    return {
      AllData: []
    };
  },
  mounted() {
    this.$store
      .dispatch("GetAllData")
      .then(res => {
        console.log(res);
        this.AllData = res.data.data;
        console.log(this.AllData);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>