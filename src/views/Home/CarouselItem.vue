<template>
  <div class="carousel-item-container" ref="container" 
  @mousemove="handleMouseMove"
  @mouseleave="handleMouseLeave">
    <div class="carousel-img" ref="image" :style="imagePosition">
      <ImageLoader @load="showWords" :src="carousel.bigImg" :placeholder="carousel.midImg" />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from '@/components/ImageLoader'
export default {
  props: ["carousel"],
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null,
      imageSize: null,
      mouseX: 0,
      mouseY: 0,
    }
  },
  components: {
    ImageLoader
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.getSize();
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener("resize", this.getSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.getSize);
  },
  methods: {
    // 调用该方法，显示文字
    showWords() {
      this.$refs.title.style.opacity = 0.8;
      this.$refs.title.style.width = 0;
      // 强制让浏览器渲染一次
      this.$refs.title.clientWidth; // reflow
      this.$refs.title.style.transition = "0.5s";
      this.$refs.title.style.width = this.titleWidth + "px";

      // 描述也是一样
      this.$refs.desc.style.opacity = 0.8;
      this.$refs.desc.style.width = 0;
      // 强制让浏览器渲染一次
      this.$refs.desc.clientWidth; // reflow
      this.$refs.desc.style.transition = "1.5s 0.5s";
      this.$refs.desc.style.width = this.descWidth + "px";
    },
    getSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight
      };
      this.imageSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight
      };
    },
    handleMouseMove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseLeave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
  },
  computed: {
    imagePosition() {
      if (!this.imageSize || !this.containerSize) return { left: "0px", top: "0px" };

      const maxLeft = this.imageSize.width - this.containerSize.width;
      const maxTop = this.imageSize.height - this.containerSize.height;
      const left = `-${this.mouseX / this.containerSize.width * maxLeft}px`;
      const top = `-${this.mouseY / this.containerSize.height * maxTop}px`;
      return {
        transform: `translate(${left}, ${top})`
      }
    },
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
}

</script>

<style lang="less" scoped>
@import '~@/styles/var.less';

.carousel-item-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden; 
  .carousel-img {
    width: 110%;
    height: 110%;
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.3s;
  }

  .title,
  .desc {
    position: absolute;
    letter-spacing: 3px;
    left: 30px;
    color: #fff;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
      0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
    white-space: nowrap;
    overflow: hidden;
    opacity: 0;
  }

  .title {
    top: calc(50% - 40px);
    font-size: 2em;
  }

  .desc {
    top: calc(50% + 20px);
    font-size: 1.2em;
    color: lighten(@gray, 20%);
  }
}
</style>
