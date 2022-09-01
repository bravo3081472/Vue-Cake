<template>
  <div>
    <header>
      <nav class="navbar navbar-expand">
        <div class="container-fluid w-50 m-auto">
          <a class="navbar-brand logo" href="#">Cake Test</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">首頁 <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <router-link class="nav-link active" to="/CustomerOrders">商品一覽
                  <span class="sr-only">(current)</span>
                </router-link>
              </li>

            </ul>
            <!-- <form class="form-inline mt-2 mt-md-0">
            <input class="form-control mr-sm-2" type="text" placeholder="Search"
              aria-label="Search" />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form> -->
            <!-- <button class="btn btn-outline-success my-2 mx-2 my-sm-0" type="submit"
              @click="GoToLogin">
              登入
            </button> -->
            <button class="btn btn-outline-success my-2 mx-2 my-sm-0" type="submit"
              data-toggle="modal" data-target="#LoadModel">
              登入
            </button>
          </div>

        </div>
      </nav>
    </header>

    <!-- Modal -->
    <LoadModal></LoadModal>
    <!-- <div class="modal fade" id="LoadModel" tabindex="-1" role="dialog"
    aria-labelledby="LoadModel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="LoadModel">登入</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <form class="form-signin">
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" id="inputEmail" class="form-control" placeholder="Email address"
                  required autofocus>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" class="form-control"
                  placeholder="Password" required>
                <div class="checkbox mb-3">
                  <label>
                    <input type="checkbox" value="remember-me"> Remember me
                  </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script>
import LoadModal from './LoadModal';

export default {
  components: {
    LoadModal,
  },
  methods: {
    GoToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.logo {
  font-size: 30px;
}
.nav-link {
  padding: 1.5em !important;
}
</style>
