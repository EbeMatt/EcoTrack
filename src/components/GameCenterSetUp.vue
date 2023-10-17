<template>
    <div class="container-game">
         <div class="setup-card" v-if="showSetUp">
            <h2>Einstellungen</h2>
            <img src="../assets/CreateGame.png" alt="GameGroup" class="card-image">
            <label for="image">Füge ein Gruppenbild hinzu:</label>
            <input type="file" name="image" id="image" @change="handleImageUpload">
            <img :src="groupImage" alt="Group Image" class="round-image-input" v-if="groupImage">
            <button @click="addUser">Benutzer hinzufügen</button>
            <button>Fertig!</button>
        </div>

        <div class="setup-card" v-if="showInviteFriend">
            <h2>Freunde einladen</h2>
            <input type="email" id="email" v-model="friendEmail" placeholder="Email">
            <button @click="inviteFriend">Einladen</button>
            <button @click="closeInviteFriend">Abbrechen</button>
            <p>Du hast {{ inviteFriendCount }} eingeladen</p>

        </div>

    </div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'GameCenterSetUp',
  data() {
    return {
      showInviteFriend: false,
      friendEmail: '',
      showSetUp: true,
      groupImage: '',
      inviteFriendCount: 0,
    };
  },
  methods: {
    addUser() {
      console.log('addUser called');
      this.showSetUp = false;
      this.showInviteFriend = true;
    },
    

    closeInviteFriend() {
      this.showInviteFriend = false;
      this.showSetUp = true;
      this.friendEmail = '';
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      this.groupImage = URL.createObjectURL(file);
    },

    async inviteFriend() {
      try {
        console.log('inviteFriend called!');

        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Benutzer ist nicht authorisiert!');
          return;
        }


        // fehler beim senden  
        const response  = await axios.post('http://localhost:3000/checkEmail' , {
            email: this.friendEmail,
            }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            const  emailExist  = response.data;  // echte email sieht er als ungülti und unechte erkennt er nicht 

            if (!emailExist) {
                console.error('Email existiert nicht!');
                alert('Diese Email existiert nicht!')
                return;
        } 
        
        this.inviteFriendCount++;
        this.friendEmail = '';
      } catch (error) {
        console.error('Fehler beim Senden der Email', error);
      }
    },
  },
};
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

.setup-card {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 400px;
    height: auto;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
}

.setup-card h2 {
  font-size: 30px;
  
}

.setup-card button {
  display: inline-block; /* Ändere "flex" zu "inline-block" */
  margin-right: 10px; /* Füge einen Abstand zwischen den Buttons hinzu */
  border: none;
  outline: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
  background-color: #364238;
  color: #fff;
  transition: all 0.3s ease;
  margin: 10px;
}

.setupcard button:hover {
  background-color: #2c3629;
}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #000;
    border-radius: 5px;
    font-size: 15px;
    font-weight: bold;
    outline: none;
    text-align: center;
}

label {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
}

.card-image {
    width: 100%;
    height: 40%;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 20px;    
}

.round-image-input {
  border-radius: 50%;
  width: 100px; /* Ändern Sie die Breite nach Bedarf */
  height: 100px; /* Ändern Sie die Höhe nach Bedarf */
  object-fit: cover; /* Sorgt dafür, dass das Bild im Kreis zentriert und beschnitten wird */
  overflow: hidden; /* Maskieren Sie den überflüssigen Bereich außerhalb des Kreises */
  display: block; /* Ändern Sie die Anzeige auf "block", um unnötigen Abstand zu vermeiden */
  margin: 0 auto; /* Zentrieren Sie das Bild horizontal im Container */
}




</style>