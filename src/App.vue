<script setup>
import StepBoard from "@/components/StepBoard"
import {onMounted, ref} from "vue";

// 目标
const goal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]

// 当前棋盘的数据
let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]

// 求解步骤，注意是数字块0的移动方向
let path = []

// 用于自动复原的数组
let autoMoveData = []

// 用于展示详细步骤的数组
const showStepDataList = ref([])

let minLength = 0, maxLength
let isMin = false

// 移动方向
const Directions = {
  UP: -4,
  LEFT: -1,
  RIGHT: 1,
  DOWN: 4,
}

/**
 * 交换指定列表中的两个元素
 * @param i 用于交换的第一个元素下标
 * @param j 用于交换的第二个元素下标
 * @param list 需要交换的列表
 */
const swap = (i, j, list) => {
  let temp = list[i]
  list[i] = list[j]
  list[j] = temp
}

/**
 * 触发数字块移动的动画
 * @param element 用于移动的数字块元素
 * @param direction 非0数字块的移动方向
 */
const moveAnimation = (element, direction) => {
  let zeroElement = document.getElementById('num0')

  switch (direction) {
    case Directions.UP: // 向上
      element.style.top = (element.offsetTop - 120 - 48) + 'px'
      zeroElement.style.top = (zeroElement.offsetTop + 120) + 'px'
      break
    case Directions.LEFT: // 向左
      element.style.left = (element.offsetLeft - 120 - 48) + 'px'
      zeroElement.style.left = (zeroElement.offsetLeft + 120) + 'px'
      break
    case Directions.RIGHT: // 向右
      element.style.left = (element.offsetLeft + 120) + 'px'
      zeroElement.style.left = (zeroElement.offsetLeft - 120 - 48) + 'px'
      break
    case Directions.DOWN: // 向下
      element.style.top = (element.offsetTop + 120) + 'px'
      zeroElement.style.top = (zeroElement.offsetTop - 120 - 48) + 'px'
      break
  }
}

/**
 * 数字块移动
 * @param id 需要移动的数字块的id
 */
