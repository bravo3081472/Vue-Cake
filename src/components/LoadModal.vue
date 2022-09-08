<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="LoadModel" tabindex="-1" role="dialog" aria-labelledby="LoadModel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <form class="form-signin" @submit.prevent="signin">
              <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

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
              <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
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
          $('#LoadModel').modal('hide');
          vm.$router.push('/admin/Products');
        } else {
          // TODO: 製作登入失敗 modal
          // eslint-disable-next-line no-alert
          alert('登入失敗');
        }
      });
    },
  },
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 100px 10px;
  margin: auto;
  text-align: center;
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
  margin-bottom: 10px;
  border-radius: 5px;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-radius: 5px;
}
.form-signin button {
  border-radius: 50px;
}
</style>
