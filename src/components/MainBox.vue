<template>
    <div class="mainbox">
        <!-- 左边的图形展示 -->
        <div class="column">
            <!--            <Panel-->
            <!--                mychart="echart1"-->
            <!--                :option="chartsList[0]"-->
            <!--                title="柱形图 - 就业形式"-->
            <!--            ></Panel>-->
            <left-top mychart="echart1" title="xdr_migu_queue通道质量"></left-top>
            <!--            <Panel-->
            <!--                mychart="echart2"-->
            <!--                :option="chartsList[2]"-->
            <!--                title="曲线图-人员变化"-->
            <!--            ></Panel>-->

            <!--            <Panel-->
            <!--                mychart="echart3"-->
            <!--                :option="chartsList[4]"-->
            <!--                title="南丁格尔图-地区分布"-->
            <!--            ></Panel>-->
            <right-top mychart="echart4" title="各通道质量"></right-top>
            <right-center mychart="echart11" title="xdr_msp_free_queue通道质量"></right-center>
        </div>

        <!-- 中间的图形展示 -->
        <div class="column">
            <!-- 首页数字展示 -->
            <!--      <div class="mainboxtop">-->
            <!--        <div class="tophd">-->
            <!--          <ul>-->
            <!--            <li>999999999+</li>-->
            <!--            <li>200+</li>-->
            <!--          </ul>-->
            <!--        </div>-->
            <!--        <div class="topbd">-->
            <!--          <ul>-->
            <!--            <li>前端需求人数</li>-->
            <!--            <li>市场供应人数</li>-->
            <!--          </ul>-->
            <!--        </div>-->
            <!--      </div>-->
            <div class="mainboxtop">
                <!--                <Panel-->
                <!--                    mychart="echart4"-->
                <!--                    :option="chartsList[1]"-->
                <!--                    title="技能占比-进度条"-->
                <!--                ></Panel>-->
                <center-top mychart="echart9" title="运营商成功率"></center-top>
            </div>
            <!-- 首页地图展示 -->
            <div class="mainboxbody">
                <div ref="chinamap" class="chinamap">
                    <!--                <div  class="chinamap">-->
                    <!--                    <map></map>-->
                </div>
                <!-- 背景地球 -->
                <div class="map1"></div>
                <!-- 正旋转 -->
                <div class="map2"></div>
                <!-- 逆旋转 -->
                <div class="map3"></div>
            </div>
        </div>
        <!-- 右边的图形展示 -->
        <div class="columnRight">
            <!--            <Panel-->
            <!--                mychart="echart4"-->
            <!--                :option="chartsList[1]"-->
            <!--                title="技能占比-进度条"-->
            <!--            ></Panel>-->
            <right-bottom mychart="echart6" title="xdr_smgp_proxy_queue通道质量"></right-bottom>
            <left-bottom mychart="echart6" title="xdr_msp_queue通道质量"></left-bottom>
            <left-center mychart="echart2" title="xdr_msp_call_in_queue通道质量"></left-center>
            <!--            <Panel-->
            <!--                mychart="echart5"-->
            <!--                :option="chartsList[3]"-->
            <!--                title="曲线图-播放量"-->
            <!--            ></Panel>-->
            <!--            <right-center title="全省通道质量"></right-center>-->
            <!--            <Panel mychart="echart6" :option="chartsList[5]" title="饼图"></Panel>-->
        </div>
    </div>
</template>

<script>
// import MyEcharts from "./MyEcharts.vue";
// import "../../node_modules/echarts/dist/china.js";
import "../../node_modules/echarts/map/js/china.js";
// import "../config/chinamap.js";
// import "../config/china.js";



import * as echarts from "echarts";
// import Panel from "./Panel.vue";
// import {getSuccess} from "@/api/api";
import leftCenter from "@/components/leftCenter.vue";
import leftTop from "@/components/leftTop.vue";
import leftBottom from "@/components/leftBottom.vue";
import rightBottom from "@/components/rightBottom.vue";
import rightTop from "@/components/rightTop.vue";
import centerTop from "@/components/centerTop.vue";
import rightCenter from "@/components/rightCenter.vue";
import {getMapData} from "@/api/api";

// var color = ["#a6c84c", "#ffa022", "#46bee9"]; //航线的颜色

