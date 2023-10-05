<template>
  <div class="containerFrontPage">
     <div class="boxPicture">
         <img src="../assets/Logo1.png">
                <h1>Willkommen bei <span>EcoTrack</span></h1>
                         <p>Starten <strong>Sie</strong> jetzt und verfolgen Sie ihren ökologischen Fußabdruck</p>
                                  <div class="container">
                                          <button class="btn-frontPage" @click="openLoginCard">Login</button>
                                                  <button class="btn-frontPage" @click="openSignUpCard">Sign Up</button>
                                                   </div>
                                                   
      <p>Created by Ebenberger Matthias</p>

                 <div class="loginCard" :style="{ display: loginCardVisible ? 'block' : 'none' }">
                                                      <h1>Login</h1>
                                                             <h4 @click="closeLoginCard">X</h4>
                                                                <form method="post"></form>
                                                                       <div class="txt_loginCard">
                                                                         <input id="nameLogin" type="text" required>
                                                                         <span></span>
                                                                         <label>Benutzername</label>
                                                                       </div>
                                                   <div class="txt_loginCard">
                                                     <input id="passwordLogin" type="password" required>
                                                     <span></span>
                                                     <label>Password</label>
                                                   </div>
                                                   <div class="pass">
                                                   <router-link to="/forgottpassword">Password vergessen?</router-link>
                                                  </div>
                                    <input class="btn-Logincard" type="submit" @click="submitLogin()" value="Login">
                                    <div class="signupLink">Registrieren? <a href="#">Sign Up</a></div>
                                  </div>

      <div class="signUpCard" :style="{ display: signUpCardVisible ? 'block' : 'none' }">
        <h1>Sign Up</h1>
        <h4 @click="closeSignUpCard">X</h4>
        <form method="post"></form>
                                  <div class="txt_signUpCard">
                                    <input id="nameRegister" type="text" required>
                                    <span></span>
                                    <label>Name</label>
                                  </div>
                                              <div class="txt_signUpCard">
                                                <input id="emailRegister" type="email" v-model="email" @input="validEmail" required>
                                                <span></span>
                                                <p v-if="emailInvalidMessage" :style="{ color: 'red'}">{{ emailInvalidMessage }}</p>
                                                <label>Email</label>
                                              </div>
        <div class="txt_signUpCard">
          <input id="passwordRegister" v-model="password" @input="validatePassword" type="password" required>
    <span></span>
    <p v-if="passwordErrorMessage || password !== ''" :style="{ color: 'red' }">{{ passwordErrorMessage }}</p>
    <label>Password</label>
  </div>
        <div class="txt_signUpCard">
          <input id="confirmRegister" v-model="passwordConfirmation" @input="validatePasswordMatch" type="password" required>
          <span></span>
          <p v-if="passwordMatchError" :style="{ color: 'red' }">{{ passwordMatchError }}</p>
          <label>Confirm Password</label>
        </div>
        <input class="positionOfCheckbox" type="checkbox" v-model="checkboxChecked">
        <router-link to="/datarights">Ich akzeptiere die <strong><a> Richtlinien</a></strong> dieser Firma.</router-link>
        <input class="btn-signUpCard" type="submit" @click="submitClicked()" value="Sign Up" :disabled="!checkboxChecked">
        <div class="loginLink">Sie haben schon einen Account? <a href="#">Login</a></div>
      </div>
    </div>
    <i @click="openMail()" class='bx bx-envelope bx-flip-horizontal' ></i>
  </div>
</template>





<script>

import axios from 'axios';
import CryptoJS from 'crypto-js';



