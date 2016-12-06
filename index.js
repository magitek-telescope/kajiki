const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const $ = e=>document.querySelector(e);
const Vue = require("./vue");

s3.listBuckets((err, data)=>{
  if(err){
    console.log(err);
    alert("サーバーへの接続に失敗しました。\nネット環境及びAWSのCredentialsファイルの有無を確認してください。");
    return;
  }
  data.Buckets.map((b)=>{
    App.buckets.push(b.Name);
  })
});

const App = new Vue({
  el: "#app",
  data: ()=>{
    return {
      buckets: [],
      bucket: "unselected",
      path: "",
      files: undefined,
      cueue: {},
      isProcessing: false,
      now: 0,
      max: 0
    }
  },
  watch: {
    now: function(v){
      if(v == this.max){
        setTimeout(()=>{
          this.isProcessing = false;
        }, 1500);
      }
    }
  },
  methods: {
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
          s3.putObject(
            {
              Bucket      : this.bucket,
              Key         : `${this.path}${file.name}`,
              Body        : event.target.result,
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
        fileReader.readAsDataURL(file);
      }
    }
  }
});
