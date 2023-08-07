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
import axios from 'axios'

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
    },
    naverTranslate(text) {
      const clientId = 'YOUR_NAVER_API_CLIENT_ID'
      const clientSecret = 'YOUR_NAVER_API_CLIENT_SECRET'
      const apiURL = 'https://openapi.naver.com/v1/papago/n2mt'

      axios
        .post(
          apiURL,
          {
            source: 'en',
            target: 'ko',
            text: text
          },
          {
            headers: {
              'X-Naver-Client-Id': clientId,
              'X-Naver-Client-Secret': clientSecret
            }
          }
        )
        .then((response) => {
          const translatedText = response.data.message.result.translatedText
          // TODO: 필요한 대로 번역된 텍스트를 사용하세요.
          console.log(translatedText)
        })
        .catch((error) => {
          console.error('번역에 실패했습니다.', error)
        })
    }
  }
}
</script>
