<template>
  <div class="container">
    <div class="game-box">
      <div :class="['step-block', i === 0 ? 'step-block-zero' : '']" v-for="i in list" :key="i">
        <div style="display: flex; align-items: center; justify-content: center; height: 100%">
          <p style="font-size: 12px; color: #ffffff; user-select: none">{{ i }}</p>
        </div>
      </div>

      <div style="margin-top: 108px">
        <p style="color: #ffffff; font-size: 16px; ">{{ index !== 0 ? index : '初始' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted} from "vue";

export default {
  name: "StepBoard",
  props: {
    list: {
      type: Array,
      default: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0],
    },
    index: {
      type: Number,
      default: 0,
    }
  },
  setup(props) {
    onMounted(() => {
      for (let i = 0; i < 16; i++) {
        let elem = document.getElementsByClassName('step-block')[i + props.index * 16]

        switch (Math.floor(i / 4)) {
          case 0:
            elem.style.top = '0'
            break
          case 1:
            elem.style.top = '24px'
            break
          case 2:
            elem.style.top = '48px'
            break
          case 3:
            elem.style.top = '72px'
            break
        }

        switch (i % 4) {
          case 0:
            elem.style.left = '0'
            break
          case 1:
            elem.style.left = '24px'
            break
          case 2:
            elem.style.left = '48px'
            break
          case 3:
            elem.style.left = '72px'
            break
        }
      }
    })
  }
}
</script>

<style scoped>
.container {
  width: 100px;
  height: 120px;
  margin: 0 6px 24px;
  display: inline-block;
  float: left;

  animation: 0.3s linear 1 block-up;
}

@keyframes block-up {
  0% {
    transform: translateY(50px);
  }
  100% {
    transform: translateY(0);
  }
}

.game-box {
  width: 100px;
  height: 100px;
  min-width: 100px;
  background: transparent;
}

.step-block {
  width: 20px;
  height: 20px;
  margin: 4px;
  position: absolute;

  transition: all 0.3s ease-in-out;

  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.1);

  overflow: hidden;
}

.step-block-zero {
  opacity: 0;
}
</style>
