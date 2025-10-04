<template>
    <div class="test-container">
        <Contact></Contact>
    </div>
</template>

<script>
import Contact from './';
export default {
    components: {
        Contact
    }
}
</script>

<style lang="less" scoped>
.test-container {
    padding-top: 200px;
    width: 250px;
    height: 100vh;
    border: 1px solid red;
    background-color: #202020;
}
</style>