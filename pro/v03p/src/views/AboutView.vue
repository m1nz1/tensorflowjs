<template>
  <div class="container">
    <div v-for="(item, idx) in lists" :key="item.id">
      <div class="col" @drop.prevent="onDrop($event, idx)" @dragover.prevent>
        <div
          class="box"
          v-for="(numItem, idx) in item.numberList"
          :key="idx"
          draggable="true"
          @dragstart="startDrag($event, numItem)"
        >
          <p>{{ numItem.content }}</p>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="disp"></div>
    <hr />
    <div>data: {{ lists }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lists: [
        { id: 1, numberList: [{ content: 4 }, { content: 7 }] },
        {
          id: 2,
          numberList: [
            { content: 5 },
            { content: 8 },
            { content: 2 },
            { content: 1 },
            { content: 6 }
          ]
        },
        { id: 3, numberList: [{ content: 3 }, { content: 9 }] }
      ],
      done: [
        { id: 1, numberList: [{ content: 1 }, { content: 4 }, { content: 7 }] },
        { id: 2, numberList: [{ content: 2 }, { content: 5 }, { content: 8 }] },
        { id: 3, numberList: [{ content: 3 }, { content: 6 }, { content: 9 }] }
      ],
      sucess: ''
    }
  },
  methods: {
    startDrag(ev, item) {
      ev.dataTransfer.setData('some', item.content)
    },
    onDrop(ev, colNum) {
      // 리스트에서 선택된 아이템과 같은 content 값을 가진 요소를 찾아 index를 반환
      const selectedItem = ev.dataTransfer.getData('some') * 1
      let targetIdex, targetItem
      this.lists.forEach((Obj, index) => {
        Obj.numberList.forEach((ob) => {
          if (ob.content === selectedItem) {
            targetIdex = index
            targetItem = ob
          }
        })
      })
      // drop이 된 <div> idex를 받아 리스트에 추가
      this.lists[colNum].numberList.push(targetItem)
      this.lists[targetIdex].numberList.splice(
        this.lists[targetIdex].numberList.indexOf(targetItem),
        1
      )
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  width: 512px;
  margin: 32px auto;
  justify-content: center;
}
.col {
  display: flex;
  height: 500px;
  width: 150px;
  background-color: white;
  border: 3px solid rgb(232, 231, 231);
  margin-left: 5px;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
}
.box {
  width: 130px;
  height: 50px;
  color: #ff00bb;
  background-color: rgb(246, 211, 228);
  margin-top: 10px;
  border-radius: 5px;
}
</style>
