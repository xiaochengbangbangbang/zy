<template>
    <div class="coverpanel">
<!--        <my-dialog :title="title1" ref="dialog" ></my-dialog>-->
        <h2>{{ title }}</h2>
        <my-echarts :ref="mychart" :options="option"></my-echarts>
        <div class="panelfooter"></div>
    </div>
</template>

<script>
import {getSuccess} from "@/api/api";
import * as echarts from "echarts";
// import MyDialog from "@/utils/DialogUtil.vue";

export default {
    // components: {MyDialog},
    data() {
        return {
            option: {},
            timer: null,
            title1: 'xdr_migu_queue通道成功率低于60%',
            // content: 'xdr_migu_queue通道成功率低于60%',
            // cancelText: '取消',
            // okText: '确定'
        };
    },
    props: {
        mychart: String,
        // option: Object,
        title: String,
    },
    methods: {
        showDialog() {
            this.$refs.dialog.visible = true
        },
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
                60000
            );
        },
        getData() {
            getSuccess("xdr_migu_queue").then(res => {
                this.init(res.data.dateList, res.data.numList,res.data.smsList),
                this.switper()
                // let numList = res.data.numList;
                // for (let i = 0; i < numList.length; i++) {
                //     console.log(numList[i] < 60)
                //     if(numList[i] < 60){
                //         this.showDialog()
                //     }
                // }
                // let smsList = res.data.smsList;
                // for (let i = 0; i < smsList.length; i++) {
                //     console.log(smsList[i] < 60)
                //     if(smsList[i] < 60){
                //         this.showDialog()
                //     }
                // }
            });
        },
        init(xData, xLable,smsList) {
            this.option = {
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    top: "3%",
                    data: ["闪信", "短信"],
                    textStyle: {
                        color: "rgba(255,255,255,.5)",
                        fontSize: "12",
                    },
                },

                grid: {
                    left: "10",
                    top: "50",
                    right: "15",
                    bottom: "10",
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: "category",
                        boundaryGap: false,
                        // x轴更换数据
                        data: xData,
                        // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
                        axisLabel: {
                            textStyle: {
                                color: "rgba(255,255,255,.6)",
                                fontSize: 12,
                            },
                        },
                        // x轴线的颜色为   rgba(255,255,255,.2)
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.2)",
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        axisTick: {show: false},
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.1)",
                            },
                        },
                        axisLabel: {
                            textStyle: {
                                color: "rgba(255,255,255,.6)",
                                fontSize: 12,
                            },
                        },
                        // 修改分割线的颜色
                        splitLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.1)",
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: "闪信",
                        type: "line",
                        smooth: true,
                        // 单独修改当前线条的样式
                        lineStyle: {
                            color: "#F8B448",
                            width: "2",
                        },
                        // 填充颜色设置
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: "#F8B448", // 渐变色的起始颜色
                                    },
                                    {
                                        offset: 0.8,
                                        color: "rgba(1, 132, 213, 0.1)", // 渐变线的结束颜色
                                    },
                                ],
                                false
                            ),
                            shadowColor: "rgba(0, 0, 0, 0.1)",
                        },
                        // 设置拐点
                        symbol: "circle",
                        // 拐点大小
                        symbolSize: 8,
                        // 开始不显示拐点， 鼠标经过显示
                        showSymbol: true,
                        // 设置拐点颜色以及边框
                        itemStyle: {
                            color: "#F8B448",
                            borderColor: "rgba(221, 220, 107, .1)",
                            borderWidth: 12,
                        },
                        data: xLable,
                        label: {
                            show: true,
                            formatter: function (data) {
                                return data.value + '%';
                            }
                        }
                    },
                    {
                        name: "短信",
                        type: "line",
                        smooth: true,
                        lineStyle: {
                            normal: {
                                color: "rgba(246,135,2,0.5)",
                                width: 2,
                            },
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgba(246,135,2,0.5)",
                                        },
                                        {
                                            offset: 0.8,
                                            color: "rgba(0, 216, 135, 0.1)",
                                        },
                                    ],
                                    false
                                ),
                                shadowColor: "rgba(0, 0, 0, 0.1)",
                            },
                        },
                        // 设置拐点 小圆点
                        symbol: "circle",
                        // 拐点大小
                        symbolSize: 5,
                        // 设置拐点颜色以及边框
                        itemStyle: {
                            color: "rgba(246,135,2,0.5)",
                            borderColor: "rgba(221, 220, 107, .1)",
                            borderWidth: 12,
                        },
                        label: {
                            show: true,
                            formatter: function (data) {
                                return data.value + '%';
                            }
                        },
                        // 开始不显示拐点， 鼠标经过显示
                        showSymbol: true,
                        data: smsList,
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
    padding: 0.5rem 0.1875rem 0rem 0.1875rem;
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