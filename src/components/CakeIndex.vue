<template>
  <div>
    <Navber></Navber>
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

      <div class="container-md-12 mx-5">
        <div class="row">
          <div class="col-md-2">
            <Sidebar></Sidebar>
          </div>
          <div class="col-md-10">
            <router-view></router-view>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <footer class="container">
        <p class="float-right"><a href="#">Back to top</a></p>
        <p>
          &copy; 2017-2021 Company, Inc. &middot;
          <a href="#">Privacy</a> &middot; <a href="#">Terms</a>
        </p>
      </footer>
    </main>
  </div>
</template>

<script>
import Navber from './Navber';
import Sidebar from './Sidebar';

export default {
  components: {
    Navber,
    Sidebar,
  },
};
</script>

<style scoped>
/* CUSTOMIZE THE CAROUSEL
-------------------------------------------------- */

/* Carousel base class */
.carousel {
  margin-bottom: 4rem;
}
/* Since positioning the image, we need to help out the caption */
.carousel-caption {
  bottom: 3rem;
  z-index: 10;
}

/* 撐高 img 區塊 */
.carousel-item {
  height: 30rem;
}
.carousel-item > img {
  position: absolute;
  top: 0;
  left: 0;
  height: 30rem;
  min-width: 100%;
  object-fit: cover;
}

/* MARKETING CONTENT
-------------------------------------------------- */

/* Center align the text within the three columns below the carousel */
.marketing .col-lg-4 {
  margin-bottom: 1.5rem;
  text-align: center;
}
.marketing h2 {
  font-weight: 400;
}
.marketing .col-lg-4 p {
  margin-right: 0.75rem;
  margin-left: 0.75rem;
}

/* Featurettes
------------------------- */

.featurette-divider {
  margin: 5rem 0; /* Space out the Bootstrap <hr> more */
}

/* Thin out the marketing headings */
.featurette-heading {
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.05rem;
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
