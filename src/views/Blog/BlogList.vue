<template>
    <div class="blog-list-container" v-loading="isLoading" ref="container">
        <ul>
            <li v-for="item in data.rows">
                <div class="thumb" v-if="item.thumb">
                    <RouterLink :to="{
                        name: 'BlogDetail',
                        params: {
                            id: item.id,
                        },
                    }">
                        <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
                    </RouterLink>
                </div>
                <div class="main">
                    <RouterLink :to="{
                        name: 'BlogDetail',
                        params: {
                            id: item.id,
                        },
                    }">
                        <h2>{{ item.title }}</h2>
                    </RouterLink>
                    <div class="aside">
                        <span>日期：{{ formatDate(item.createDate) }}</span>
                        <span>浏览：{{ item.scanNumber }}</span>
                        <span>评论{{ item.commentNumber }}</span>
                        <a href="" class="">{{ item.category.name }}</a>
                    </div>
                    <div class="desc">
                        {{ item.description }}
                    </div>
                </div>
            </li>
        </ul>
        <Pager :currentPage="routeInfo.page" :total="data.total" :limit="routeInfo.limit"
            @pageChange="handlePageChange" />
    </div>
</template>

<script>
import { getBlogs } from '@/api/blog';
import fetchData from '@/mixins/fetchData';
import mainScroll from '@/mixins/mainScroll';
import { formatDate } from '@/utils';
import Pager from '@/components/Pager';
export default {
    mixins: [fetchData({}), mainScroll('container')],
    methods: {
        async fetchData() {
            return await getBlogs();
        },
        formatDate,
        handlePageChange(newPage) {
            const query = {
                page: newPage,
                limit: this.routeInfo.limit,
            };
            if (this.routeInfo.categoryId === -1) {
                this.$router.push({
                    name: 'Blog',
                    query,
                });
            } else {
                this.$router.push({
                    name: 'CategoryBlog',
                    query,
                    params: {
                        categoryId: this.routeInfo.categoryId,
                    },
                });
            }
        },
    },
    components: {
        Pager,
    },
    computed: {
        routeInfo() {
            const categoryId = +this.$route.params.categoryId || -1;
            const page = +this.$route.query.page || 1;
            const limit = +this.$route.query.limit || 10;
            return {
                categoryId,
                page,
                limit,
            };
        },
    },
    watch: {
        async $route() {
            this.isLoading = true;
            // 滚动高度为0
            this.$refs.container.scrollTop = 0;
            this.data = await this.fetchData();
            this.isLoading = false;
        }
    },
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";

.blog-list-container {
    line-height: 1.7;
    position: relative;
    padding: 20px;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    scroll-behavior: smooth;

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
}

li {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid @gray;

    .thumb {
        flex: 0 0 auto;
        margin-right: 15px;

        img {
            display: block;
            max-width: 200px;
            border-radius: 5px;
        }
    }

    .main {
        flex: 1 1 auto;

        h2 {
            margin: 0;
        }
    }

    .aside {
        font-size: 12px;
        color: @gray;

        span {
            margin-right: 15px;
        }
    }

    .desc {
        margin: 15px 0;
        font-size: 14px;
    }
}
</style>