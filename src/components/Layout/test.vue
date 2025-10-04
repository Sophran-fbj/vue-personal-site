<template>
    <div class="test-container">
        <Layout>
            <template #left>
                <div class="left">
                    <SiteAside />
                </div>
            </template>
            <template>
                <div class="main">
                </div>
            </template>
            <template #right>
                <div class="right">
                </div>
            </template>
        </Layout>
    </div>
</template>

<script>
import Layout from './';
import SiteAside from '../SiteAside';
export default {
    components: {
        Layout,
        SiteAside
    },
}
</script>

<style lang="less" scoped>
.test-container {
    width: 100%;
    height: 1000px;
    .left {
        width: 250px;
        height: 100%;
    }
    .main {
        height: 100%;
        background-color: blue;
    }
    .right {
        width: 200px;
        height: 100%;
        background-color: red;
    }
}
</style>