const move = (id) => {
  // 数字块0不能移动
  if (id === 0) return

  let zeroIndex = data.findIndex(i => i === 0)
  let index = data.findIndex(i => i === id)

  let element = document.getElementById('num' + id)

  if (zeroIndex === index + Directions.UP) {
    moveAnimation(element, Directions.UP)
    swap(zeroIndex, index, data)
  } else if (zeroIndex === index + Directions.LEFT && index % 4 !== 0) {
    moveAnimation(element, Directions.LEFT)
    swap(zeroIndex, index, data)
  } else if (zeroIndex === index + Directions.RIGHT && index % 4 !== 3) {
    moveAnimation(element, Directions.RIGHT)
    swap(zeroIndex, index, data)
  } else if (zeroIndex === index + Directions.DOWN) {
    moveAnimation(element, Directions.DOWN)
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

// 随机打乱
const shuffle = () => {
  let time = data.length
  while (time > 0) {
    swap(time - 1, Math.floor(Math.random() * time), data)
    time--
  }

  data.forEach((i, idx) => {
    let element = document.getElementById('num' + i)

    if (idx % 4 === 0) element.style.left = '0'
    else if (idx % 4 === 1) element.style.left = '144px'
    else if (idx % 4 === 2) element.style.left = '288px'
    else if (idx % 4 === 3) element.style.left = '432px'

    if (idx <= 3) element.style.top = '0'
    else if (idx <= 7) element.style.top = '144px'
    else if (idx <= 11) element.style.top = '288px'
    else if (idx <= 15) element.style.top = '432px'
  })
}

// 重置
const reset = () => {
  data = goal.concat()
  showStepDataList.value = []

  for (let i = 0; i <= 15; ++i) {
    let element = document.getElementById('num' + i)

    if (i % 4 === 1) element.style.left = '0'
    else if (i % 4 === 2) element.style.left = '144px'
    else if (i % 4 === 3) element.style.left = '288px'
    else if (i % 4 === 0) element.style.left = '432px'

    if (i === 0) element.style.top = '432px'
    else if (i <= 4) element.style.top = '0'
    else if (i <= 8) element.style.top = '144px'
    else if (i <= 12) element.style.top = '288px'
    else if (i <= 15) element.style.top = '432px'
  }
}

// 计算数组的逆序数，用于判断当前状态是否有解
// 返回值为 1 则有解，为 0 则无解
const hasSolution = (list) => {
  const zeroIndex = data.findIndex(i => i === 0)
  let inversion = 0

  for (let i = 0; i < 16; ++i) {
    for (let j = i + 1; j < 16; ++j) {
      if (list[i] > list[j]) inversion++
    }
  }

  inversion += Math.abs(zeroIndex / 4 - 3) + Math.abs(zeroIndex % 4 - 3)
  return inversion % 2
}

// 估价函数（计算当前状态的曼哈顿距离）
const evaluate = () => {
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

/**
 * IDA*
 * @param zeroIndex 0数字块在数组中的索引
 * @param length 移动长度
 * @param lastMove 0数字块上一次的移动方向
 */
const IDA_Star = (zeroIndex, length, lastMove) => {
  if (isMin) return
  let cost = evaluate()

  if (length === maxLength) {
    if (cost === 0) {
      isMin = true
      minLength = length
    }
    return
  } else if (length < maxLength) {
    if (cost === 0) {
      isMin = true
      minLength = length
      return
    }
  }

  for (let i in Directions) {
    if (Directions[i] + lastMove === 0 && length > 0) continue

    if (zeroIndex + Directions[i] >= 0
        && zeroIndex + Directions[i] <= 15
        && !(zeroIndex % 4 === 0 && Directions[i] === Directions.LEFT)
        && !(zeroIndex % 4 === 3 && Directions[i] === Directions.RIGHT)) {
      swap(zeroIndex, zeroIndex + Directions[i], data)

      let newCost = evaluate();
      if (newCost + length <= maxLength && !isMin) {
        path[length] = Directions[i]
        IDA_Star(zeroIndex + Directions[i], length + 1, Directions[i])

        if (isMin) return
      }

      swap(zeroIndex, zeroIndex + Directions[i], data)
    }
  }
}

// 复原
const restore = () => {
  if (checkWin()) return

  if (hasSolution(data)) {
    autoMoveData = data.concat()

    maxLength = evaluate()

    while (!isMin && minLength <= 50) {
      IDA_Star(data.findIndex(i => i === 0), 0, 0)
      if (!isMin) maxLength++
    }

    if (isMin) {
      autoMove()
    }
  } else if (!hasSolution(data) || !isMin)
    console.log('no answer')
}

// 当计算完结果后触发的自动还原动画
const autoMove = () => {
  showStepDataList.value = []
  let step = 0
  let timer = setInterval(() => {
    let zeroIndex = autoMoveData.findIndex(i => i === 0)
    showStepDataList.value.push(autoMoveData.concat())

    if (zeroIndex + path[step] >= 0 && zeroIndex + path[step] <= 15) {
      moveAnimation(document.getElementById('num' + autoMoveData[zeroIndex + path[step]]), -path[step])
      swap(zeroIndex, zeroIndex + path[step], autoMoveData)
    }

    step++
    if (step > minLength) {
      clearInterval(timer)
      path = []
      minLength = 0
      isMin = false
    }
  }, 100)
}

onMounted(() => {
  data.forEach((i, idx) => {
    let elem = document.getElementById('num' + i)

    switch (Math.floor(idx / 4)) {
      case 0:
        elem.style.top = '0'
        break
      case 1:
        elem.style.top = '144px'
        break
      case 2:
        elem.style.top = '288px'
        break
      case 3:
        elem.style.top = '432px'
        break
    }

    switch (idx % 4) {
      case 0:
        elem.style.left = '0'
        break
      case 1:
        elem.style.left = '144px'
        break
      case 2:
        elem.style.left = '288px'
        break
      case 3:
        elem.style.left = '432px'
        break
    }
  })
})
</script>

<template>
  <div class="root">
    <div style="width: 600px; float: left">
      <div class="game-box">
        <div class="number-block" v-for="item in data" :key="item" :id="'num' + item" @click="move(item)">
          <div style="display: flex; align-items: center; justify-content: center; height: 100%">
            <p style="font-size: 48px; color: #ffffff; user-select: none">{{ item }}</p>
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

      <StepBoard v-for="(i, idx) in showStepDataList" :key="i" :list="i" :index="idx"/>
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

#num0 {
  z-index: -1;
  opacity: 0;
  cursor: default;
}
</style>
