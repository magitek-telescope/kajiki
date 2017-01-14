const Iam = function(){

  this.getIam = () => {
    const params = {
      key: "",
      secret: ""
    };

    if("kajiki_key" in localStorage){
      params.key = localStorage.kajiki_key;
    }

    if("kajiki_secret" in localStorage){
      params.secret = localStorage.kajiki_secret;
    }
    return params;
  }

  this.setIam = (key, secret) => {
    localStorage.kajiki_key = key;
    localStorage.kajiki_secret = secret;
  }

}

module.exports = new Iam();
