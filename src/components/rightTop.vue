<template>
    <div class="coverpanel">
        <h2>{{ title }}</h2>
        <!--        <br/>-->
        <!--        <p>通道名称&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;成功率&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发送总数</p>-->
        <my-echarts :ref="mychart" :options="option"></my-echarts>
        <div class="panelfooter"></div>
    </div>
</template>

<script>
import {getTableData} from "@/api/api";

export default {
    data() {
        return {
            option: {},
            timer: null,
        };
    },
    props: {
        mychart: String,
        // option: Object,
        title: String,
    },
    methods: {
        clearData() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        // 轮询
        switper() {
            if (this.timer) {
                return;
            }
            let looper = () => {
                this.getData();
            };
            this.timer = setInterval(
                looper,
                300000
            );
        },
        getData() {
            getTableData("channel_name").then(res => {
                this.init(res.times, res.alls, res.percents)
                this.switper()
            })
        },
        init(times, alls, pencents) {
            this.option = {
                grid: {
                    top: "10%",
                    left: "25%",
                    bottom: "10%",
                    right: "22%"
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
                        // data: ["HTML5", "CSS3", "javascript", "VUE", "NODE"],
                        data: times,
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
                        // data: [702, 350, 610, 793, 664],
                        data: alls,
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
                        // data: [70, 34, 60, 78, 69],
                        data: pencents,
                        yAxisIndex: 0,
                        // 修改第一组柱子的圆角
                        itemStyle: {
                            barBorderRadius: 20,
                            // 此时的color 可以修改柱子的颜色
                            color: function (params) {
                                // params 传进来的是柱子对象
                                // console.log(params);
                                // dataIndex 是当前柱子的索引号
                                return [
                                    "#1089E7",
                                    "#F57474",
                                    "#56D0E3",
                                    "#F8B448",
                                    "#8B78F6",
                                ][params.dataIndex];
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
                        // data: alls,
                        itemStyle: {
                            color: "none",
                            borderColor: "#00c1de",
                            borderWidth: 3,
                            barBorderRadius: 15,
                        },
                    },
                ],
            }

            this.$refs[this.mychart].setOption(this.option);
        }
    },
    mounted() {
        //console.log(this.mychart);
        // console.log(this.$refs[this.mychart].setOption);
        this.getData()
        // this.$refs[this.mychart].setOption(this.option);
    },
    beforeDestroy() {
        this.clearData();
    },
}
</script>

<style scoped>
/* 以下是存储echarts图表的容器样式 */
.coverpanel {
    position: relative;
    height: 5rem;
    background-color: rgba(255, 255, 255, 0.04);
    background: url(../../public/images/line\(1\).png) no-repeat;
    /* background-position: top center; */
    background-size: cover;
    margin-bottom: 0.1875rem;
    border: 1px solid rgba(25, 186, 139, 0.17);
    padding: 0.5rem 0.1875rem 0rem 0.5rem;
}

.coverpanel > h2 {
    /* float: top; */
    /* 将h2定位到中间 */
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    height: 0.5rem;
    line-height: 0.6rem;
    text-align: center;
    color: #fff;
    font-size: 0.3125rem;
    font-weight: 400;
}

.coverpanel::before,
.coverpanel::after,
.panelfooter::before,
.panelfooter::after {
    position: absolute;
    content: "";
    width: 0.125rem;
    height: 0.125rem;
}

.coverpanel::before {
    top: 0;
    left: 0;
    border-top: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
}

.coverpanel::after {
    top: 0;
    right: 0;
    border-top: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
}

.panelfooter {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 0.125rem;
    width: 100%;
}

.panelfooter::before {
    bottom: 0;
    left: 0;
    border-bottom: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
}

.panelfooter::after {
    bottom: 0;
    right: 0;
    border-bottom: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
}
</style>