<template>
  <div>
    <div>OpenAI 자연어 처리기반 GPT3.5 turbo 챗</div>
    <hr />
    <textarea
      disabled
      name=""
      id=""
      cols="30"
      rows="10"
      :value="resp"
    ></textarea>
    <br />
    <input
      @keyup.enter="gpt3()"
      v-model="inData"
      placeholder="질문할 내용 입력하기"
    />
    <button @click="gpt3()">묻기</button>
  </div>
</template>
<script>
import { gpt3 } from '../../public/gpt3.js'
export default {
  data() {
    return {
      inData: '',
      resp: ''
    }
  },
  methods: {
    gpt: async function () {
      this.resp = '타이핑중'
    }
  }
}
</script>
<style scoped>
textarea {
  font-size: 1.1em;
  color: cadetblue;
  resize: non;
  font-weight: bold;
  background-color: rgb(245, 252, 187);
}
input {
  width: 210px;
  height: 30px;
}
button {
  width: 45px;
  height: 39px;
}
</style>
