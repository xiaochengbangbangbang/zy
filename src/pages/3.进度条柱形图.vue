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
        grid: {
          top: "10%",
          left: "22%",
          bottom: "10%",
          // containLabel: true
        },
        // 不显示x轴的相关信息
        xAxis: {
          show: false,
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            data: ["HTML5", "CSS3", "javascript", "VUE", "NODE"],
            // 不显示y轴的线
            axisLine: {
              show: false,
            },
            // 不显示刻度
            axisTick: {
              show: false,
            },
            // 把刻度标签里面的文字颜色设置为白色
            axisLabel: {
              color: "#fff",
            },
          },
          {
            data: [702, 350, 610, 793, 664],
            inverse: true,
            // 不显示y轴的线
            axisLine: {
              show: false,
            },
            // 不显示刻度
            axisTick: {
              show: false,
            },
            // 把刻度标签里面的文字颜色设置为白色
            axisLabel: {
              color: "#fff",
            },
          },
        ],
        series: [
          {
            name: "条",
            type: "bar",
            data: [70, 34, 60, 78, 69],
            yAxisIndex: 0,
            // 修改第一组柱子的圆角
            itemStyle: {
              barBorderRadius: 20,
              // 此时的color 可以修改柱子的颜色
              color: function (params) {
                // params 传进来的是柱子对象
                // console.log(params);
                // dataIndex 是当前柱子的索引号
                return ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"][
                  params.dataIndex
                ];
              },
            },
            // 柱子之间的距离
            barCategoryGap: 50,
            //柱子的宽度
            barWidth: 10,
            // 显示柱子内的文字
            label: {
              show: true,
              position: "inside",
              // {c} 会自动的解析为 数据  data里面的数据
              formatter: "{c}%",
            },
          },
          {
            name: "框",
            type: "bar",
            barCategoryGap: 50,
            barWidth: 15,
            yAxisIndex: 1,
            data: [100, 100, 100, 100, 100],
            itemStyle: {
              color: "none",
              borderColor: "#00c1de",
              borderWidth: 3,
              barBorderRadius: 15,
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
