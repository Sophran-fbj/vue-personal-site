<template>
    <div class="siteaside-container">
        <Avatar url="http://mdrs.yuanjin.tech/img/20201130153821.png" />
        <h1 class="title">Sophran的小窝</h1>
        <Menu />
        <div class="contact-container">
            <Contact />
        </div>
        <p class="footer">Clouds_Drift_Away</p>
    </div>
</template>

<script>
import Avatar from '@/components/Avatar';
import Menu from './Menu';
import Contact from './Contact';
export default {
    components: {
        Menu,
        Contact,
        Avatar,
    }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';

.siteaside-container {
    height: 100%;
    width: 100%;
    background-color: @dark;
    padding: 20px 0;
    overflow-x: hidden;
    overflow-y: auto;

    .footer {
        text-align: center;
        font-size: 12px;
    }

    .title {
        font-size: 1.2em;
        color: #fff;
        text-align: center;
    }

    .contact-container {
        margin: 50px 0;
    }
}
</style>