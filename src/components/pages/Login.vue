<template>
  <div id="login" class="login">
    <div class="container">
      <div class="row mx-0">
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-8 col-12 mx-auto">
          <div class="login__wrapper__form">
            <form class="form" @submit.prevent="LogIn">
              <h1 class="clr-wh cc-font cc-500 text-center mb-5">Giriş Yap</h1>
              <div class="form-group mb-4">
                <input
                  type="text"
                  class="form-control login__input size-14"
                  id="username-input"
                  placeholder="Kullanıcı Adı"
                  v-model="username"
                >
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control login__input size-14"
                  id="password-input"
                  placeholder="Şifre"
                  v-model="password"
                >
              </div>
              <button class="login__btn mt-4 cc-font cc-500 size-16" type="submit">Giriş Yap</button>
              <p class="text-center mt-3 mb-0">
                <a class="clr-wh size-12 cc-font login__forget">Şifremi Unuttum!</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {},
  methods: {
    LogIn() {
      if (this.username == "" || this.password == "") {
        this.$swal({
            type: "warning",
            text: 'Please fill in the fields',
          });
        return false;
      }
      const userInfo = {
        client_id: "1",
        client_secret: "3cSPXzIXRMLouicb5wckXJLYmk0Pgkqh6dXjl3nb",
        grant_type: "password",
        username: this.username,
        password: this.password
      };

      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
      });

      this.$store
        .dispatch("Login", userInfo)
        .then(res => {
          Toast.fire({
            type: "success",
            title: "Signed in successfully"
          });
          setTimeout(() => {
            this.$router.push("/dashboard");
          }, 1000);
        })
        .catch(err => {
          this.$swal({
            type: "warning",
            text: 'Please check the fields',
          });
          this.$router.push("/");
        });
    }
  }
};
</script>