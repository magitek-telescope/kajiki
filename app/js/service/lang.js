const i18n = function(){
  this.dic = {
    "en": require("../../i18n/en.json"),
    "ja": require("../../i18n/ja.json"),
  };

  this.lang = (navigator.language in this.dic) ? navigator.language.slice(0,1) : "en";

  this.__ = function(word){
    return this.dic[this.lang][word];
  }
}

module.exports = new i18n;
