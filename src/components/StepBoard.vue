<template>
  <div class="container">
    <div class="game-box">
      <div :class="i !== 0 ? 'chess-block' : 'chess-block-zero'" v-for="(i, idx) in list" :key="i" :id="'chess' + (idx + 1)">
        <div style="display: flex; align-items: center; justify-content: center; height: 100%">
          <p style="font-size: 12px; color: #ffffff; user-select: none">{{ i }}</p>
        </div>
      </div>

      <div style="margin-top: 80px">
        <p style="color: #ffffff; font-size: 16px; ">{{ index }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameBoard",
  props: {
    list: {
      type: Array,
      default: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0],
    },
    index: {
      type: Number,
      default: 0,
    }
  }
}
</script>

<style scoped>
.container {
  width: 100px;
  height: 120px;
  margin: 6px;
  display: inline-block;
  float: left;

  animation-name: block-up;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-timing-function: linear;
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

.chess-block {
  width: 20px;
  height: 20px;
  margin: 4px;
  position: absolute;

  transition: all 0.3s ease-in-out;

  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.2);

  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chess-block-zero {
  width: 20px;
  height: 20px;
  margin: 4px;
  opacity: 0;
  z-index: -1;
}

#chess1,
#chess2,
#chess3,
#chess4 {
  top: 0;
}

#chess5,
#chess6,
#chess7,
#chess8 {
  top: 24px;
}

#chess9,
#chess10,
#chess11,
#chess12 {
  top: 48px;
}

#chess13,
#chess14,
#chess15,
#chess16 {
  top: 72px;
}

#chess1,
#chess5,
#chess9,
#chess13 {
  left: 0;
}

#chess2,
#chess6,
#chess10,
#chess14 {
  left: 24px;
}

#chess3,
#chess7,
#chess11,
#chess15 {
  left: 48px;
}

#chess4,
#chess8,
#chess12,
#chess16 {
  left: 72px;
}
</style>
