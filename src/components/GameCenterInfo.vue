<template>
    <div class="info-container">
      <div class="info-text">
        <h1>Herzlich willkommen bei <span>"Eco Challenge"</span>!</h1>
        <p>Hier kannst du beweisen, wie ernst es dir mit dem Umweltschutz ist und gleichzeitig Spaß haben. Fordere deine Freunde oder andere Teams heraus und zeige, dass du aktiv zur Rettung unseres Planeten beiträgst.</p>
  
        <p>Lade deine besten Bilder hoch und lass deine Freunde oder Mitstreiter entscheiden, ob du wirklich einen bedeutenden Beitrag zum Klimaschutz leistest. In <span>"Eco Challenge"</span> geht es nicht nur darum zu reden, sondern auch zu handeln und gemeinsam eine nachhaltigere Welt zu schaffen.</p>
  
        <p>Bereit, die Umweltaktion auf die nächste Stufe zu heben? Dann schließ dich uns an und sei Teil der Veränderung! Mach mit bei "Eco Challenge" und inspiriere andere dazu, sich für den Umweltschutz einzusetzen. Gemeinsam können wir Großes erreichen.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GameCenterInfo',
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
  
  .info-container {
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    padding: 20px;
  }
  
  .info-text {
    width: 100%;
  }
  
  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #141714;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 18px;
    line-height: 1.6;
    color: #141714;
    margin-bottom: 20px;
  }
  
  span {
    font-weight: bold;
    color: #141714;
  }
  </style>