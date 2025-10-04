<template>
    <div class="container">
        <Empty></Empty>
    </div>
</template>

<script>
import Empty from './';
export default {
    components: {
        Empty,
    }
}
</script>

<style scoped>
.container {
    position: relative;
    width: 300px;
    height: 300px;
    border: 1px solid red;
}
</style>