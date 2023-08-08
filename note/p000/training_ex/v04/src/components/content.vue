<template>
  <section>
    <article>
      주 내용들이 들어감
      <button @click="cm = cm === 'Nav' ? 'Adv' : 'Nav'">변경</button>
    </article>
    <component :is="cm"></component>
  </section>
  <!-- <Nav />
  <Adv /> -->
</template>
<script>
import Nav from './nav.vue'
import Adv from './adv.vue'
export default {
  data() {
    return {
      cm: 'Nav'
    }
  },
  components: {
    Nav,
    Adv
  }
}
</script>
<style scoped>
article {
  background-color: antiquewhite;
  padding: 25px;
  border: 2px solid green;
}
section {
  text-align: center;
  border: 2px solid rgb(255, 8, 8);
  background-color: rgb(255, 255, 255);
  height: 500px;
  display: grid;
  grid-template-columns: 4fr 1fr;
}
</style>
