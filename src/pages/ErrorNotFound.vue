<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">Извините, здесь ничего нет...<strong>(404)</strong></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      to="/IndexPage"
      label="Вернуться назад"
    />
  </div>
</template>

<script>
export default {
  name: 'ErrorNotFound'
}
</script>
