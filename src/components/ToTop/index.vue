<template>
    <div v-if="show" class="totop-container" @click="handleClick">
        Top
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        }
    },
    created() {
        this.$bus.$on('mainScroll', this.handleScroll);
    },
    methods: {
        handleScroll(dom) {
            if(!dom) {
                this.show = false;
                return;
            }
            this.show = dom.scrollTop > 2000;
        },
        handleClick() {
            this.$bus.$emit('setMainScroll');
        }
    },
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.totop-container {
    position: fixed;
    right: 40px;
    bottom: 40px;
    width: 50px;
    height: 50px;
    background-color: @primary;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    text-align: center;
    line-height: 50px;
}
</style>