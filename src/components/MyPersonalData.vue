<template>
    <div class="container-personaldata">
      <img class="person-image" src="../assets/Person.png" alt="">
      <h1>Persönliche Daten</h1>
      <div class="box-field">
        <h4 @click="closePersonalData">X</h4>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Name" autocomplete="off">
        <label for="birthday">Geburtstag:</label>
        <input type="date" id="birthday" name="birthday" placeholder="Geburtstag">
        <label for="gender">Geschlecht:</label>

         <select id="gender">
           <option value="männlich">männlich</option>
           <option value="weiblich">weiblich</option>
           <option value="diverse">diverse</option>
         </select><br>

         <label for="work">Arbeit: (Pal-Faktor)</label>
         <input type="text" name="work" id="work" placeholder="Arbeit">

         <button class="save-button">Speichern</button>

    </div>

</div>



</template>

<script>
export default {
  name: 'MyPersonalData',
  methods: {
    closePersonalData() {
      this.$emit('closePersonalData');
    }
  }
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

.person-image {
  position: absolute;
  width: 28%;
  height: auto;
  left: 50px;
  border: none;
  
}




.container-personaldata {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999; 
  background: #4b7432;
    }

.box-field h4 {
    position: absolute;
    color: black;
    top: 170px;
    right: 580px;
}

.box-field h4:hover {
    color: rgb(39, 28, 28);
    cursor: pointer;
}


.box-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #3c3d42;
    background: linear-gradient(0deg, #f6f8e2 0%, #e0ddca 100%);
    border: 5px outset black;
    padding: 10px;
    width: 30%;
    height: auto;
    border-radius: 10px;
}

.box-field input {
  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: 2px solid #2ea44f; /* Aktualisierte Border-Farbe */
  margin-bottom: 10px;
  margin: 10px;
  text-align: center;
  font-size: 20px;
}


    .box-field select {
  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: 2px solid #2ea44f; /* Aktualisierte Border-Farbe */
  margin-bottom: 10px;
  margin: 10px;
  text-align: center;
  font-size: 20px;
}


    

    .box-field label {
        font-size: 20px;
        font-weight: bold;
        margin: 10px;
    }

    .save-button {
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


.save-button:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.save-button:hover {
  background-color: #2c974b;
}

.save-button:focus {
  box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
  outline: none;
}

.save-button:disabled {
  background-color: #94d3a2;
  border-color: rgba(27, 31, 35, .1);
  color: rgba(255, 255, 255, .8);
  cursor: default;
}

.save-button:active {
  background-color: #298e46;
  box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}

h1 {
    border: 5px outset black;
}






</style>