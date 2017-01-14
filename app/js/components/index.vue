<template lang="html">
  <div class="main">
    <form v-on:submit.prevent="upload" v-on:dragover="dragover" v-on:drop="drop" v-if="!isProcessing">
      <div class="drop-here">
        {{__("Drop here.")}}
      </div>

      <div class="options">
        <select v-model="bucket" class="bucket">
          <option value="unselected">{{ buckets.length ? __("Select bucket") : __("Loading...") }}</option>
          <option v-for="b in buckets" :value="b">{{b}}</option>
        </select>
        <span class="options-separator">/</span>
        <input v-model="path" class="path" placeholder="path/to/">

        <button type="submit" style="display:none;"></button>
      </div>
    </form>

    <div class="processing" v-else>
      <div class="loader" v-if="now != max"></div>
      <div style="font-size:100px;color:#388E67;margin: 50px 50px 75px;" v-else>✓</div>
      <p class="progress" v-if="now != max">{{__("Uploading...")}}<br>{{now}}/{{max}}</p>
      <p class="progress" v-else>{{__("Complete!")}}</p>
    </div>
  </div>
</template>

<style scoped>
.main{
  width: 100%;
  margin: 0;
}

form{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
}

.drop-here{
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: dotted 5px #aaa;
  border-radius: 10px;
  margin: 30px 0 50px;
  pointer-events: none;
}

.options{
  height: 24px;
  display: flex;
  padding: 10px;
}

.options select{
  width: 130px;
  height: 24px;
  -webkit-appearance: none;
  background: #fff;
  border: solid 1px #e5e5e5;
  margin-bottom: 25px;
  font-family: Lato;
  font-weight: 600;
  border-radius: 0 2px 2px 0 / 0 2px 2px 0;
  outline: none;
  padding-left: 5px;
  color: #B2B1B2;
}

.options-separator{
  display: flex;
  padding: 0 5px;
  align-items: center;
  justify-content: center;
}

input{
  width: 130px;
  height: 20px;
  background: #fff;
  border: solid 1px #e5e5e5;
  margin-bottom: 25px;
  font-family: Lato;
  font-weight: 600;
  border-radius: 0 2px 2px 0 / 0 2px 2px 0;
  outline: none;
}

.processing{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #555;
  font-weight: 600;
  font-size: 60px;
}

.progress{
  font-size: 14px;
  text-align: center;
}

.loader {
  color: #cbcbcb;
  font-size: 20px;
  margin: 100px auto;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load4 1.3s infinite linear;
  animation: load4 1.3s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
@-webkit-keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
@keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
</style>

<script>
const i18n = require("../service/lang");
const $ = e=>document.querySelector(e);

module.exports = {
  beforeRouteEnter(from, to, next){
    next((vm) => {
      vm.initialize();
    });
  },
  data: ()=>{
    return {
      buckets: [],
      bucket: "unselected",
      path: "",
      files: undefined,
      cueue: {},
      isProcessing: false,
      now: 0,
      max: 0,
      s3: undefined
    }
  },
  watch: {
    now: function(v){
      if(v == this.max){
        setTimeout(()=>{
          this.isProcessing = false;
        }, 2000);
      }
    }
  },
  methods: {
    __(word){
      console.log(i18n);
      return i18n.__(word);
    },
    initialize(){
      const iam = require("../service/iam");
      const iamData = iam.getIam();

      console.log(iamData);
      if(!iamData.key || !iamData.secret){
        this.$router.push("/settings");
        return;
      }

      this.s3 = require("../service/s3")(
        iamData.key,
        iamData.secret
      );

      this.s3.listBuckets((err, data)=>{
        if(err){
          console.log(err);
          alert("サーバーへの接続に失敗しました。\nネット環境及びAWSのCredentialsファイルの有無を確認してください。");
          return;
        }
        data.Buckets.map((b)=>{
          this.buckets.push(b.Name);
        })
      });
    },
    dragover(e){
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    },
    drop(e){
      e.stopPropagation();
      e.preventDefault();
      this.files = e.dataTransfer.files;
      $("button").click();
    },
    upload(){
      if(this.bucket == "unselected"){
        alert("バケットを選択してください");
        return false;
      }
      this.max = this.files.length;
      this.now = 0;
      this.cueue = {};
      this.isProcessing = true;

      for(const file of this.files){
        this.cueue[file.name] = this.file;
        console.log(file.name + " やってる");
        const fileReader = new FileReader();
        fileReader.onloadend = (event)=>{
          console.log(file.type);
          console.log(event);
          this.s3.putObject(
            {
              Bucket      : this.bucket,
              Key         : `${this.path}${file.name}`,
              Body        : new Buffer(event.target.result, 'binary'),
              ContentType : file.type
            },
            (err, data) => {
              if(!err){
                console.log(file.name + " いけた");
                this.now++;
              }else{
                console.log(file.name + " いけてない");
                console.log(err);
                alert("エラーが発生しました。");
              }
            }
          )
        };
        this.cueue[file.name] = null;
        fileReader.readAsArrayBuffer(file);
      }
    }
  }
}
</script>

<style lang="css">
</style>
