<template>
    
    <div class="navbar-game">
        <div class="button-group">
            <button class="button-group-button" @click="showCreateGroupCard = true">Gruppe erstellen</button>
            <button class="button-group-button">Gruppe beitreten</button>
        </div>
        <div class="create-group-card" v-if="showCreateGroupCard">
            <h2>Gruppe erstellen</h2>
            <img src="../assets/GameGroup.png" alt="GameGroup" class="card-image">
            <label for="groupName">Gruppenname:</label>
            <input type="text" id="groupName" v-model="groupName" required>
            <label for="groupAdmin">Gruppenadmin:</label>
            <input type="text" id="groupAdmin" v-model="groupAdmin" required>
            <button @click="createGroup">Gruppe erstellen</button>
            <button @click="toggleCreateGroupCard(false)">Schließen</button>
            
                
        </div>
        </div>
</template>

<script>

import axios from 'axios';
import { parseToken } from './tokenUtils';

export default {
    name: 'NavBarGameCenter',
    data() {
        return {
      showCreateGroupCard: false,
      groupName: '',
      groupAdmin: '',
    };
},
    methods: {
    toggleCreateGroupCard(show) {
      this.showCreateGroupCard = show;
    },
    async createGroup() {
      const token = localStorage.getItem('token');
      const decodedToken = parseToken(token);

      if (!this.groupName || !this.groupAdmin) {
        return;
      }

      axios
        .post(
          'http://localhost:3000/groups',
          {
            group_name: this.groupName,
            admin_id: this.groupAdmin,
            userId: decodedToken.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          
          console.log(response.data);

          
        })
        .catch((error) => {
          //  wenn die Anfrage fehlschlägt
          console.error(error);
        });
        this.groupName = '';
        this.groupAdmin = '';
        this.showCreateGroupCard = false;

        this.$router.push('/gamecentersetup');
    },
  },
};
</script>

<style scoped>

.navbar-game {
    position: fixed;
    top: 20px;
    right: 20px;
}

button {
    border: none;
    outline: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0 10px;
    background-color: #fff;
    color: #000;
    transition: all 0.3s ease;
    margin-top: 5px;
}


.create-group-card {
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

.create-group-card h2 {
  font-size: 30px;
  
}

.create-group-card button {
  display: inline-block; 
  margin-right: 10px; 
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
}

.create-group-card button:hover {
  background-color: #2c3629;
}

.card-image {
    width: 100%;
    height: 40%;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 20px;    
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
}

label {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
}



</style>