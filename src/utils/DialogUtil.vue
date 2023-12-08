<template>
<!--    <div id="log" :class="{active: isActive}">-->
        <el-alert
            :title=title
            type="error"
            center
            show-icon>
        </el-alert>
<!--    </div>-->
</template>

<script>
export default {
    name: 'MyDialog',
    props: {
        title: String,
        // content: String,
        // cancelText: {
        //     type: String,
        //     default: '取消'
        // },
        // okText: {
        //     type: String,
        //     default: '确定'
        // }
    },
    data() {
        return {
            visible: true,
            isActive:true
        }
    },
    methods: {
    }
}
</script>
<style>
.active{
    background-color: #fff;
    width: 20vw;
    height: 20vh;
    position: absolute;
    top: 15%;
    left: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}


</style>

