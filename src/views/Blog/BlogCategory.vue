<template>
    <div class="blog-category-container">
        <h1>文章分类</h1>
        <BlogContents :list="list" @select="handleSelect" />
    </div>
</template>

<script>
import BlogContents from './BlogContents.vue';
import fetchData from '@/mixins/fetchData';
import { getBlogCategories } from '@/api/blog';
export default {
    components: {
        BlogContents,
    },
    mixins: [fetchData([])],
    methods: {
        async fetchData() {
            return await getBlogCategories();
        },
        handleSelect(item) {
            const query = {
                page: 1,
                limit: this.limit,
            };
            if (item.id === -1) {
                this.$router.push({
                    name: "Blog",
                    query,
                });
            }else {
                this.$router.push({
                    name: "CategoryBlog",
                    query,
                    params: {
                        categoryId: item.id,
                    }
                });
            }
        },
    },
    computed: {
        id() {
            return +this.$route.params.categoryId || -1;
        },
        limit() {
            return +this.$route.query.limit || 10;
        },
        list() {
            const totalArticleCount = this.data.reduce((a, b) => {
                return a + b.articleCount;
            }, 0);
            const result = [{
                id: -1,
                name: "全部",
                articleCount: totalArticleCount,
            }, ...this.data];
            return result.map(it => ({
                ...it,
                isSelect: it.id === this.id,
            }));
        },
    }
}
</script>


<style lang="less" scoped>
.blog-category-container {
    width: 300px;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;

    h1 {
        margin: 0;
        font-size: 1em;
        font-weight: 600;
    }
}
</style>