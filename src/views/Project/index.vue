<template>
    <div class="projects-container" ref="container">
        <div v-for="item in data" :key="item.id" class="project">
            <a :href="item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`
                " :target="item.url ? '_blank' : '_self'">
                <img class="thumb" v-lazy="item.thumb" />
            </a>
            <div class="info">
                <h2>
                    <a :href="item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`
                        " :target="item.url ? '_blank' : '_self'">
                        {{ item.name }}
                    </a>
                </h2>
                <a class="github" target="_blank" :href="item.github" v-if="item.github">
                    github
                </a>
                <p v-for="(desc, i) in item.description" :key="i">
                    {{ desc }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import mainScroll from '@/mixins/mainScroll';
export default {
    mixins: [mainScroll("container")],
    computed: mapState('project', ['loading', 'data']),
    created() {
        this.$store.dispatch('project/fetchProjects');
    },
};
</script>

<style lang="less" scoped>
.projects-container {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    scroll-behavior: smooth;

    .project {
        margin: 20px;
        padding: 20px;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        transition: 0.5s;

        .info {
            margin-left: 10px;
            align-self: flex-start;
            h2 {
                margin: 0;
                margin-bottom: 10px;
            }
            .github {
                font-size: 14px;
            }
        }

        &:hover {
            transform: scale(1.01) translate(3px, -3px);
            box-shadow: -1px 1px 10px rgba(0, 0, 0, 0.5);
        }
    }
}

.thumb {
    width: 250px;
    min-height: 200px;
    object-fit: cover;
    border-radius: 5px;
}
</style>