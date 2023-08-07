import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'
import ImageClassifier from './views/ImageClassifier.vue'
import data from './views/data.vue'
const app = createApp(App)

// 이미지 분류 관련 라이브러리를 Vue 앱의 전역 속성으로 추가합니다.
app.config.globalProperties.tf = tf
app.config.globalProperties.$mobilenet = mobilenet

// ImageClassifier 컴포넌트를 사용하도록 설정합니다.
app.component('ImageClassifier', ImageClassifier)
app.component('data', data)

app.use(router).mount('#app')
