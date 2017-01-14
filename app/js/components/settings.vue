<template lang="html">
  <form class="main" v-on:submit="save">
    <p>
      <span>{{__("Access Key")}}</span><br>
      <input v-model="key">
    </p>
    <p>
      <span>{{__("Secret Key")}}</span><br>
      <input v-model="secret">
    </p>

    <p class="form-buttons">
      <button type="submit" class="save">{{__("Save")}}</button>
    </p>
  </form>
</template>

<style scoped>
.main{
  font-weight: 300;
  width: 100%;
  position: relative;
  display: block;
}

.prev-button{
  position: absolute;
  right: 10px;
  bottom: 15px;
  fill: #999;
  cursor: pointer;
  display: flex;
  width: 24px;
  height: 24px;
  text-decoration: none;
  color: #999;
  font-size: 32px;
  font-weight: 900;
  align-items: center;
  justify-content: center;
}

.form-buttons{
  text-align: center;
}

h1{
  margin: 0;
}

h1, p, button{
  padding: 0 20px;
  margin: 0 0 20px;
  width: calc(100% - 40px);

  font-size: 11px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: .1rem;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
}

span{
  font-size: 14px;
}

input{
  width: 100%;
  margin-top: 0;
  height: 38px;
  padding: 6px 10px;
  background-color: #fff;
  border: 1px solid #D1D1D1;
  border-radius: 4px;
  box-shadow: none;
  box-sizing: border-box;
}

button{
  display: inline-block;

  height: 38px;
  padding: 0 30px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;

  width: 150px;
  margin-right: 20px;
  outline: none;
}

.save{
  color: #fff;
  background: #0090E6;
  border: solid 1px #0090E6;
}

.cancel{
  color: #fff;
  border: 1px solid #bbb;
}
</style>

<script>
const i18n = require("../service/lang");
module.exports = {
  beforeRouteEnter(from, to, next){
    next((vm) => {
      vm.initialize();
    })
  },
  data: ()=>{
    return {
      key: "",
      secret: ""
    }
  },
  methods: {
    __(word){
      return i18n.__(word);
    },
    initialize(){
      const iam = require("../service/iam");
      const iamData = iam.getIam();

      this.key = iamData.key;
      this.secret = iamData.secret;
    },
    save(){
      const iam = require("../service/iam");
      iam.setIam(
        this.key,
        this.secret
      );
      this.$router.push("/");
    },
    cancel(){
      this.$router.push("/");
    }
  }
}
</script>
