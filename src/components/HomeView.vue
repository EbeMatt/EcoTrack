<template>
  <div> 
    <NavBar />
  </div>
 

    <div class="information-container">
      
        <div class="welcome-container">
          <p>Willkomen bei <span>EcoTrack</span></p>
          <p>Es ist schön zu sehen, dass Sie sich entschieden haben einen Beitrag zu leisten und die Umwelt und Ihre Geldbörse zu schonen.</p><br><br>
          <p>Mit Hilfe Ihrer Unterstützung und Ihrem Einsatz wollen und werden wir unserem Planeten helfen sich zu erholen und die Zukunft für unsere Kinder sichern.</p><br><br>
          <p>Damit Ihnen es so einfach wie möglich gemacht wird, stellen wir Ihnen Tipps, Diagramme und Erfolge in Aussicht.</p>
          <p>Sie können jederzeit Ihren Fortschritt verfolgen, das Ersparnisse einsehen und wertvolle Tipps bei Ihrer Familie oder Ihrem Freundeskreis teilen.</p>
          <p>Zudem können Sie noch unter <strong>Meine Erfolge</strong> Punkte erreichen und so das nächste Level erreichen, aber noch wichtiger, Sie sparen so CO2 und Geld.</p>
        </div>
      </div>
  
  
</template>

<script>

import NavBar from './NavBar.vue';




export default {
  name: 'HomeView',
  components: {
    NavBar,
    
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
.information-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 45%;
  padding-top: 150px;
  padding: 20px;
  position: fixed;
  top: 65px;
  left: -20px;
}



.information-container .welcome-container {
    margin-top: 20px;
    
    width: 45%;
    height: 100%;
    padding: 30px;
    padding-top: 50px;
    border-radius: 10px;
     color: black;
    margin-left: 0px;
    
}

span {
    font-size: 25px;
    font-weight: 900;
    color: rgb(0, 0, 0);
}





</style>
