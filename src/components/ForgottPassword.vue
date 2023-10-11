<template>
    <div class="positionCard">
      <div class="centerContainer">
        <div class="forgottPasswordCard">
            <i class='bx bx-info-circle'></i>
          <form>
            <label for="nameLogin">Benutzername:</label>
            <input type="text" name="nameLogin" id="nameLogin">
            <label for="email">Email:</label>
            <input type="email" id="email">
            <button @click="sendNewPassword()">Neues Passwort senden!</button>
            <p>{{ info }}</p>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>

import axios from 'axios';

  export default {
    name: 'ForgottPassword',
    data() {
        return {
           info: '', 
        };
    },
    methods: {

       async sendNewPassword() {
                const name = document.getElementById("nameLogin").value;
                const email = document.getElementById("email").value;

                axios.post('http://localhost:3000/forgottPassword', {
                  name: name,
                  email: email,
                })
                .then(function (response) {
                  console.log(response);
                  if (response.data.success) {
                    // Der Benutzer existiert, zeige Erfolgsmeldung oder starte den Prozess zur Zurücksetzung des Passworts.
                    alert('In wenigen Minuten erhalten Sie die E-Mail mit Ihrem neuen Passwort.');
                  } else {
                    // Der Benutzer existiert nicht.
                    alert('Sie haben sich noch nicht registriert!');
                  }
                })
                .catch(function (error) {
                  console.error('Ein Fehler ist aufgetreten:', error);
                  
                });

        }
    }
  };
  </script>
  
  <style scoped>
  .positionCard {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .centerContainer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .forgottPasswordCard {
    background-color: #ffffff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
    width: 300px; /* Passen Sie die Breite nach Bedarf an */
  }
  
  label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  }

  i {
    color: #2ea44f;
    font-size: 25px;
  }
  
  input {
    width: 70%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #2ea44f;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2bb652;
  }
  
  </style>