<template>
  <main class="index">
    <header>
      <div class="logo"></div>
      <nav>
        <ul>
          <li v-for="(item, index) in navArray.value" :key="index">
            {{ item }} <template v-if="index === 0">/</template>
          </li>
        </ul>
      </nav>
    </header>

    <div class="index_main">
      <div class="screen screen1">
        <Swiper
          class="swiper-container"
          :slidesPerView="1"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }"
          :autoplay="{ autoplay: true }"
          :loop="true"
          :pagination="{ clickable: true }"
          :modules="modules"
          effect="fade"
        >
          <SwiperSlide class="swiper-slide" v-for="(item, i) in imgs" :key="i">
            <img :src="item" alt="" />
          </SwiperSlide>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </Swiper>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

import swiper1 from "@/assets/image/swiper1.jpg";
import swiper2 from "@/assets/image/swiper2.jpg";
import swiper3 from "@/assets/image/swiper3.jpg";

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper";

const navArray = reactive({
  value: ["HOME", "ABOUT US", "NEWS"],
});

const imgs = reactive([swiper1, swiper2, swiper3]);

const modules = [Navigation, Pagination, Scrollbar, A11y, EffectFade];
</script>

<style lang="scss" scoped>
.index {
  position: relative;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    .logo {
      margin: 30px 0 0 40px;
      width: 260px;
      height: 45px;
      background: url("../assets/image/logo1_03.png") no-repeat;
      background-size: 100% 100%;
      box-sizing: border-box;
    }
    nav {
      ul {
        display: flex;
        align-items: center;
        li {
          font-size: 16px;
          display: inline-block;
          vertical-align: middle;
          padding: 0 20px;
          color: #282828;
          font-family: "h";
        }
      }
    }
  }

  .index_main {
    position: absolute;
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    .screen,
    .swiper-container,
    .swiper-slide,
    img {
      height: 100vh;
      width: 100%;
    }
  }
}
</style>