export default {
  data() {
    return {
    loginCardVisible: false,
    signUpCardVisible: false,
    checkboxChecked: false,
    password: '',
    passwordConfirmation: '',
    passwordErrorMessage: '', 
    passwordMatchError: '', 
    emailInvalidMessage: '',
  };
  },
  methods: {
    openLoginCard() {
      this.closeSignUpCard();
      this.loginCardVisible = true;
    },
    closeLoginCard() {
      this.loginCardVisible = false;
    },
    openSignUpCard() {
      this.closeLoginCard();
      this.signUpCardVisible = true;
    },
    closeSignUpCard() {
      this.signUpCardVisible = false;
    },
    toggleSignUpButton() {
      this.checkboxChecked = !this.checkboxChecked;
    },
    validatePassword() {
      console.log(this);
      const password = this.password;
      let errorMessage = '';

      if (password.length < 8) {
        errorMessage += 'Das Passwort muss mindestens 8 Zeichen lang sein. ';
      }

      if (!/[A-Z]/.test(password)) {
        errorMessage += 'Das Passwort muss mindestens einen Großbuchstaben enthalten. ';
      }

      if (!/[!@#$%^&*()_+{}[\]:;<>,.?~-]/.test(password)) {
            errorMessage += 'Das Passwort muss mindestens ein Sonderzeichen enthalten. ';
      }

      this.passwordErrorMessage = errorMessage;
    },

    validatePasswordMatch() {
       if(this.password != this.passwordConfirmation) {
        this.passwordMatchError = 'Diese Passwörter stimmen nicht überein.';
       } else {
        this.passwordMatchError = '';
       }
    },

    validEmail() {
      const email = this.email;
         if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.emailInvalidMessage = '';
         } else {
          this.emailInvalidMessage = 'Das enstpricht keiner gültigen Emailadresse!';
         }
    },
    openMail() {
      window.open('mailto:matthias.ebenberger@gmx.at.');
    },

    
    

    submitClicked() {

      const name = document.getElementById("nameRegister").value;
      const password = document.getElementById("passwordRegister").value;
      const email = document.getElementById("emailRegister").value;
      const confirmPw = CryptoJS.SHA256(document.getElementById("confirmRegister").value).toString(CryptoJS.enc.Hex);
      const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
      const vm = this;

      axios.post('http://localhost:3000/register', {
        name: name,
        password: hashedPassword,
        email: email,
        confirmPw: confirmPw,
        accepted_rules: vm.checkboxChecked,
      })
      .then(function (response) {
        console.log(response);
        if(response.data.success) {
          alert(response.data.message);
          vm.closeSignUpCard();   // greift auf this nicht in der if zu !!!!
        } else {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    },
                         setCookie(cname, cvalue, exdays) {
                      const d = new Date();
                      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
                      let expires = "expires="+ d.toUTCString();
                      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
                    },
                     getCookie(cname) {
                      let name = cname + "=";
                      let decodedCookie = decodeURIComponent(document.cookie);
                      let ca = decodedCookie.split(';');
                      for(let i = 0; i <ca.length; i++) {
                        let c = ca[i];
                        while (c.charAt(0) == ' ') {
                          c = c.substring(1);
                        }
                        if (c.indexOf(name) == 0) {
                          return c.substring(name.length, c.length);
                        }
                      }
                      return "";
                    },
    submitLogin() {

      const name = document.getElementById("nameLogin").value;
      const password = document.getElementById("passwordLogin").value;
      const vm = this;

      axios.post('http://localhost:3000/login', {
        name: name,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        if(response.data.user_id > 0) {

          
          vm.setCookie("token", response.data.token, 30);
          vm.setCookie("userId", response.data.user_id, 30);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.user_id);


          vm.$router.push('/home');// auf webseite navigieren!
        }
        else{ 
          alert('Falscher Benutzername oder Falsches Passwort');// Fehlermeldung angeben
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    },
   },
  mounted() {

    let token = this.getCookie("token");
    let userId = this.getCookie("userId");

    if (token && userId) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId',userId);
      this.$router.push('/home');// auf webseite navigieren!
    }

    const loginLink = document.querySelector('.loginLink a');
    const signUpLink = document.querySelector('.signupLink a');

    loginLink.addEventListener('click', this.openLoginCard);
    signUpLink.addEventListener('click', this.openSignUpCard);
  },
    beforeUnmount() {
    const loginLink = document.querySelector('.loginLink a');
    const signUpLink = document.querySelector('.signupLink a');

    loginLink.removeEventListener('click', this.openLoginCard);
    signUpLink.removeEventListener('click', this.openSignUpCard);
  },


};

</script >

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


body {
    
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.containerFrontPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-top: 100px;
}

.boxPicture {
    margin-bottom: 20px;
    
}

img {
    width: 25%;
    height: auto;
     box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.2),
    5px 5px 15px rgba(0, 0, 0, 0.3),
    -5px -5px 15px rgba(255, 255, 255, 0.1);
    border: 6px double rgb(201, 83, 20);
    border-top-left-radius: 12px;
   
} 

h1 {
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}

h1 span {
    font-size: 40px;
    color: rgb(201, 83, 20);
    text-decoration: underline;
}

p {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-frontPage {
  width: 200px;
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  margin: 10px;
}



.btn-frontPage:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.btn-frontPage:hover {
  background-color: #2c974b;
}

.btn-frontPage:focus {
  box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
  outline: none;
}

.btn-frontPage:disabled {
  background-color: #94d3a2;
  border-color: rgba(27, 31, 35, .1);
  color: rgba(255, 255, 255, .8);
  cursor: default;
}

.btn-frontPage:active {
  background-color: #298e46;
  box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}


.loginCard {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background: #3c3d42;
    background: linear-gradient(0deg, #f6f8e2 0%, #e0ddca 100%);
    border-radius: 10px;
   
}

.loginCard h1 {
    padding: 0 0 20px 0;
    border-bottom: 2px solid black;
}

.loginCard h4 {
    position: absolute;
    top: -3%;
    right: 5%;
}

.loginCard h4:hover {
    cursor: pointer;
    color: rgb(39, 28, 28);
}

.loginCard form {
    padding: 20px 40px;
    box-sizing: border;
}


 .txt_loginCard {
    position: relative;
    border-bottom: 2px solid black;
    margin: 30px 0;
}

.txt_loginCard input {
    width: 70%;
    padding: 0 5px;
    height: 40px;
    font-size: 16px;
    border: none;
    background: none;
    outline: none;
}

.txt_loginCard label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
    transition: .5s;
}

.txt_loginCard span::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    width: 0%;
    height: 5px;
    background-color: rgb(178, 22, 8);
    transition: .5s;

}

.txt_loginCard input:focus ~ label,
.txt_loginCard input:valid ~ label{
    top: -5px;
    color: rgb(178, 22, 8);
}

.txt_loginCard input:focus ~ span::before,
.txt_loginCard input:valid ~ span::before{
  width: 100%;
}

.pass {
    margin: -5px 0 20px 5px;
    cursor: pointer;
    font-size: 18px;
}

.pass:hover {
    text-decoration: underline;
}


.btn-Logincard {
  width: 200px;
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: block; /* Ändere display auf block */
  align-items: center;
  justify-content: center;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  margin: 0 auto; 
}


.btn-Logincard:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.btn-Logincard:hover {
  background-color: #2c974b;
}

.btn-Logincard:focus {
  box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
  outline: none;
}

.btn-Logincard:disabled {
  background-color: #94d3a2;
  border-color: rgba(27, 31, 35, .1);
  color: rgba(255, 255, 255, .8);
  cursor: default;
}

.btn-Logincard:active {
  background-color: #298e46;
  box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}


.signupLink {
    margin: 30px 0 ;
    font-size: 16px;
}

.signupLink a {
    color: black;
    margin: 0 20px;
}





.signUpCard {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background: #3c3d42;
    background: linear-gradient(0deg, #f6f8e2 0%, #e0ddca 100%);
    border-radius: 5px;
    

}


.signUpCard h1 {
    padding: 0 0 20px 0;
    border-bottom: 2px solid black;
}

.signUpCard h4 {
    position: absolute;
    top: -3%;
    right: 5%;
}

.signUpCard h4:hover {
    cursor: pointer;
    color: rgb(39, 28, 28);
}

.signUpCard form {
    padding: 20px 40px;
    box-sizing: border;
}

.txt_signUpCard {
    position: relative;
    border-bottom: 2px solid black;
    margin: 30px 0;
}

.txt_signUpCard input {
    width: 70%;
    padding: 0 5px;
    height: 40px;
    font-size: 16px;
    border: none;
    background: none;
    outline: none;
}

.txt_signUpCard label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
    transition: .5s;
}

.txt_signUpCard span::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    width: 0%;
    height: 5px;
    background-color: rgb(178, 22, 8);
    transition: .5s;

}

.txt_signUpCard input:focus ~ label,
.txt_signUpCard input:valid ~ label{
    top: -5px;
    color: rgb(178, 22, 8);
}

.txt_signUpCard input:focus ~ span::before,
.txt_signUpCard input:valid ~ span::before{
  width: 100%;
}


.btn-signUpCard {
  width: 200px;
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: block; /* Ändere display auf block */
  align-items: center;
  justify-content: center;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  margin: 0 auto; 
  margin-top: 5px;
}


.btn-signUpCard:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.btn-signUpCard:hover {
  background-color: #2c974b;
}

.btn-signUpCard:focus {
  box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
  outline: none;
}

.btn-signUpCard:disabled {
  background-color: #94d3a2;
  border-color: rgba(27, 31, 35, .1);
  color: rgba(255, 255, 255, .8);
  cursor: default;
}

.btn-signUpCard:active {
  background-color: #298e46;
  box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}

.loginLink {
    margin: 30px 0 ;
    font-size: 16px;
}

.loginLink a {
    color: black;
    margin: 0 20px;
}

.positionOfCheckbox {
    position: absolute;
    left: 10%;
}



.signUpCard p {
    font-size: 12px;
}

a {
  color: black;
   
}

i {
  position: fixed;
  bottom: 20px;
  right: 40px;
  font-size: 45px; 
  color: rgb(60, 202, 60);
  cursor: pointer;
}

</style>
