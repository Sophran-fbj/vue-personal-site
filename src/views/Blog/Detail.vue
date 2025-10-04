<template>
    <Layout>
        <template #default>
            <div class="main-container" @scroll="setActiveAnchor" ref="main-container">
                <div class="detail-container" v-loading="isLoading">
                    <h1 class="title">{{ data.title }}</h1>
                    <div class="aside" v-if="data.createDate">
                        <span>日期: {{ formatDate(data.createDate) }}</span>
                        <span>浏览: {{ data.scanNumber }}</span>
                        <a href="#comment-container">评论: {{ data.commentNumber }}</a>
                        <RouterLink :to="`/blog/cate/${data.category.id}`">{{ data.category.name }}</RouterLink>
                    </div>
                    <div v-html="data.htmlContent" class="markdown-body"></div>
                </div>
                <DetailComment v-if="!isLoading" />
            </div>
        </template>
        <template #right>
            <div class="detail-contents-container" v-loading="isLoading">
                <h1>文章目录</h1>
                <DetailContents :list="tocWithSelect" @select="handleSelect" />
            </div>
        </template>
    </Layout>
</template>

<script>
import fetchData from '@/mixins/fetchData';
import mainScroll from '@/mixins/mainScroll';
import Layout from '@/components/Layout';
import DetailContents from './DetailContents';
import DetailComment from './DetailComment';
import { getBlog } from '@/api/blog';
import { formatDate, debounce } from '@/utils';
import "highlight.js/styles/github.css";
export default {
    data() {
        return {
            activeAnchor: '',
        }
    },
    components: {
        Layout,
        DetailContents,
        DetailComment,
    },
    mixins: [fetchData({//防止读取null的null的属性
        category: { name: '' }
    }), mainScroll("main-container")],
    methods: {
        async fetchData() {
            const resp =  await getBlog(this.$route.params.id);
            document.title = `${resp.title}-Sophran个人空间`;
            return resp;
        },
        handleSelect(item) {
            location.hash = item.anchor;
        },
        formatDate,
        setActiveAnchor() {
            const doms = [];
            const getDom = (toc = []) => {
                for (const t of toc) {
                    const dom = document.getElementById(t.anchor);
                    if (dom) {
                        doms.push(dom);
                    }
                    if (t.children && t.children.length) {
                        getDom(t.children);
                    }
                }
            }
            getDom(this.data.toc);
            for (const dom of doms) {
                const top = dom.getBoundingClientRect().top;
                if (top >= 0 && top <= 250) {
                    this.activeAnchor = dom.id;
                }
                if (top > 250) {
                    return;
                }
                if (top < 0) {
                    this.activeAnchor = dom.id;
                }
            }
        },
    },
    created() {
        this.setActiveAnchor = debounce(this.setActiveAnchor, 50);
    },
    computed: {
        tocWithSelect() {
            const getTOC = (toc = []) => {
                return toc.map((t) => ({
                    ...t,
                    isSelect: t.anchor === this.activeAnchor,
                    children: getTOC(t.children),
                }))
            }
            return getTOC(this.data.toc);
        }
    },
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
@import '~@/styles/markdown.css';

.main-container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    scroll-behavior: smooth;
}

.detail-container {
    padding: 20px;
    letter-spacing: 1px;
    margin-left: 30px;

    .title {
        margin: 0;
        letter-spacing: 2px;
    }

    .aside {
        font-size: 14px;
        width: 360px;
        display: flex;
        color: @lightWords;
        margin: 10px 5px 20px 5px;
        justify-content: space-between;
    }
}

.detail-contents-container {
    width: 300px;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    position: relative;

    h1 {
        margin: 0;
        font-size: 1em;
        font-weight: 600;
    }
}
</style>