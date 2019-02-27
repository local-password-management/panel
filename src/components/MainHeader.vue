<template>
  <div class="main__header bg-color ml-auto">
    <div class="row mx-0 align-items-center">
      <div class="col-md-4 col-sm-4">
        <router-link to="/Create" class="create-btn d-inline-block">
          <i class="fas fa-plus size-12"></i>
          <span class="cc-font cc-400 size-14 pl-1">Create a project</span>
        </router-link>
      </div>
      <div class="col-lg-6 col-md-6 col-12 ml-auto text-right">
        <span class="user d-inline-block pr-3">
          <img class="user__profileimg" :src="profileImg" alt="Hesabım">
          <span class="cc-font cc-400 pl-2">Recep Tayyip Özen</span>

          <ul class="user__list bg-color text-left">
            <li class="user__list__item" @click="LogOut">
              <span class="cc-font cc-500 size-16">Çıkış</span>
            </li>
          </ul>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import Imgsrc from "@/assets/images/profileicon.png";
export default {
  name: "MainHeader",
  data() {
    return {
      profileImg: Imgsrc
    };
  },
  methods: {
    LogOut() {
      this.$store.dispatch("logout").then(() => this.$router.push("/"));
    }
  }
};
</script>