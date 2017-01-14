<template lang="html">
  <div id="app">
    <header>
      <h1>
        <img :src="'images/icon.png'" alt="" width="40">
        <span>Kajiki</span>
      </h1>
    </header>

    <router-view></router-view>

    <div class="navigation">
      <router-link to="/" class="navigation-button" exact>
        &times;
      </router-link>
      <router-link to="/settings" class="navigation-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
#app{
  background: #f0f0f0;
  font-weight: 900;
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

header{
  margin: 0;
  padding: 0;
  line-height: 0.8;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0288E5;
  pointer-events: none;

  height: 100px;
}

header h1{
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

header img{
  margin-right: 5px;
}

.navigation{
  width: calc(100% - 20px);
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px;
}

.navigation-button{
  color: #999;
  fill: #999;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 900;
}

.navigation-button.router-link-active{
  display: none;
}
</style>

<script>
module.exports = {
  created(){
    window.vm = () =>{
      return this;
    }
  }
}
</script>
