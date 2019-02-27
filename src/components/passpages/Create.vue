<template>
  <div class="col-lg-8 col-md-12 mx-auto">
    <h1 class="rb-font rb-600 size-20 mb-3 py-3">Create A Project</h1>
    <div class="content sh-box bg-color col-md-12">
      <div class="content__add row">
        <div class="form-group col-md-6">
          <label class="cc-font cc-500 size-16">Project Name</label>
          <input type="text" class="form-control gen-input" id="projectName" v-model="project.name">
        </div>
        <div class="form-group col-md-6">
          <label for class="cc-font cc-500 size-16">Domain Name</label>
          <input
            type="text"
            class="form-control gen-input"
            id="projectDomain"
            v-model="project.domain"
          >
        </div>
        <div class="form-group col-md-6">
          <label for class="cc-font cc-500 size-16">Host Name</label>
          <input type="text" class="form-control gen-input" id="projectHost" v-model="project.host">
        </div>
        <div class="form-group col-md-6">
          <label for class="cc-font cc-500 size-16">Status</label>
          <select class="form-control gen-input" id="projectStatus" v-model="project.status">
            <option v-for="(option, index) in Status" :key="index" :value="index">{{option}}</option>
          </select>
        </div>
        <div class="col-lg-12">
          <button class="create-btn cc-font cc-600 d-block mx-auto" @click="DataPost">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Auth from "../../helper/auth";
const api = new Auth().api()

export default {
  name: "Create",
  data() {
    return {
      project: {
        name: "",
        host: "",
        domain: "",
        status: "choose"
      },
      Status: ["passive", "active"]
    };
  },
  methods: {
    DataPost() {
      return new Promise((resolve, reject) => {
        api.post("projects", this.project)
          .then(res => {
            this.$router.push('/edit/'+res.data.data.id)
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
</script>