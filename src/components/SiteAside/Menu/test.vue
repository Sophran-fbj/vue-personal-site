<template>
    <div class="test-container">
        <Menu />
    </div>
</template>

<script>
import Menu from './';
export default {
    components: {
        Menu
    }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
@import '~@/styles/global.less';
.test-container {
    padding-top: 200px;
    width: 250px;
    height: 100vh;
    border: 2px solid blue;
    background-color: @dark;
}
</style>