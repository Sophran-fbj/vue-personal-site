<template>
    <Layout>
        <BlogList />
        <template #right>
            <BlogCategory/>
        </template>
    </Layout>
</template>

<script>
import Layout from '@/components/Layout';
import BlogList from './BlogList.vue';
import BlogCategory from './BlogCategory.vue';
export default {
    components: {
        Layout,
        BlogList,
        BlogCategory
    },
};
</script>

<style lang="less" scoped>
</style>