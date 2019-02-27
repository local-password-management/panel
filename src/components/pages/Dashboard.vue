<template>
  <div class="main">
    <MainHeader/>
    <MainLeftSide/>
    <div class="main__wrapper ml-auto">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>


<script>
import MainLeftSide from '../MainLeftSide'
import MainHeader from '../MainHeader'
import axios from 'axios';
export default {
  name: 'Dashboard',
  components:{
    'MainLeftSide' : MainLeftSide,
    'MainHeader': MainHeader
  },
  data () {
    return {
      data:{}
    }
  },
  methods:{
    
  },
  mounted(){
  }

}
</script>