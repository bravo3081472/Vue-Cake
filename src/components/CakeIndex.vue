<template>
  <div>
    <!-- NOTE: component - "Navbar" -->
    <Navbar></Navbar>
    <Alert></Alert>
    <main role="main">
      <!-- 燈箱 -->
      <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <!-- 燈箱進度條 -->
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>

        <!-- 燈箱輪播 -->
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../assets/Cakeindex/carousel-item1.jpg" alt="">

            <div class="container">
              <div class="carousel-caption text-left">
                <h1>展示 輪播1</h1>
                <p>
                  展示 輪播1 文字
                </p>
                <p>
                  <a class="btn btn-lg btn-primary" href="#">Sign up today</a>
                </p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img src="../assets/Cakeindex/carousel-item2.jpg" alt="">

            <div class="container">
              <div class="carousel-caption">
                <h1>展示 輪播2</h1>
                <p>
                  展示 輪播2 文字
                </p>
                <p><a class="btn btn-lg btn-primary" href="#">Learn more</a></p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img src="../assets/Cakeindex/carousel-item3.jpg" alt="">

            <div class="container">
              <div class="carousel-caption text-right">
                <h1>展示 輪播3</h1>
                <p>
                  展示 輪播3 文字
                </p>
                <p>
                  <a class="btn btn-lg btn-primary" href="#">Browse gallery</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 燈箱左右切換 -->
        <button class="carousel-control-prev" type="button" data-target="#myCarousel"
          data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-target="#myCarousel"
          data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </button>
      </div>

      <!-- BODY -->
      <div id="products_list" class="container">
        <div class="row">
          <div class="col-md-12">
            <router-view></router-view>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <footer class="container-sm footer mt-3">
        <div class="footer__content">
          <p class="footer__content__text">
            &copy; 2022-2022 Company, Inc. &middot;
          </p>
          <a href="#" class="btn btn-outline-primary footer__content__link">Back to top</a>
        </div>
      </footer>

      <button class="btn btn-outline-primary open-cart__button" data-toggle="modal"
        data-target="#CartModal">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
      <!-- NOTE: component - "CartModal" -->
      <CartModal></CartModal>
    </main>
  </div>
</template>

<script>
import Alert from '@/components/AlertMessage';
import Navbar from './Navbar';
import CartModal from './CartModal';

export default {
  components: {
    Navbar,
    CartModal,
    Alert,
  },
};
</script>
