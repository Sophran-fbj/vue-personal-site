<template>
    <div class="empty-container">
        <Icon name="empty"></Icon>
        <p>{{ text }}</p>
    </div>
</template>

<script>
import Icon from '../Icon';
export default {
    components: {
        Icon
    },
    props: {
        text: {
            type: String,
            default: '暂无数据'
        },
        size: {
            type: Number,
            default: 150,
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@/styles/mix.less';
@import '~@/styles/var.less';

.empty-container {
    .self-center();
    text-align: center;

    .iconfont {
        font-size: 72px;
        color: @gray;
    }

    p {
        margin-top: 10px;
        font-size: 14px;
        color: @lightWords;
        font-weight: 500;
    }
}
</style>