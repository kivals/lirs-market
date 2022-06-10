const screenSlider = new Swiper('.screens__swiper', {
  watchOverflow: true,
  // centeredSlides: true,
  // spaceBetween: 20,
  // slidesPerView: 1.2,
  loop: true,
  speed: 600,
  // initialSlide: 2.2,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  breakpoints: {
    320: {
      slidesPerView: 1.1,
    },
    380: {
      slidesPerView: 1.3,
    },
    415: {
      slidesPerView: 1.5,
    },
    630: {
      slidesPerView: 2.3,
    },
    950: {
      slidesPerView: 3.4,
    },
    1249: {
      slidesPerView: 4.5,
    },
  }
});

const reviewsSlider = new Swiper('.reviews__swiper', {
  watchOverflow: true,
  speed: 600,
  // centeredSlides: true,
  // spaceBetween: 20,
  // slidesPerView: 1.2,
  loop: true,
  // initialSlide: 2.2,
  pagination: {
    el: '.reviews__swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    380: {
      slidesPerView: 1.2,
    },
    450: {
      slidesPerView: 1.5,
    },
    510: {
      slidesPerView: 1.7,
    },
    768: {
      slidesPerView: 2.2,
    },
  }
});
