<template>
  <div :id="mychartid" class="mycharts"></div>
</template>

<script>
import * as echarts from "echarts";
import { nanoid } from "nanoid";
export default {
  name: "MyEcharts",
  beforeDestroy() {
    // 移除窗口改变监听
    window.removeEventListener("resize", this.chartFun);
  },
  data() {
    return {
      chartFun: null,
      mycharts: null,
      mychartid: nanoid(),
    };
  },
  methods: {
    // setOption(option) {},
    setOption(option) {
      if (this.mycharts) {
        this.mycharts.dispose();
      }
      this.mycharts = echarts.init(document.getElementById(this.mychartid));
      this.mycharts.setOption(option);
      let chart = this.mycharts;
      // 节流函数
      function throttle(func, wait, options) {
        let time, context, args;
        let previous = 0;
        if (!options) options = {};
        let later = function () {
          previous = options.leading === false ? 0 : new Date().getTime();
          time = null;
          func.apply(context, args);
          if (!time) context = args = null;
        };

        let throttled = function () {
          let now = new Date().getTime();
          if (!previous && options.leading === false) previous = now;
          let remaining = wait - (now - previous);
          context = this;
          args = arguments;
          if (remaining <= 0 || remaining > wait) {
            if (time) {
              clearTimeout(time);
              time = null;
            }
            previous = now;
            func.apply(context, args);
            if (!time) context = args = null;
          } else if (!time && options.trailing !== false) {
            time = setTimeout(later, remaining);
          }
        };
        return throttled;
      }
      this.chartFun = throttle(function () {
        chart.resize();
      }, 10);
      window.addEventListener("resize", this.chartFun);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 
    虽然盒子的id不同，但是盒子有共同的特征
    id选择器不行就统一指定类选择器，通过类选择器指定盒子的宽高
*/
.mycharts {
  width: 95%;
  height: 95%;
}
</style>
