<script setup>
import StepBoard from "@/components/StepBoard"
import {ref} from "vue";

const goal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0,]
let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0,]
let autoMoveData = []
const showStepDataList = ref([])

let path = []
let minLength = 0, maxLength
let isMin = false
let moveStep = [-4, -1, 1, 4]

const swap = (i, j, list) => {
  let temp = list[i]
  list[i] = list[j]
  list[j] = temp
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

  let zeroIndex = data.findIndex(i => i === 0)
  let index = data.findIndex(i => i === idx)

  let element = document.getElementById('num' + idx)

  if (zeroIndex === index - 4) {
    moveAnimation(element, 0)
    swap(zeroIndex, index, data)
  } else if (zeroIndex === index + 1 && index % 4 !== 3) {
    moveAnimation(element, 1)
    swap(zeroIndex, index, data)
  } else if (zeroIndex === index + 4) {
    moveAnimation(element, 2)
    swap(zeroIndex, index, data)
  } else if (zeroIndex === index - 1 && index % 4 !== 0) {
    moveAnimation(element, 3)
    swap(zeroIndex, index, data)
  }

  if (checkWin()) win()
}

const checkWin = () => {
  for (let i = 0; i <= 15; ++i) {
    if (data[i] !== goal[i])
      return false
  }
  return true
}

const win = () => {
  console.log('你赢了')
}

const shuffle = () => {
  let time = data.length
  while (time > 0) {
    swap(time - 1, Math.floor(Math.random() * time), data)
    time--
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
  data = goal.concat()
  showStepDataList.value = []

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

const hasSolution = (a) => {
  const zeroIndex = data.findIndex(i => i === 0)
  let inversion = 0

  for (let i = 0; i < 16; ++i) {
    for (let j = i + 1; j < 16; ++j) {
      if (a[i] > a[j]) inversion++
    }
  }

  inversion += Math.abs(zeroIndex / 4 - 3) + Math.abs(zeroIndex % 4 - 3)
  return inversion % 2
}

const evaluate = (a) => {
  let cost = 0

  for (let i = 0; i < 16; ++i) {
    if (data[i] === 0)
      cost += (3 - Math.floor(i / 4)) + (3 - i % 4)
    else if (data[i] % 4 === 0)
      cost += Math.abs(Math.floor(data[i] / 4) - 1 - Math.floor(i / 4)) + Math.abs(3 - i % 4)
    else
      cost += Math.abs(Math.floor(data[i] / 4) - Math.floor(i / 4)) + Math.abs(data[i] % 4 - 1 - i % 4)
  }

  return cost
}

const IDA_Star = (index, len, lastMove) => {
  if (isMin) return;
  let cost = evaluate(data);

  if (len === maxLength) {
    if (cost === 0) {
      isMin = true;
      minLength = len;
    }
    return;
  } else if (len < maxLength) {
    if (cost === 0) {
      isMin = true;
      minLength = len;
      return;
    }
  }

  for (let i = 0; i < 4; ++i) {
    if (i + lastMove === 3 && len > 0) continue;

    if (index + moveStep[i] >= 0
        && index + moveStep[i] <= 15
        && !(index % 4 === 0 && i === 1)
        && !(index % 4 === 3 && i === 2)) {
      swap(index, index + moveStep[i], data)

      let newCost = evaluate(data);
      if (newCost + len <= maxLength && !isMin) {
        path[len] = i;
        IDA_Star(index + moveStep[i], len + 1, i);

        if (isMin) return;
      }

      swap(index, index + moveStep[i], data)
    }
  }
}

const restore = () => {
  if (checkWin()) return

  if (hasSolution(data)) {
    autoMoveData = data.concat()

    maxLength = evaluate(data);

    while (!isMin && minLength <= 50) {
      IDA_Star(data.findIndex(i => i === 0), 0, 0);
      if (!isMin) maxLength++;
    }

    if (isMin) {
      autoMove()
    }
  } else if (!hasSolution(data) || !isMin)
    console.log('no answer')
}

const autoMove = () => {
  showStepDataList.value = []
  let step = 0
  let timer = setInterval(() => {
    let zeroIndex = autoMoveData.findIndex(i => i === 0)
    showStepDataList.value.push(autoMoveData.concat())

    switch (path[step]) {
      case 0: // 0要向上
        if (zeroIndex - 4 < 0) break
        moveAnimation(document.getElementById('num' + autoMoveData[zeroIndex - 4]), 2)
        swap(zeroIndex, zeroIndex - 4, autoMoveData)
        break
      case 1: // 0要向左
        if (zeroIndex - 1 < 0) break
        moveAnimation(document.getElementById('num' + autoMoveData[zeroIndex - 1]), 1)
        swap(zeroIndex, zeroIndex - 1, autoMoveData)
        break
      case 2: // 0要向右
        if (zeroIndex + 1 > 15) break
        moveAnimation(document.getElementById('num' + autoMoveData[zeroIndex + 1]), 3)
        swap(zeroIndex, zeroIndex + 1, autoMoveData)
        break
      case 3: // 0要向下
        if (zeroIndex + 4 > 15) break
        moveAnimation(document.getElementById('num' + autoMoveData[zeroIndex + 4]), 0)
        swap(zeroIndex, zeroIndex + 4, autoMoveData)
        break
    }

    step++
    if (step > minLength) {
      path = []
      clearInterval(timer)
      minLength = 0
      isMin = false
    }
  }, 100)
}
</script>

<template>
  <div class="root">
    <div style="width: 600px; float: left">
      <div style="">
        <div class="game-box">
          <div class="number-block" v-for="item in data" :key="item" :id="'num' + item" @click="move(item)">
            <div style="display: flex; align-items: center; justify-content: center; height: 100%">
              <p style="font-size: 48px; color: #ffffff; user-select: none">{{ item }}</p>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 640px">
        <button @click="restore">复原</button>
        <button @click="shuffle" style="margin-left: 48px">随机</button>
        <button @click="reset" style="margin-left: 48px">重置</button>
      </div>
    </div>

    <div style="width: 448px; float: left; padding: 24px; margin-left: 24px; ">
      <p style="font-size: 24px; color: white; margin-top: 0">详细步骤</p>

      <div id="step-board">
        <StepBoard v-for="(i, idx) in showStepDataList" :key="i" id="example" :list="i" :index="idx + 1"/>
      </div>
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
  min-width: 1200px;
  display: flex;
  justify-content: center;
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
  transition: transform 0.3s;
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
  transition: all 0.2s;
}

button:hover {
  box-shadow: 0 0 10px #ffffff;
}

button:active {
  background: rgba(255, 255, 255, 0.4);
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
