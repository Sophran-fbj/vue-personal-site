<template>
    <div class="comment-container" id="comment-container">
        <MessageArea title="文章评论" 
        :subTitle="`(${data.total})`" :list="data.rows" 
        @submit="handleSubmit" :isListLoading="isLoading"
        />
    </div>
</template>

<script>
import fetchData from '@/mixins/fetchData';
import MessageArea from '@/components/MessageArea';
import { getComments, postComment } from '@/api/blog';

export default {
    data() {
        return {
            page: 1,
            limit: 10,
        }
    },
    mixins: [fetchData({})],
    components: {
        MessageArea,
    },
    mounted() {
        this.$bus.$on('mainScroll', this.handleScroll);
    },
    destroyed() {
        this.$bus.$off('mainScroll', this.handleScroll);
    },
    methods: {
        async fetchData() {
            return await getComments(this.$route.params.id, this.page, this.limit);
        },
        async fetchMore() {
            this.page++;
            this.isLoading = true;
            const newComments = await getComments(this.$route.params.id, this.page, this.limit);
            this.data.rows = this.data.rows.concat(newComments.rows);
            this.isLoading = false;
        },
        handleScroll(dom) {
            if(this.isLoading || !dom) {
                return;
            }
            const range = 50;
            if(Math.abs(dom.scrollHeight - dom.clientHeight - dom.scrollTop) < range) {
                this.fetchMore();
            }
        },
        async handleSubmit(formData, callback) {
            const comment = {
                ...formData,
                blogId: this.$route.params.id,
            }
            const resp = await postComment(comment);
            this.data.rows.unshift(resp);
            this.data.total++;
            callback("评论成功");
        }
    }
}
</script>

<style lang="less" scoped>
.comment-container {
    margin: 20px;
}
</style>