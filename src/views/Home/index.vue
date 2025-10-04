<template>
    <div v-loading="loading" class="home-container" ref="container" @wheel="handleWheel">
        <ul class="carousel-container" :style="{ marginTop }">
            <li v-for="item in banners" :key="item.id">
                <CarouselItem :carousel="item" />
            </li>
        </ul>
        <div class="icon icon-up" :style="{ opacity: index != 0 ? 1 : 0, pointerEvents: index != 0 ? 'auto' : 'none' }"
            @click="switchTo(index - 1)">
            <Icon name="arrowUp" />
        </div>
        <div class="icon icon-down"
            :style="{ opacity: index != banners.length - 1 ? 1 : 0, pointerEvents: index != banners.length - 1 ? 'auto' : 'none' }"
            @click="switchTo(index + 1)">
            <Icon name="arrowDown" />
        </div>
        <ul class="indicator">
            <li v-for="(item, i) in banners" :key="item.id">
                <div class="indicator-item" :class="{ selected: i === index }" @click="switchTo(i)"></div>
            </li>
        </ul>
    </div>
</template>

<script>
import CarouselItem from './CarouselItem.vue';
import Icon from '@/components/Icon';
import Loading from '@/directives/loading';
import { mapState } from 'vuex';
export default {
    data() {
        return {
            index: 0,
            containerHeight: 0,
            lastScollTime: 0,
            gapTime: 500,
        }
    },
    components: {
        CarouselItem,
        Icon,
    },
    directives: {
        Loading,
    },
    created() {
        this.$store.dispatch('banner/fetchBanners');
    },
    mounted() {
        this.containerHeight = this.$refs.container.clientHeight;
        window.addEventListener("resize", this.handleResize);
    },
    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    },
    computed: {
        marginTop() {
            return -this.index * this.containerHeight + "px";
        },
        ...mapState('banner', ['loading', 'banners']),
    },
    methods: {
        switchTo(i) {
            this.index = i;
        },
        handleWheel(e) {
            const now = Date.now();
            if (now - this.lastScollTime < this.gapTime) return;
            this.lastScollTime = now;
            if (e.deltaY < 0 && this.index > 0) {
                this.switchTo(this.index - 1);
            } else if (e.deltaY > 0 && this.index < this.banners.length - 1) {
                this.switchTo(this.index + 1);
            }
        },
        handleResize() {
            this.containerHeight = this.$refs.container.clientHeight;
        },
    }
};
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';

.home-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flow-root;

    .carousel-container {
        width: 100%;
        height: 100%;
        transition: 500ms;

        li {
            width: 100%;
            height: 100%;
        }
    }

    ul {
        padding-inline-start: 0;
        margin: 0;
        list-style: none;
    }

    .icon {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

        .iconfont {
            cursor: pointer;
            font-size: 35px;
            color: @gray;
        }

        &.icon-up {
            top: 30px;
            animation: up 1.5s infinite;
        }

        &.icon-down {
            bottom: 30px;
            animation: down 1.5s infinite;
        }
    }

    .indicator {
        position: absolute;
        right: 25px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 60px;

        .indicator-item {
            background-color: transparent;
            border-radius: 50%;
            border: 1px solid #fff;
            width: 5px;
            height: 5px;
            margin: 5px 0;
            cursor: pointer;

            &.selected {
                background-color: #fff;
            }
        }
    }
}

@keyframes up {
    60% {
        transform: translateX(-50%) translateY(-20px);
    }

    to {
        transform: translateX(-50%) translateY(0);
    }
}

@keyframes down {
    60% {
        transform: translateX(-50%) translateY(20px);
    }

    to {
        transform: translateX(-50%) translateY(0);
    }
}
</style>