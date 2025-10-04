<template>
    <div v-if="totalPage > 1" class="pager-container">
        <a @click="pageChange(1)" :class="{disabled: currentPage === 1}" >首页</a>
        <a @click="pageChange(currentPage - 1)" :class="{disabled: currentPage === 1}" >上一页</a>
        <a @click="pageChange(page)" v-for="page in pages" 
        :class="{active: currentPage === page}" 
        :key="page" >{{page}}</a>
        <a @click="pageChange(currentPage + 1)" :class="{disabled: currentPage === totalPage}" >下一页</a>
        <a @click="pageChange(totalPage)" :class="{disabled: currentPage === totalPage}" >尾页</a>
    </div>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            default: 1,
        },
        total: {
            type: Number,
            default: 0,
        },
        limit: {
            type: Number,
            default: 10,
        },
        visibleNumber: {
            type: Number,
            default: 10,
        },
    },
    computed: {
        totalPage() {
            return Math.ceil(this.total / this.limit);
        },
        pages() {
            const pages = [];
            const start = Math.max(1, this.currentPage - Math.floor(this.visibleNumber / 2));
            const end = Math.min(this.totalPage, start + this.visibleNumber - 1);
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        },
    },
    methods: {
            pageChange(newPage) {
                if(newPage < 1 || newPage > this.totalPage || newPage === this.currentPage) {
                    return;
                }
                this.$emit("pageChange", newPage);
            }
    },
}
</script>

<style lang='less' scoped>
@import '~@/styles/var.less';

.pager-container {
    width: 800px;
    height: 50px;
    margin: 0 auto;
    text-align: center;
    a {
        font-size: 16px;
        cursor: pointer;
        color: @primary;
        margin: 0 5px;
        &.active {
            color: @warn;
            cursor: default;
        }
        &.disabled {
            color: @lightWords;
            cursor: not-allowed;
        }
    }
}

</style>