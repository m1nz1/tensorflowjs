<script setup>
import USD from '@/components/USD.vue'
// @ <- src 상대주소
import JYP from '../components/JPY.vue'
import { ref } from 'vue'
const select = ref('USD')
</script>
<template>
  <div>
    <button @click="select = USD">달러</button>
    <button @click="select = JYP">엔화</button>
    <keep-alive>
      <component :is="select"></component>
    </keep-alive>
  </div>
</template>
<script></script>
<style></style>
