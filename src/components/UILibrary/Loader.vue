<template>
  <div class="loaders" :style="{backgroundColor}">
    <div v-if="type === 'points'" class="three col">
      <div class="loader" id="loader-1">
        <span :style="{width: miniPoints ? '10px' : '', height: miniPoints ? '10px' : ''}" :class="color" v-for="(item, key) in 3" :key="key"></span>
      </div>
    </div>

    <div v-if="type === 'circle'" class="three col">
      <div class="loader-2" id="loader-2"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      validator: (value) => {
        return ['circle', 'points'].indexOf(value) !== -1
      },
      default: 'circle'
    },
    color: {
      type: String,
      validator: (value) => {
        return ['orange', 'white', 'blue'].indexOf(value) !== -1
      },
      default: 'orange'
    },
    backgroundColor: {
      type: [String, Boolean],
      default: false
    },
    miniPoints: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.loaders {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.three { width: 100px; }

.col {
	display: block;
	float:left;
	margin: 1% 0 1% 1.6%;
}

.loader {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  position: relative;
  margin: 0 auto;
}

/* LOADER 1 */

#loader-1 {
  display: flex;
  align-items: center;
}

#loader-1 span {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  margin: 35px 5px;
  opacity: 0;
}

.white {
  background-color: white;
}

.orange {
  background-color: #faab1a;
}

.blue {
  background-color: rgb(199, 219, 233);
}

#loader-1 span:nth-child(1) {
  animation: opacitychange 1s ease-in-out infinite;
}

#loader-1 span:nth-child(2) {
  animation: opacitychange 1s ease-in-out 0.33s infinite;
}

#loader-1 span:nth-child(3) {
  animation: opacitychange 1s ease-in-out 0.66s infinite;
}

@keyframes opacitychange{
  0%, 100%{
    opacity: 0;
  }

  60%{
    opacity: 1;
  }
}

/* LOADER 2 */

.loader-2 {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  position: relative;
  margin: 0 auto;
}

#loader-2:before, #loader-2:after {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: 5px solid transparent;
  border-top-color: #faab1a;
}

#loader-2:before {
  z-index: 100;
  animation: spin 1s infinite;
}

#loader-2:after {
  border: 5px solid white;
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>