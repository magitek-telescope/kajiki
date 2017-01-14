const Vue = require("vue");
const VueRouter = require("vue-router");
const s3 = require("./service/s3");
const $ = e=>document.querySelector(e);
const App = Vue.extend(require("./App.vue"));
Vue.use(VueRouter);
console.log(s3);

const routes = [
  { path: "/"        , component: require("./components/index.vue")},
  { path: "/settings", component: require("./components/settings.vue")}
];

const router = new VueRouter({
  routes
})

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
