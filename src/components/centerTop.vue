<template>
    <div class="coverpanel">
        <h2>{{ title }}</h2>
        <my-echarts :ref="mychart" :options="option"></my-echarts>
        <div class="panelfooter"></div>
    </div>
</template>

<script>
import {getIspData} from "@/api/api";

var placeHolderStyle = {
    normal: {
        color: '#e9eef4'
    },
    emphasis: {
        color: '#e9eef4'
    }
}
export default {
    data() {
        return {
            //圆环数据
            looppieData: [{
                name:"",
                space: 0,
                value: 0,
                all:0,
            }],
            //圆环中心位置
            positionArr: [
                ["15%", "25%"],
                ["50%", "25%"],
                ["85%", "25%"],
                ["15%", "75%"],
                ["50%", "75%"],
                ["85%", "75%"]
            ],
            // 圆环颜色
            colorArr: [
                "#e86452", "#5ad8a6", "#5b8ff9", "#5ad8a6",
                "#e86452", "#5ad8a6", "#5b8ff9", "#5ad8a6",
            ],
            // 环状图
            option: {
                tooltip: {
                    show: true,
                    trigger: "item", //鼠标划过时饼状图上显示的数据
                    formatter:(item)=>{
                        let txtCon;
                        if(item.dataIndex ==0 ){
                           txtCon  = `${item.data.success}条`;
                        }else {
                            txtCon  = `${item.data.fail}条`;
                        }
                        return txtCon
                    }
                },
            },
            timer: null,
        };
    },
    props: {
        mychart: String,
        // option: Object,
        title: String,
    },
    mounted() {
        this.getData();
        this.getEchartData();
    },
    methods: {
        //环形图
        getEchartData() {
            let seriesArr = this.looppieData.map((item, index) => {
                return {
                    name: item.name,
                    type: "pie",
                    // radius: [50, 40], // 圆环饼图内外直径的大小
                    radius: ["30%", "47%"],
                    center: this.positionArr[index], // 饼图的位置——正中心
                    roundCap: true,
                    label: {
                        show: true, // 显示饼图每块区域的名称
                        position: "center", // 标签文字显示在圆环中间
                        color: "#FFF", // 每个饼图的标签文字颜色
                    },
                    labelLine: {
                        show: false, // 隐藏名字和图之间默认的一条线
                    },
                    textStyle: {
                        color: "rgba(255,255,255,.5)",
                        fontSize: "12",
                    },
                    data: [
                        {
                            value: item.value,
                            name: item.value + "%" + "\n\n" + item.name, //lable显示的文字内容
                            success: item.success,
                            itemStyle: {
                                color: this.colorArr[index],//该区域对应渐变色
                            },
                        },
                        {
                            // name: "空白",
                            name: item.value + "%" + "\n\n" + item.name, //lable显示的文字内容
                            value: item.space,
                            fail: item.fail,
                            itemStyle: placeHolderStyle,
                        },
                    ],
                };
            })
            this.option.series = seriesArr
            this.$refs[this.mychart].setOption(this.option);
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
            getIspData().then(res => {
                this.looppieData = res;
                this.getEchartData()
            }),
                this.switper()
        },
    },
    beforeDestroy() {
        this.clearData();
    },
};
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