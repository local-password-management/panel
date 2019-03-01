<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      <h1 class="rb-font rb-600 size-20 py-3">{{item.field_group.name + item.field_group.id}}</h1>
      <div class="content sh-box bg-color col-md-12">
        <div class="row align-items-end" v-if="items.isInput">
          <div class="col-md-3">
            <label class="cc-font cc-600 size-16 d-block">Key</label>
            <input
              type="text"
              class="form-control gen-input"
              v-model="item.key"
              :disabled="!item.isActive"
            >
          </div>
          <div class="col-md-3">
            <label class="cc-font cc-600 size-16 d-block">Value</label>
            <input
              type="text"
              class="form-control gen-input"
              v-model="item.value"
              :disabled="!item.isActive"
            >
          </div>
          <div class="col-md-3">
            <label for class="cc-font cc-600 size-16">Field Name</label>
            <select
              class="form-control gen-input"
              v-model="item.field_group_id"
            >
              <option
                v-for="(option, index) in items.fieldGroups"
                :key="index"
                :value="option.id"
              >{{option.name}}</option>
            </select>
          </div>
          <div class="col-md-2">
            <a
              v-if="!item.isActive"
              class="create-btn cc-font cc-600 d-inline-block mx-auto" 
              @click="EditField(index)"
            >Edit</a>
            <button v-else class="create-btn cc-font cc-600 d-block mx-auto" @click="SaveField(index)">Save</button>
          </div>
        </div>
        <div class="row align-itemse end" v-else>
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
    return {

      dataItem:{
        id:'',
        key:'',
        value:''
      }
    };
  },
  methods: {
    // TODO Field Grouppsss
    // eğer path createfield/:id ise -- EditProject ve Edit Post-- çalışır
    EditField(index) {
      this.$set(this.items[index],'isActive',true)
    },
    SaveField(index) {
      console.log("adfafdasdf",this.items);
      this.dataItem.id = this.items[index].field_group.id
      this.dataItem.key = this.items[index].key;
      this.dataItem.value = this.items[index].value; 
      console.log("fdsafsda",this.dataItem);
      
      const setParam = {
        id:this.items[index].id,
        data: this.dataItem
      };
      this.$store
        .dispatch("UpdateField", setParam)
        .then(res => {
          this.$set(this.items[index],'isActive',false)
        })
        .catch(err => console.log(err));
    }
  }
};
</script>