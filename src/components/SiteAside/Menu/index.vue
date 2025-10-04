<template>
    <div class="menu-container">
        <RouterLink v-for="i in items"
        :to="{ name: i.name }"
        :key="i.name"
        :exact="i.title !== '文章'"
        exact-active-class=""
        class="menu-item">
            <Icon :name="i.icon"></Icon>
            <span>{{ i.title }}</span>
        </RouterLink>
    </div>  
</template>

<script>
import Icon from '@/components/Icon';
export default {
    data() {
        return {
            items: [
                {
                    title: '首页',
                    icon: 'home',
                    name: 'Home'
                },
                {
                    title: '文章',
                    icon: 'blog',
                    name: 'Blog'
                },
                {
                    title: '关于我',
                    icon: 'about',
                    name: 'About'
                },
                {
                    title: '项目&效果',
                    icon: 'code',
                    name: 'Project'
                },
                {
                    title: '留言板',
                    icon: 'chat',
                    name: 'Message'
                },
            ]
        }
    },
    components: {
        Icon
    },
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
@import '~@/styles/global.less';
.menu-container {
    width: 100%;
    margin: 24px 0;
    background-color: transparent;
    .menu-item {
        display: block;
        height: 45px;
        line-height: 45px;
        padding: 0 50px;
        color: @lightWords;
        &:hover {
            color: #fff;
        }
        .iconfont {
            margin-right: 15px;
        }
        &.router-link-active {
        color: #fff;
        background-color: #2d2d2d;
        }
    }
}
</style>