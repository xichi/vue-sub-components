import SubComponents from './lib/index.vue';
import _Vue from 'vue';

SubComponents.install = Vue => {
  if (!Vue) {
    window.Vue = Vue = _Vue
  }
  Vue.component(SubComponents.name, SubComponents);
}

export default SubComponents;