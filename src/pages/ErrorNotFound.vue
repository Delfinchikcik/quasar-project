<template>
  <div class="container">
    <img
      src="~assets/image.png"
      class="background-image"
    >
    <div class="content fixed-center text-center">
      <p class="text-h4 text-white">Извените, выберите другой тур...<strong class="text-warning">(404)</strong></p>
      <q-btn
        color="primary"
        style="width: 200px;"
        to="/IndexPage"
        class="q-mt-md"
        label="Вернуться назад"
      />
    </div>
  </div>
</template>

<style>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.5); /* Уменьшение яркости изображения */
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
