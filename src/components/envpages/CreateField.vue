<template>
  <div>
    <div class="col-xl-8 col-lg-10 col-md-12 mx-auto">
      <h1 class="rb-font rb-600 size-20 mb-3 py-3">{{project.name}}</h1>
      <div class="content sh-box bg-color col-md-12">
        <div class="content__add row">
          <div class="form-group col-md-4">
            <label for class="cc-font cc-600 size-16">Domain Name</label>
            <label class="cc-font cc-500 size-16 d-block">{{project.domain}}</label>
          </div>
          <div class="form-group col-md-4">
            <label for class="cc-font cc-600 size-16">Host Name</label>
            <label class="cc-font cc-500 size-16 d-block">{{project.host}}</label>
          </div>
          <div class="form-group col-md-4">
            <label for class="cc-font cc-600 size-16">Status</label>
            <label v-if="project.status == 1" class="cc-font cc-500 size-16 d-block">Active</label>
            <label v-else class="cc-font cc-500 size-16 d-block">Passive</label>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-xl-8 col-lg-10 col-md-12 mx-auto">
      <div class="envarea">
        <div class="envarea__item">
          <EnvItem :items="fields"/>
        </div>
      </div>
    </div>
    <div class="col-xl-8 col-lg-10 col-md-12 mx-auto">
      <h1 class="rb-font rb-600 size-20 mb-3 py-3">Add a field</h1>
      <div class="envarea__additem bg-color content sh-box col-md-12">
        <div class="content__add row align-items-end">
          <div class="col-md-4">
            <label class="cc-font cc-600 size-16">Key</label>
            <input
              type="text"
              class="form-control gen-input"
              id="projectName"
              v-model="fieldArea.key"
            >
          </div>
          <div class="col-md-4">
            <label for class="cc-font cc-600 size-16">Value</label>
            <input
              type="text"
              class="form-control gen-input"
              id="projectDomain"
              v-model="fieldArea.value"
            >
          </div>
          <div class="col-md-4">
            <label for class="cc-font cc-600 size-16">Field Name</label>
            <select
              class="form-control gen-input"
              id="projectStatus"
              v-model="fieldArea.field_group_id"
            >
              <option
                v-for="(option, index) in fieldGroups"
                :key="index"
                :value="option.id"
              >{{option.name}}</option>
            </select>
          </div>
          <div class="col-md-12 mt-3">
            <button class="create-btn cc-font cc-600 d-block mx-auto" @click="SaveField">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EnvItem from "./Envitem";
export default {
  name: "CreateField",
  components: {
    EnvItem: EnvItem
  },
  data() {
    return {
      project: {
        name: "",
        host: "",
        domain: "",
        status: 0
      },
      fields: [],
      fieldArea: {
        key: "",
        value: "",
        project_id: this.$route.params.id,
        field_group_id: 0
      },
      fieldname: "",
      fieldGroups: [],
      isInput: true
    };
  },
  mounted() {
    this.$store
      .dispatch("GetData", this.$route.params.id)
      .then(res => {
        this.project = res.data.data;
      })
      .catch(err => console.log(err));
    this.$store
      .dispatch("GetFields", this.$route.params.id)
      .then(res => {
        this.fields = res.data.data;
        this.fields.isInput = this.isInput;
      })
      .catch(err => console.log(err));
    this.$store
      .dispatch("GetGroupFields")
      .then(res => {
        this.fieldGroups = res.data.data;
        this.fieldGroups[0] = {
          name: "choose",
          id: 0
        };
        this.fields.fieldGroups = this.fieldGroups
      })
      .catch(err => console.log(err));
  },
  methods: {
    SaveField() {
      this.$store
        .dispatch("AddField", this.fieldArea)
        .then(res => {
          this.fieldArea.field_group = res.data.data.field_group;
          this.fields.push(this.fieldArea) 
        })
        .catch(err => console.log(err));
    }
  }
};
</script>