<script setup>

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0,]

const swap = (i, j) => {
  let temp = data[i]
  data[i] = data[j]
  data[j] = temp
}

const moveAnimation = (element, direction) => {
  let zeroElement = document.getElementById('num0')

  switch (direction) {
    case 0: // 向上
      element.style.top = (element.offsetTop - 120 - 48) + 'px'
      zeroElement.style.top = (zeroElement.offsetTop + 120) + 'px'
      break
    case 1: // 向右
      element.style.left = (element.offsetLeft + 120) + 'px'
      zeroElement.style.left = (zeroElement.offsetLeft - 120 - 48) + 'px'
      break
    case 2: // 向下
      element.style.top = (element.offsetTop + 120) + 'px'
      zeroElement.style.top = (zeroElement.offsetTop - 120 - 48) + 'px'
      break
    case 3: // 向左
      element.style.left = (element.offsetLeft - 120 - 48) + 'px'
      zeroElement.style.left = (zeroElement.offsetLeft + 120) + 'px'
      break
  }
}

const move = (idx) => {
  if (idx === 0) return

  let zeroIndex = data.findIndex(i => i === 0) + 1
  let index = data.findIndex(i => i === idx) + 1

  let element = document.getElementById('num' + idx)

  if (zeroIndex === index - 4) {
    moveAnimation(element, 0)
    swap(zeroIndex - 1, index - 1)
  }
  else if (zeroIndex === index + 1 && index % 4 !== 0) {
    moveAnimation(element, 1)
    swap(zeroIndex - 1, index - 1)
  }
  else if (zeroIndex === index + 4) {
    moveAnimation(element, 2)
    swap(zeroIndex - 1, index - 1)
  }
  else if (zeroIndex === index - 1 && index % 4 !== 1) {
    moveAnimation(element, 3)
    swap(zeroIndex - 1, index - 1)
  }
  else {
    console.log('illegal')
  }

}
</script>

<template>
  <div style="display: flex; justify-content: center; ">
    <div class="game-box">
      <div class="number-block" v-for="item in data" :key="item" :id="'num' + item" @click="move(item)">
        <div style="display: flex; align-items: center; justify-content: center; height: 100%">
          <p style="font-size: 48px; color: #ffffff; user-select: none">{{ item }}</p>
        </div>
      </div>
    </div>
  </div>

  <el-button @click="swap" style="margin-top: 600px">12323</el-button>
</template>

<script>

export default {
  name: 'App',
  components: {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.game-box {
  width: 600px;
  height: 600px;
  min-width: 600px;
  background: #2c3e50;
  position: absolute;
}

.number-block {
  width: 120px;
  height: 120px;
  background: #42b983;
  margin: 24px;
  cursor: pointer;
  position: absolute;

  transition: all 0.3s ease-in-out;
}

#num1 {
  top: 0;
  left: 0;
}

#num2 {
  top: 0;
  left: 144px;
}

#num3 {
  top: 0;
  left: 288px;
}

#num4 {
  top: 0;
  left: 432px;
}

#num5 {
  top: 144px;
  left: 0;
}

#num6 {
  top: 144px;
  left: 144px;
}

#num7 {
  top: 144px;
  left: 288px;
}

#num8 {
  top: 144px;
  left: 432px;
}

#num9 {
  top: 288px;
  left: 0;
}

#num10 {
  top: 288px;
  left: 144px;
}

#num11 {
  top: 288px;
  left: 288px;
}

#num12 {
  top: 288px;
  left: 432px;
}

#num13 {
  top: 432px;
  left: 0;
}

#num14 {
  top: 432px;
  left: 144px;
}

#num15 {
  top: 432px;
  left: 288px;
}

#num0 {
  top: 432px;
  left: 432px;
  z-index: -1;
  opacity: 0;
  cursor: default;
}
</style>
