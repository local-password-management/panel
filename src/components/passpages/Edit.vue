<template>
  <div>
    <div class="col-lg-8 col-md-12 mx-auto">
      <h1 class="rb-font rb-600 size-20 mb-3 py-3">Edit Project</h1>
      <div class="content sh-box bg-color col-md-12">
        <form class="content__add row" @submit.prevent="EditPost">
          <div class="form-group col-md-6">
            <label class="cc-font cc-500 size-16">Project Name</label>
            <input
              type="text"
              class="form-control gen-input"
              id="projectName"
              v-model="project.name"
              :disabled="disInput"
            >
          </div>
          <div class="form-group col-md-6">
            <label for class="cc-font cc-500 size-16">Domain Name</label>
            <input
              type="text"
              class="form-control gen-input"
              id="projectDomain"
              v-model="project.domain"
              :disabled="disInput"
            >
          </div>
          <div class="form-group col-md-6">
            <label for class="cc-font cc-500 size-16">Host Name</label>
            <input
              type="text"
              class="form-control gen-input"
              id="projectHost"
              v-model="project.host"
              :disabled="disInput"
            >
          </div>
          <div class="form-group col-md-6">
            <label for class="cc-font cc-500 size-16">Status</label>
            <select class="form-control gen-input" name id="projectStatus" v-model="project.status">
              <option
                v-for="(option, index) in Status"
                :key="index"
                :value="index"
                :disabled="disInput"
                :selected="project.status == index"
              >{{option}}</option>
            </select>
          </div>
          <div class="col-lg-12 text-center">
            <a
              v-if="disInput"
              class="create-btn cc-font cc-600 d-inline-block mx-auto"
              @click="EditProject"
            >Edit</a>
            <button v-else class="create-btn cc-font cc-600 d-block mx-auto" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
    <div class="line mx-auto"></div>
    <div class="col-lg-8 col-md-12 mx-auto">
      <div class="envarea">
        <div class="envarea__item" v-for="(item, index) in Status" :key="index">
          <EnvItem :item="project"/>
        </div>

        <div class="envarea__additem"></div>
      </div>
    </div>
  </div>
</template>
<script>
import EnvItem from "../envpages/Envitem";
import Auth from "../../helper/auth";
const api = new Auth().api();
export default {
  name: "Edit",
  components: {
    EnvItem: EnvItem
  },
  data() {
    return {
      project: {
        name: "",
        host: "",
        domain: "",
        status: "choose"
      },
      Status: ["passive", "active"],
      disInput: true
    };
  },
  mounted() {
    api
      .get("projects/" + this.$route.params.id)
      .then(res => {
        console.log(res);
        this.project = res.data.data;
      })
      .catch(err => console.log(err));
  },

  methods: {
    EditProject() {
      this.disInput = false;
    },
    EditPost() {
      
      return new Promise((resolve, reject) => {
        api
          .put("projects/" + this.$route.params.id, this.project)
          .then(res => {
            this.disInput = true;
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