<template>
  <div>
    <h1>image upload</h1>
    <input type="file" @change="handleFileUpload" accept="image/*" />
    <img
      :src="imageUrl"
      alt="선택된 이미지"
      style="width: 500px; height: 500px"
      ref="img"
    />
    <p id="predictions" ref="predictions">{{ predictionText }}</p>
  </div>
</template>

<script>
import * as mobilenet from '@tensorflow-models/mobilenet'
// import axios from 'axios'

export default {
  data() {
    return {
      imageUrl: '',
      predictionText: ''
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        this.imageUrl = event.target.result
        this.predictionText = '인식중...' // 이미지를 업로드하면 "인식중..."으로 설정
        this.runImageClassification()
      }
      reader.readAsDataURL(file)
    },
    runImageClassification() {
      mobilenet.load().then((model) => {
        model.classify(this.$refs.img).then((predictions) => {
          const topPrediction = predictions[0]
          const probability = (topPrediction.probability * 100).toFixed(2)
          this.predictionText = `
            ${topPrediction.className}
            ${probability}%
          `

          if (probability >= 80) {
            this.$refs.predictions.style.fontWeight = 'bold'
          } else {
            this.$refs.predictions.style.fontWeight = 'normal'
          }

          this.naverTranslate(topPrediction.className)
        })
      })
    }
  }
}
</script>
