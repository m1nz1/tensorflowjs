<template>
  <div>
    <Header />
    <Content />
    <Footer />
  </div>
</template>
<script>
import Header from '../components/header.vue'
import Content from '../components/content.vue'
import Footer from '../components/footer.vue'
export default {
  components: {
    Header,
    Content,
    Footer
  }
}
</script>
<style></style>
