<template>
  <div class="slider-wrapper">
    <q-carousel
      v-model="slide"
      color="amber"
      quick-nav
      infinite
      :autoplay="autoplay"
      height="100%"
    >
      <q-carousel-slide
        v-for="slide in slides"
        :key="`key-${slide.img}`"
        class="flex flex-center"
        :img-src="`http://vladgor.com/shared_images/${slide.img}.jpg`"
      >
        <div class="text-center">
          <div class="q-display-3">{{ slide.title }}</div>
          <div>{{ slide.text }}</div>
        </div>
      </q-carousel-slide>

      <q-carousel-control
        slot="control"
        position="top-right"
        :offset="[18, 18]"
        class="text-white"
        style="background: rgba(0, 0, 0, .3); padding: 4px; border-radius: 4px"
      >
        <q-toggle dark color="amber" v-model="autoplay" label="Auto Play" />
      </q-carousel-control>
      <q-carousel-control slot="control-progress" slot-scope="carousel" position="bottom" :offset="[42, 100]">
        <q-progress :percentage="carousel.percentage" stripe color="amber" :animate="autoplay" />
      </q-carousel-control>
    </q-carousel>
  </div>
</template>

<style lang="stylus">
.slider-wrapper
  height: 100%
.text-center
  color #fff
  background-color rgba(0, 0, 0, .3)
  padding 30px
</style>

<script>
import { easing } from 'quasar'
export default {
  name: 'SimpleSlider',
  data: () => ({
    slide: 0,
    autoplay: true,
    overshoot: easing.overshoot,
    slides: [
      {img:'plane', title:'To the sky', text:'does\'t matter where to...'},
      {img:'seal', title:'I\'m cute', text:'am i?'},
      {img:'lake', title:'Just chill', text:'take a full breath and relax'}
    ],
    modal: false,
    thumbnailsHorizontal: false
  })
}
</script>
