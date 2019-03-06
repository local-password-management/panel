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
            <router-link
              :to="`/edit/${item.id}`"
              class="create-btn cc-font cc-600 d-inline-block mx-auto"
            >Edit</router-link>
            <router-link
              :to="`/createfield/${item.id}`"
              class="create-btn cc-font cc-600 d-inline-block mx-auto"
            >Create a field</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-3 page-navigate">
      <a class="px-2 mr-2 create-btn" :class="{'active-create-btn' :index + 1 === page}" v-for="(item, index) in total" :key="index" @click="ChangePage(index)">{{index +1}}</a>
    </div>
  </div>
</template>
<script>
import Axios from "../../helper/auth";
export default {
  name: "List",
  data() {
    return {
      AllData: [],
      total:0,
      page:1,
    };
  },
  created() {
    this.$store
      .dispatch("GetAllData")
      .then(res => {
        this.AllData = res.data.data;
        this.total = res.data.meta.last_page
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    ChangePage(page){
      this.page = page +1;
    },
    GetData() {
      return new Promise((resolve, reject) => {
        new Axios()
          .Api()
          .get("projects?page=" + this.page)
          .then(res => {
            this.AllData = [];
            this.AllData = res.data.data;
          })
          .catch(err => console.log(err));
      });
    }
  },
  watch:{
    page:{
      immediate:true,
      handler(newVal,oldVal){
        this.GetData()
      }
    }
  }
};
</script>