export default {
    components: {leftCenter, leftTop, leftBottom, rightBottom, rightTop, centerTop, rightCenter},
    name: "MainBox",
    data() {
        return {
            chartsList: [],
            mycharts: null,
            chartFun: null,
            resdata: [],
            timer: null,
            option: {
                tooltip: {
                    trigger: "item",
                    formatter: function (params) {
                        let context = `
               <div>
                   <p><b style="font-size:15px;">${params.data.name}</b></p>
                   <p class="tooltip_style"><span class="tooltip_left">电信&nbsp;</span><span class="tooltip_right">${params.data.value2}&nbsp;&nbsp;${params.data.percentage2}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">联通&nbsp;</span><span class="tooltip_right">${params.data.value}&nbsp;&nbsp;${params.data.percentage}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">移动&nbsp;</span><span class="tooltip_right">${params.data.value3}&nbsp;&nbsp;${params.data.percentage3}</span></p>
               </div>
            `
                        return context;
                    },
                },
                legend: {
                    orient: "vertical",
                    top: "bottom",
                    left: "right",
                    data: ["西安 Top3", "西宁 Top3", "银川 Top3"],
                    textStyle: {
                        color: "#fff",
                    },
                    selectedMode: "multiple",
                },
                geo: {
                    map: "china",
                    label: {
                        emphasis: {
                            show: true,
                            color: "#fff",
                        },
                    },
                    // 把中国地图放大了1.2倍
                    zoom: 1.2,
                    roam: true,
                    itemStyle: {
                        normal: {
                            // 地图省份的背景颜色
                            areaColor: "rgba(20, 41, 87,0.6)",
                            borderColor: "#195BB9",
                            borderWidth: 1,
                        },
                        emphasis: {
                            areaColor: "#2B91B7",
                        },
                    },
                },
                // series: series,
                series: [
                    {
                        name: "各运营商成功率",
                        type: "map",
                        geoIndex: 0,
                        label: {
                            show: true,
                        },
                        data: []
                    }
                ],
                dataList: []
            }
        }
    },
        methods: {
            getData() {
                getMapData().then(res => {
                    this.resdata = res
                    this.setEchartOption()
                    this.init()
                })
            }
            ,
            init()
            {
                if (this.mycharts) {
                    this.mycharts.dispose();
                }
                this.mycharts = echarts.init(this.$refs.chinamap);
                this.mycharts.setOption(this.option);
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
            }
        ,
            //修改echart配制
            setEchartOption()
            {
                this.option.series[0].data = this.resdata;
            },
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
            clearData() {
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            },
        }
    ,
        mounted()
        {
            this.getData()
            this.init();
        }
    ,
        beforeDestroy()
        {
            // 移除窗口改变监听
            window.removeEventListener("resize", this.chartFun);
            this.clearData()
        }
    ,
    };
</script>

<style scoped>
.mainbox {
    height: 100vh;
    display: flex;
    /*background-color: pink; */
    padding: 0.125rem 0.125rem 0;
}

.column {
    /* height: 10rem; */
    /* background-color: red; */
    flex: 3;
}

.columnRight {
    /* height: 10rem; */
    /* background-color: red; */
    flex: 3;
}

.mainbox .column:nth-child(2) {
    /* background-color: blue; */
    padding: 0 0.125rem 0.1875rem;
    /* background-color: blue; */
    flex: 5;
}

/* 以下是存放中国地图的容器样式 */
.mainboxtop {
    background-color: rgba(101, 132, 226, 0.1);
    /*padding: 0.1875rem;*/
    padding: 0rem;
}

.tophd {
    position: relative;
    border: 1px solid rgba(25, 186, 139, 0.17);
}

@font-face {
    font-family: electronicFont;
    src: url(../../public/font/DS-DIGIT.TTF);
}

.tophd > ul,
.topbd > ul {
    display: flex;
}

.tophd > ul > li {
    flex: 1;
    display: inline-block;
    height: 1rem;
    color: #ffeb7b;
    font-size: 0.875rem;
    font-family: electronicFont;
}

.tophd > ul::after {
    position: absolute;
    right: 50%;
    width: 0.0125rem;
    height: 50%;
    top: 25%;
    background-color: rgba(255, 255, 255, 0.2);
    content: "";
}

.tophd::before,
.tophd::after {
    position: absolute;
    content: "";
    width: 0.375rem;
    height: 0.125rem;
}

.tophd::before {
    top: 0;
    left: 0;
    border-top: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
}

.tophd::after {
    bottom: 0;
    right: 0;
    border-bottom: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
}

.topbd > ul > li {
    flex: 1;
    height: 0.5rem;
    line-height: 0.5rem;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.225rem;
    padding-top: 0.125rem;
}

.mainboxbody {
    position: relative;
    width: 100%;
    /*height: 10.125rem;*/
    height: 10.125rem;
    /* background-color: pink; */
}

.chinamap {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    height: 10.125rem;
    width: 100%;
}
.chinamap .tooltip_style{
    line-height:1.7;
    overflow: hidden;
}
.chinamap .tooltip_left{
    float: left;
}
.chinamap .tooltip_right{
    float: right;
}

.map1,
.map2,
.map3 {
    position: absolute;
    top: 50%;
    left: 50%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    transform: translate(-50%, -50%);
    width: 6.475rem;
    height: 6.475rem;
    opacity: 0.3;
}

.map1 {
    background-image: url(../../public/images/map.png);

    animation: rotate 15s linear infinite;
}

.map2 {
    width: 8.0375rem;
    height: 8.0375rem;
    background-image: url(../../public/images/lbx.png);

    opacity: 0.8;
    animation: rotate 5s linear infinite;
    z-index: 2;
}

.map3 {
    width: 7.075rem;
    height: 7.075rem;
    background-image: url(../../public/images/jt.png);

    animation: rotate1 10s linear infinite;
}

@keyframes rotate {
    from {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

@keyframes rotate1 {
    from {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
        transform: translate(-50%, -50%) rotate(-360deg);
    }
}
</style>