<template>
  <div class="container h-100vh">
    <Alert></Alert>
    <div class="row align-items-center h-100">
      <div class="col">
        <form class="form-signin" @submit.prevent="signin">
          <h1 class="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail" class="form-control" placeholder="Email address"
            required autofocus v-model="user.username">
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password"
            required v-model="user.password">
          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"> Remember me
            </label>
          </div>
          <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">Sign in</button>
          <router-link class="btn btn-lg btn-light btn-block" to="/cake-test">返回首頁</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/AlertMessage';

export default {
  components: {
    Alert,
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    // NOTE: Func - Login API Admin Data
    signin() {
      const vm = this;
      const api = `${process.env.APIPATH}/admin/signin`;
      vm.$http.post(api, vm.user).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          // * 儲存 token and expired 方法
          const token = response.data.token;
          const expired = response.data.expired;
          document.cookie = `hexToken=${token}; expired=${new Date(expired)}`;
          vm.$router.push('/admin/Products');
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        }
      });
    },
  },
};
</script>

<style scoped>
.h-100vh {
  height: 100vh;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
