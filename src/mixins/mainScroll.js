export default function (container) {
    return {
        mounted() {
            this.$bus.$on('setMainScroll', this.setMainScroll);
            this.$refs[container].addEventListener('scroll', this.handleMainScroll);
        },
        beforeDestroy() {
            this.$bus.$emit('mainScroll');
            this.$bus.$off('setMainScroll', this.setMainScroll);
            this.$refs[container].removeEventListener('scroll', this.handleMainScroll);
        },
        methods: {
            handleMainScroll() {
                this.$bus.$emit('mainScroll', this.$refs[container]);
            },
            setMainScroll() {
                this.$refs[container].scrollTop = 0;
            },
        }
    }
}
