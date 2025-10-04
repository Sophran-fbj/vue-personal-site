<template>
    <i 
    class="iconfont icon-container" 
    :class="classMap[name]"></i>
</template>

<script>
const classMap = {
    home: "iconzhuye",
    success: "iconzhengque",
    error: "iconcuowu",
    close: "iconguanbi",
    warn: "iconjinggao",
    info: "iconxinxi",
    blog: "iconblog",
    code: "iconcode",
    about: "iconset_about_hov",
    weixin: "iconweixin",
    mail: "iconemail",
    github: "icongithub",
    qq: "iconsign_qq",
    arrowUp: "iconiconfonticonfonti2copy",
    arrowDown: "iconiconfonticonfonti2",
    empty: "iconempty",
    chat: "iconliuyan",
};
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            classMap
        }
    },
}
</script>


<style scoped>
@import '//at.alicdn.com/t/font_2164449_nalfgtq7il.css';

</style>
