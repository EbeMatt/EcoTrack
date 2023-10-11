<template>
    <div class="container-game">
      <GameCenterInfo />
      <NavBarGameCenter />

    </div>
</template>

<script>
import GameCenterInfo from './GameCenterInfo.vue';
import NavBarGameCenter from './NavBarGameCenter.vue';

export default {
    name: 'GameCenter',
    components: { 
      GameCenterInfo,
      NavBarGameCenter,
    },
}


</script>


<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  
 
  
}

.container-game {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center;
  z-index: 9999;
  background-image: url('../assets/Game.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  overflow: auto;
  padding-top: 50px; 
}

</style>