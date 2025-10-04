<template>
    <ul class="contents-container">
        <li v-for="(item, i) in list" :key="i">
            <span :class="{ selected: item.isSelect }"
            @click="handleClick(item)"
            >{{ item.name }}</span>
            <DetailContents :list="item.children" @select="handleClick" />
        </li>
    </ul>
</template>

<script>
export default {
    name: 'DetailContents',
    props: {
        list: {
            type: Array,
            default: () => []
        },
    },
    methods: {
        handleClick(item) {
            this.$emit('select', item);
        },
    },
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.contents-container {
    list-style: none;
    padding: 0;
    .contents-container {
        margin-left: 1em;
    }
    li {
        min-height: 40px;
        line-height: 40px;
        font-size: 14px;
    }
    span {
        cursor: pointer;
    }
    .selected {
        color: @warn;
        font-weight: bold;
    }
    .articleCount {
        margin-left: 20px;
    }
}
</style>