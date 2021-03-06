import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router';

Vue.config.productionTip = false;

let router = null;
let instance = null;

function render() {
  router = new VueRouter({
    base: process.env.BASE_URL,
    mode: 'history',
    routes,
  });

  instance = new Vue({
    router,
    render: h => h(App),
  }).$mount('#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('vue app bootstraped');
}

export async function mount(props) {
  console.log('props from main framework', props);
  console.log(props.data.userInfo)
  Array.isArray(props.data.fns) && props.data.fns.map(i => {
    console.log(i)
    Vue.prototype[`$${i.name}`] = i
  });
  render();
}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}
