<template>
    <div id="app">
      <Pager 
      :current-page="current" 
      :total="total" 
      @pageChange="handlePageChange"/>
    </div>
  </template>
  
  <script>
  import Pager from "./";
  
  export default {
    data() {
      return {
        current: 1,
        total: 1000,
      }
    },
    components: {
      Pager,
    },
    methods: {
      handlePageChange(newPage) {
        console.log(newPage);
        this.current = newPage;
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  