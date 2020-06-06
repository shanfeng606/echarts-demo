<template>
  <div id="app">
    <pages></pages>
  </div>
</template>

<script>
import pages from "./components/pages";

export default {
  name: "App",
  components: {
    pages
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: #eee;
}
#app {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing:border-box;
  /* -webkit-box-shadow: 0px 0px 13px 6px rgba(0,0,0,1);
  -moz-box-shadow: 0px 0px 13px 6px rgba(0,0,0,1); */
 
}
</style>
