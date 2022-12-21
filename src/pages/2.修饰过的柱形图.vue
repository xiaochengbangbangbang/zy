<template>
  <div id="app">
    <!-- hello everyone -->
    <Panel mychart="c1" :option="option"></Panel>
  </div>
</template>

<script>
import Panel from "./components/Panel.vue";
export default {
  name: "app",
  components: { Panel },
  data() {
    return {
      option: {
        color: ["#2f89cf"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "0%",
          top: "10px",
          right: "0%",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: [
          {
            // 设置x轴标签文字样式
            // x轴的文字颜色和大小
            axisLabel: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12",
            },
            //  x轴样式不显示
            axisLine: {
              show: false,
              // 如果想要设置单独的线条样式
              //   lineStyle: {
              //     color: "rgba(255,255,255,.1)",
              //     width: 1,
              //     type: "solid",
              //   },
            },
            type: "category",
            data: [
              "旅游行业",
              "教育培训",
              "游戏行业",
              "医疗行业",
              "电商行业",
              "社交行业",
              "金融行业",
            ],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            // y 轴文字标签样式
            axisLabel: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12",
            },
            // y轴线条样式
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
                // width: 1,
                // type: "solid"
              },
            },
            // y 轴分隔线样式
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            // 修改柱子宽度
            barWidth: "35%",
            data: [200, 300, 300, 900, 1500, 1200, 600],
            itemStyle: {
              // 修改柱子圆角
              barBorderRadius: 5,
            },
          },
        ],
      },
    };
  },
  methods: {},
};
</script>

<style scoped>
#app {
  width: 6.25rem;
  height: 3.875rem;
  background-color: #ddd;
}
</style>
