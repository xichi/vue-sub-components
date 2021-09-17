<template>
  <div id="app">
    <h1>1. Demo:</h1>
    <div style="margin-bottom: 20px">
      <p>range:</p>
      <label>min:</label>
      <input v-model="min" type="number" />
      <label>max:</label>
      <input v-model="max" type="number" />
    </div>
    <sub-components
      com="Demo"
      :dataList="dataList"
      :range="[Number(min), Number(max)]"
    >
      <template>
        <p>THIS IS CONTENT!</p>
      </template>
      <template v-slot:levelControl="scope">
        <div class="menu_container">
          <div
            v-if="scope.increase"
            class="menu-item"
            @click="dataList.push(dataList.length + 1)"
          >
            +
          </div>
          <div v-if="scope.decrease" class="menu-item" @click="dataList.pop()">
            -
          </div>
        </div>
      </template>
    </sub-components>
    <h1>2. Tabs:</h1>
    <sub-components
      com="Tabs"
      :dataList="tabData"
      transferLevel
      @switchTab="switchTab"
    >
      <p>{{ content }}</p>
    </sub-components>
  </div>
</template>

<script>
import SubComponents from "./lib/index";
import Demo from "./components/Demo";
import Tabs from "./components/Tabs";
export default {
  name: "app",
  components: {
    SubComponents,
    Demo,
    Tabs,
  },
  data() {
    return {
      dataList: [1, 2, 3],
      min: 2,
      max: 4,
      tabData: [
        [1, 2, 3],
        [1, 2],
        [1, 2, 3, 4]
      ],
      path: [0, 0, 0],
    };
  },
  computed: {
    content: function() {
      return 'content' + this.path.reduce((acc, cur) => acc + '-' + (cur + 1), '');
    },
  },
  methods: {
    switchTab(data) {
      const { level, index } = data;
      this.$set(this.path, level, index);
    },
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

.menu_container {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.menu-item {
  width: 50px;
  height: 50px;
  line-height: 50px;
  border: 1px solid #000;
  border-radius: 50%;
}
</style>
