<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      <h1 class="rb-font rb-600 size-20 py-3">{{item.field_group.name}}</h1>
      <div class="content sh-box bg-color col-md-12">
        <div class="row align-items-end">
          <div class="col">
            <label class="cc-font cc-600 size-16 d-block">Key</label>
            <input
              type="text"
              class="form-control gen-input"
              v-model="item.key"
              :disabled="!item.isActive"
            >
          </div>
          <div class="col">
            <label class="cc-font cc-600 size-16 d-block">Value</label>
            <input
              type="text"
              class="form-control gen-input"
              v-model="item.value"
              :disabled="!item.isActive"
            >
          </div>
          <div class="col">
            <label for class="cc-font cc-600 size-16">Field Name</label>
            <select
              class="form-control gen-input"
              v-model="item.field_group_id"
            >
              <option
                v-for="(option, index) in fieldGroups"
                :key="index"
                :value="option.id"
                :disabled="!item.isActive"
              >{{option.name}}</option>
            </select>
          </div>
          <div class="col" v-if="!item.isActive">
            <a
              class="create-btn cc-font cc-600 d-inline-block mx-auto" 
              @click="EditField(index)"
            >Edit</a>

          </div>
          <div class="col" v-else>
            <button class="create-btn cc-font cc-600 d-inline-block mx-auto" @click="SaveField(index)">Save</button>
            <button class="delete-btn cc-font cc-600 d-inline-block mx-auto" @click="DeleteField(index)">Delete</button>

          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import Axios from '../../helper/auth'
export default {
  name: "EnvItem",
  props: ["items"],
  data() {
    return {
      fieldGroups:{},
    };
  },
  created(){
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
    // eğer path createfield/:id ise -- EditProject ve Edit Post-- çalışır
    EditField(index) {
      this.$set(this.items[index],'isActive',true)
      console.log("data",this.items);
    },
    SaveField(index) {
      const setParam = {
        id:this.items[index].id,
        data: this.items[index]
      };
      this.$store
        .dispatch("UpdateField", setParam)
        .then(res => {
          this.$set(this.items[index],'isActive',false)
        })
        .catch(err => console.log(err));
    },
    DeleteField(index){
      this.$store.dispatch("DeleteField",this.items[index].id).then(res=>{
        this.$swal({
          type:"success",
          text:"Deleted",
          confirmButtonColor:"#00b730"
        });
        this.$delete(this.items,index)
        console.log(this.items,"slinen",this.items[index])
      }).catch(err => err);
    }
   
  },
  
};
</script>