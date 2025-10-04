<template>
    <div class="imageloader-container">
        <img v-if="!everythingDone" class="placeholder" :src="placeholder">
        <img 
        @load="handleLoaded" 
        :src="src"
        :style="{opacity:originOpacity, transition: `${duration}ms`}">
    </div>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            default: 500,
        }
    },
    data() {
        return {
            originLoaded: false,
            everythingDone: false,
        }
    },
    computed: {
        originOpacity() {
            return this.originLoaded ? 1 : 0;
        }
    },
    methods: {
        handleLoaded() {
            this.originLoaded = true;
            setTimeout(() => {
                this.everythingDone = true;
                this.$emit('load');
            }, this.duration);
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@/styles/mix.less';
.imageloader-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    img {
        .self-fill();
        object-fit: cover;
    }
    .placeholder {
        filter: blur(10px);
    }
    .origin {
        opacity: 0;
    }
}
</style>
