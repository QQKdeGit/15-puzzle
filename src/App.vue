<script setup>

const goal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0,]
let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0,]

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
  } else if (zeroIndex === index + 1 && index % 4 !== 0) {
    moveAnimation(element, 1)
    swap(zeroIndex - 1, index - 1)
  } else if (zeroIndex === index + 4) {
    moveAnimation(element, 2)
    swap(zeroIndex - 1, index - 1)
  } else if (zeroIndex === index - 1 && index % 4 !== 1) {
    moveAnimation(element, 3)
    swap(zeroIndex - 1, index - 1)
  }
}

const shuffle = () => {
  let l = data.length
  let index, temp
  while (l > 0) {
    index = Math.floor(Math.random() * l)
    temp = data[l - 1]
    data[l - 1] = data[index]
    data[index] = temp
    l--
  }

  data.forEach((i, idx) => {
    let element = document.getElementById('num' + i)

    if (idx % 4 === 0) element.style.left = 0 + 'px'
    else if (idx % 4 === 1) element.style.left = 144 + 'px'
    else if (idx % 4 === 2) element.style.left = 288 + 'px'
    else if (idx % 4 === 3) element.style.left = 432 + 'px'

    if (idx <= 3) element.style.top = '0px'
    else if (idx <= 7) element.style.top = '144px'
    else if (idx <= 11) element.style.top = '288px'
    else if (idx <= 15) element.style.top = '432px'
  })
}

const reset = () => {
  data = goal

  for (let i = 0; i <= 15; ++i) {
    let element = document.getElementById('num' + i)

    if (i % 4 === 1) element.style.left = 0 + 'px'
    else if (i % 4 === 2) element.style.left = 144 + 'px'
    else if (i % 4 === 3) element.style.left = 288 + 'px'
    else if (i % 4 === 0) element.style.left = 432 + 'px'

    if (i === 0) element.style.top = '432px'
    else if (i <= 4) element.style.top = '0px'
    else if (i <= 8) element.style.top = '144px'
    else if (i <= 12) element.style.top = '288px'
    else if (i <= 15) element.style.top = '432px'
  }
}
</script>

<template>
  <div class="root">
    <div style="display: flex; justify-content: center">
      <div class="game-box">
        <div class="number-block" v-for="item in data" :key="item" :id="'num' + item" @click="move(item)">
          <div style="display: flex; align-items: center; justify-content: center; height: 100%">
            <p style="font-size: 48px; color: #ffffff; user-select: none">{{ item }}</p>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top: 640px">

      <button @click="shuffle">随机</button>
      <button @click="reset" style="margin-left: 48px">重置</button>
    </div>
  </div>


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

.root {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #4568DC, #B06AB3);
  margin-top: -8px;
  margin-left: -8px;
  min-width: 900px;
}

.root::before {
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: 0;
  backdrop-filter: blur(5px);
}

.game-box {
  width: 600px;
  height: 600px;
  min-width: 600px;
  background: transparent;
  position: absolute;
}

.number-block {
  width: 120px;
  height: 120px;
  margin: 24px;
  cursor: pointer;
  position: absolute;

  transition: all 0.3s ease-in-out;

  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.2);

  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.number-block::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 100%;
  background: #ffffff;

  transform: skewX(45deg) translateX(180px);
}

.number-block:hover::before {
  transform: skewX(45deg) translateX(-180px);
  transition: transform 0.5s;
}

button {
  width: 120px;
  height: 48px;
  font-size: 20px;
  color: white;
  background: transparent;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

#num1,
#num2,
#num3,
#num4 {
  top: 0;
}

#num5,
#num6,
#num7,
#num8 {
  top: 144px;
}

#num9,
#num10,
#num11,
#num12 {
  top: 288px;
}

#num13,
#num14,
#num15,
#num0 {
  top: 432px;
}

#num1,
#num5,
#num9,
#num13 {
  left: 0;
}

#num2,
#num6,
#num10,
#num14 {
  left: 144px;
}

#num3,
#num7,
#num11,
#num15 {
  left: 288px;
}

#num4,
#num8,
#num12,
#num0 {
  left: 432px;
}

#num0 {
  z-index: -1;
  opacity: 0;
  cursor: default;
}
</style>
