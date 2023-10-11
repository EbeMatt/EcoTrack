<template>
    <div class="centered-card">
        <div class="card">
            <h2>Datenschutzrichtlinie</h2>
            <p>Ihre Privatsphäre ist uns wichtig. Diese Datenschutzrichtlinie erläutert, wie wir Ihre persönlichen Informationen verwenden und schützen, wenn Sie unsere Webseite nutzen.</p>
            <p>Bitte lesen Sie diese Richtlinie sorgfältig durch und stellen Sie sicher, dass Sie sie verstehen. Wenn Sie Fragen oder Bedenken haben, kontaktieren Sie uns bitte.</p>

            <h3>Welche Daten sammeln wir?</h3>
            <p>Wir sammeln und speichern Daten von Ihnen, um Ihnen einen personalisierten Service bieten zu können. Die gesammelten Daten umfassen:</p>
            <ul>
                <li>Ihren Namen</li>
                <li>Ihre E-Mail-Adresse</li>
                <li>Andere Informationen, die Sie uns freiwillig zur Verfügung stellen(z.B Spritverbrauch, Energiewerte uvm.)</li>
            </ul>

            <h3>Wie verwenden wir Ihre Daten?</h3>
            <p>Wir verwenden Ihre Daten, um Ihnen folgende Dienstleistungen anzubieten:</p>
            <ul>
                <li>Die Möglichkeit, Ihren CO2-Fußabdruck zu verfolgen und zu reduzieren</li>
                <li>Die Bereitstellung von Informationen zur Geldersparnis im Laufe der Zeit</li>
            </ul>

            <h3>Vertraulichkeit Ihrer Daten</h3>
            <p>Ihre Daten sind für uns von höchster Wichtigkeit. Wir verpflichten uns, Ihre persönlichen Informationen vertraulich zu behandeln und sie nicht an Dritte weiterzugeben, es sei denn, dies ist gesetzlich vorgeschrieben.</p>

            <h3>Änderungen dieser Datenschutzrichtlinie</h3>
            <p>Wir behalten uns das Recht vor, diese Datenschutzrichtlinie nach eigenem Ermessen zu ändern oder zu aktualisieren. Bitte überprüfen Sie regelmäßig diese Seite auf Aktualisierungen. Ihre fortgesetzte Nutzung unserer Webseite nach Änderungen dieser Richtlinie gilt als Zustimmung zu diesen Änderungen.</p>

            <h3>Kontakt</h3>
            <p>Bei Fragen oder Bedenken zur Datenschutzrichtlinie können Sie uns unter [Kontaktinformationen] erreichen.</p>

            <p>Gemäß Ihrer Zustimmung durch Setzen des Häkchens bestätigen Sie, dass Sie die Datenschutzrichtlinien akzeptieren.</p>
        </div>
        <button class="back-button" @click="goBackToEcoTrack()">Zurück</button>
    </div>
</template>

<script>
export default {
  name: 'DataRights',
  methods: { 
    goBackToEcoTrack() {
      this.$router.push('/ecotrack');
    }
  }
}
</script>

<style scoped>

.centered-card {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
}
.card {
   display: flex;
   justify-content: center;
   text-align: center; 
   flex-direction: column;
   width: 35%;
   height: auto;
   background-color: beige;
   padding: 40px 20px;
   font-size: 12px;
   border-radius: 5px;
  
}

.card h2,
.card h3 {
    margin: 10px 0; 
}

.card ul,
.card p {
    margin: 5px 0; 
}

.back-button {
  position: absolute;
  top: 150px;
  left: 10px; 
  background-color: #22bc1a;
  color: white; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 10px 20px; 
  font-size: 16px; 
  transition: background-color 0.3s; 
}


.back-button:hover {
  background-color: #7d861c; 
}

</style>