<template>
  <div>
    <div class="col-xl-10 col-lg-10 col-md-12 mx-auto">
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

    <div class="col-xl-10 col-lg-10 col-md-12 mx-auto">
      <div class="envarea">
        <div class="envarea__item">
          <EnvItem :items="fields"/>
        </div>
      </div>
    </div>
    <div class="col-xl-10 col-lg-10 col-md-12 mx-auto">
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
    <div class="d-flex justify-content-center mt-3 page-navigate">
      <a
        class="px-2 mr-2 create-btn"
        :class="{'active-create-btn' :index + 1 === page}"
        v-for="(item, index) in total"
        :key="index"
        @click="ChangePage(index)"
      >{{index +1}}</a>
    </div>
  </div>
</template>
<script>
import EnvItem from "./Envitem";
import Axios from "../../helper/auth";
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
      isInput: true,
      total: 0,
      page: 1
    };
  },
  created() {
    this.$store
      .dispatch("GetData", this.$route.params.id)
      .then(res => {
        this.project = res.data.data;
      })
      .catch(err => console.log(err));
    this.$store
      .dispatch("GetFields", this.$route.params.id)
      .then(res => {
        console.log(res);
        this.fields = res.data.data;
        this.total = res.data.meta.last_page;
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
      })
      .catch(err => console.log(err));
  },
  methods: {
    SaveField() {
      if (this.fieldArea.key == "" || this.fieldArea.value == "") {
        this.$swal({
          type: "warning",
          text: "Please fill in the fields"
        });
        return false;
      } else {
        this.$store
          .dispatch("AddField", this.fieldArea)
          .then(res => {
            this.$swal({
              type: "success",
              title: "Created"
            });
            this.fieldArea.field_group = res.data.data.field_group;
            this.fields.push(this.fieldArea);
            this.fieldArea.key = "";
            this.fieldArea.value = "";
          })
          .catch(err => console.log(err));
      }
    },
    ChangePage(page) {
      this.page = page + 1;
      console.log(this.page);
    },
    GetData() {
      return new Promise((resolve, reject) => {
        new Axios()
          .Api()
          .get(
            "fields?project_id=" + this.$route.params.id + "&page=" + this.page
          )
          .then(res => {
            console.log("fasfasd", this.page);
            (this.fields = []), (this.fields = res.data.data);
          })
          .catch(err => console.log(err));
      });
    }
  },
  watch: {
    page: {
      immediate: true,
      handler(newVal, oldVal) {
        this.GetData();
      }
    }
  }
};
</script>