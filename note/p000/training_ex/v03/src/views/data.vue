<template>
  <div>
    <h2>Page1: 업로드 데이터파일을 분석및 학습 후 임의의 결과 예측</h2>
    <input type="file" @change="readExcel" />
    <button @click="predictSonHeight">분석시작</button>
    <hr />
    <table>
      <tr>
        <td>아빠키</td>
        <td>
          <input
            type="text"
            v-model="fatherHeight"
            placeholder="값을 입력해주세요"
          />
        </td>
      </tr>
      <tr>
        <td>아들키</td>
        <td>
          <p>{{ result }}</p>
        </td>
      </tr>
    </table>
    <div id="chart"></div>
  </div>
</template>

<script>
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import * as XLSX from 'xlsx'

export default {
  data() {
    return {
      fatherHeight: '',
      result: '대기중...',
      father: [],
      son: []
    }
  },
  methods: {
    readExcel(event) {
      const input = event.target
      const reader = new FileReader()
      reader.onload = () => {
        const data = reader.result
        const workBook = XLSX.read(data, { type: 'binary' })
        const x = workBook.Sheets.trainData // Data 자리는 대상 엑셀파일의 시트이름을 지정
        for (let i = 2; i < 757; i++) {
          const ftArr = []
          const sonArr = []
          ftArr.push(x['A' + i].v)
          sonArr.push(x['B' + i].v)
          this.father.push(ftArr)
          this.son.push(sonArr)
        }
        console.log(this.father, this.son)
      }
      reader.readAsBinaryString(input.files[0])
    },
    predictSonHeight() {
      /* 입력(input)부분 예외처리 구문 */
      if (!this.fatherHeight) {
        this.result = '아빠키를 입력해주세요.'
        return
      }
      const fatherHeight = parseFloat(this.fatherHeight)
      if (isNaN(fatherHeight)) {
        this.result = '올바른 숫자를 입력해주세요.'
        return
      }
      if (this.father.length === 0 || this.son.length === 0) {
        this.result = '훈련할 자료가 없습니다.'
        return
      }
      this.result = '데이터 로딩중...'

      const x = this.father
      const y = this.son
      const xt = tf.tensor(x)
      const yt = tf.tensor(y)

      /* 2. 모델 만들기 */
      const xx = tf.input({ shape: [1] })
      const h1 = tf.layers.dense({ units: 50, activation: 'relu' }).apply(xx)
      const h2 = tf.layers.dense({ units: 25, activation: 'sigmoid' }).apply(h1)
      const yy = tf.layers.dense({ units: 1 }).apply(h2)
      const model = tf.model({ inputs: xx, outputs: yy })
      const cparam = {
        optimizer: tf.train.adam(),
        loss: tf.losses.meanSquaredError
      }
      model.compile(cparam)

      tfvis.show.modelSummary(
        { name: 'Model Summary', tab: 'Model Summary' },
        model
      )

      /* 3. 모델로 훈련시작 */
      const fparam = {
        epochs: 1000,
        batchSize: 128,
        callbacks: [
          tfvis.show.fitCallbacks({ name: '선그래프', tab: '그래프' }, [
            'loss',
            'acc'
          ]),
          {
            onEpochEnd: (epoch, logs) => {
              console.log('epoch:', epoch, logs, 'RMSE=>', Math.sqrt(logs.loss))
            }
          }
        ]
      }
      model.fit(xt, yt, fparam).then(() => {
        const prediction = model
          .predict(tf.tensor([[fatherHeight]]))
          .dataSync()[0]
        this.result = `아빠의 키가 ${fatherHeight}cm일 때, 아들의 예상 키는 ${prediction.toFixed(
          2
        )}cm입니다.`
      })
    }
  }
}
</script>
