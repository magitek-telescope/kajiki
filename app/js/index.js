const Vue = require("vue");
const VueRouter = require("vue-router");
const App = Vue.extend(require("./App.vue"));
Vue.use(VueRouter);

const routes = require("./routes");
const router = new VueRouter({routes});

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
