<template>
  <div id="app">
    <sub-components
      com="test"
      :range="[1, 3]"
      :dataList="['1', '2', '3']"
      :levelControl="true"
    >
      <template v-slot:default>
        THIS IS CONTENT!
      </template>
      <template v-slot:levelControl="scope">
        {{scope}}
      </template>
    </sub-components>
  </div>
</template>

<script>
import SubComponents from "./lib/index";
import test from "./components/test";
export default {
  name: "app",
  components: {
    SubComponents,
    test,
  },
  data() {
    return {};
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
