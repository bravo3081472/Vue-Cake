<template>
  <div>
    <!-- NOTE: component - "Navbar" -->
    <Navbar></Navbar>
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
                <h1>Example headline.</h1>
                <p>
                  Some representative placeholder content for the first slide of
                  the carousel.
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
                <h1>Another example headline.</h1>
                <p>
                  Some representative placeholder content for the second slide
                  of the carousel.
                </p>
                <p><a class="btn btn-lg btn-primary" href="#">Learn more</a></p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img src="../assets/Cakeindex/carousel-item3.jpg" alt="">

            <div class="container">
              <div class="carousel-caption text-right">
                <h1>One more for good measure.</h1>
                <p>
                  Some representative placeholder content for the third slide of
                  this carousel.
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
      <footer class="container-fluid mt-3 border-top">
        <div class="footer">
          <p class="footer_text">
            &copy; 2017-2021 Company, Inc. &middot;
            <a href="#">Privacy</a> &middot; <a href="#">Terms</a>
          </p>
          <a href="#" class="btn btn-outline-primary footer_link">Back to top</a>
        </div>
      </footer>

      <button class="btn btn-outline-primary card_button"
      data-toggle="modal" data-target="#CartModal">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
      <!-- NOTE: component - "CartModal" -->
      <CartModal></CartModal>
    </main>
  </div>
</template>

<script>
import Navbar from './Navbar';
import CartModal from './CartModal';

export default {
  components: {
    Navbar,
    CartModal,
  },
};
</script>

<style lang="scss" scoped>
// NOTE: scss
/* 燈箱 base class */
.carousel {
  margin-top: 5rem;
  margin-bottom: 4rem;
}
.carousel-caption {
  padding: 2rem;
  box-sizing: border-box;
  background: rgba(0, 0, 0, .3);
  bottom: 3rem;
  z-index: 10;
}
/* 撐高 img 區塊 */
.carousel-item {
  height: 30rem;
  & > img {
    position: absolute;
    top: 0;
    left: 0;
    height: 30rem;
    min-width: 100%;
    object-fit: cover;
  }
}
.footer {
  display: flex;
  width: 50%;
  margin: auto;
  padding: 20px 0;
  a {
    text-decoration: none;
  }
  .footer_text {
    margin: auto 0 auto;
  }
  .footer_link {
    margin-left: auto;
  }
}
.card_button {
  position: fixed;
  right: 2rem;
  bottom: 1rem;
  width: 5rem;
  height: 5rem;
  margin-right: calc(100% - 100vw);
  font-size: 2rem;
  border-radius: 50%;
}

/* RESPONSIVE CSS
-------------------------------------------------- */

@media (min-width: 40em) {
  /* Bump up size of carousel content */
  .carousel-caption p {
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .featurette-heading {
    font-size: 50px;
  }
}

@media (min-width: 62em) {
  .featurette-heading {
    margin-top: 7rem;
  }
}
</style>
