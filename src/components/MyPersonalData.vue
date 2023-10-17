<template>
    <div class="container-personaldata">
      <div>
        <NavBar />
      </div>
      
      <div class="box-field">
        <i class='bx bxs-id-card'></i>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Name" autocomplete="off">
        <label for="birthday">Geburtstag:</label>
        <input type="date" id="birthday" name="birthday" placeholder="Geburtstag">
        <label for="gender">Geschlecht:</label>

         <select id="gender">
           <option value="male">männlich</option>
           <option value="female">weiblich</option>
           <option value="diverse">diverse</option>
         </select><br>

         <label for="work">Arbeit: (Pal-Faktor)</label>
         <input type="text" name="work" id="work" placeholder="Arbeit">

         <button class="save-button" @click="saveData()">Speichern</button>
         

    </div>
    <button class="back-button" @click="closePersonalData">Zurück zu Meine Daten</button>


    <div class="info">
    <div class="list">
      <ul>
        <li>Bitte füllen Sie alle Inpufelder aus.</li>
        <li>Die von Ihnen angegebenen Daten werden Ihnen später im Datenblatt angezeigt.</li>
        
      </ul>
    </div>


    <div class="table-palFaktor">
    <h2>PAL-Faktoren und Aktivitätsniveaus</h2>
    <table>
      <thead>
        <tr>
          <th>PAL-Faktor</th>
          <th>Aktivitätsniveau</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0,95</td>
          <td>Schlafen</td>
        </tr>
        <tr>
          <td>1,2</td>
          <td>Nur sitzend oder liegend (z. B. lesen, fernsehen)</td>
        </tr>
        <tr>
          <td>1,4-1,5</td>
          <td>Fast ausschließlich sitzend, wenig Freizeitaktivitäten (z. B. Schreibtischtätigkeit)</td>
        </tr>
        <tr>
          <td>1,6-1,7</td>
          <td>Überwiegend sitzend, mit zusätzlichen stehenden/gehenden Tätigkeiten (z. B. Kraftfahrer, Studenten, Laboranten)</td>
        </tr>
        <tr>
          <td>1,8-1,9</td>
          <td>Überwiegend stehende/gehende Tätigkeit (z. B. Verkäufer/innen, Kellner, Handwerker, Hausfrau/Hausmann)</td>
        </tr>
        <tr>
          <td>2,0-2,4</td>
          <td>Körperlich anstrengende berufliche Tätigkeit (z. B. Bergleute, Landwirte, Waldarbeiter, Hochleistungssportler)</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

</div>



</template>


<script>
import axios from 'axios';
import { parseToken } from './tokenUtils';
import NavBar from './NavBar.vue';

export default {
  name: 'MyPersonalData',
  components: {
    NavBar,
  },
  methods: {
    closePersonalData() {
      this.$emit('closePersonalData');
    },
    async saveData() {
      const birthday = document.getElementById("birthday").value;
      const gender = document.getElementById("gender").value;
      const work = document.getElementById("work").value;

      const token = localStorage.getItem('token');
      const decodedToken = parseToken(token);

      axios.post('http://localhost:3000/savePersonalData', {
        userId: decodedToken.id,
        birthday: birthday,
        gender: gender,
        work: work,
      })
      .then(function (response) {
        console.log(response);
        if(response.data.success) {
          alert('Erfolgreich gespeichert');
        } else {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
  background-image: url('../assets/Background13.png');
    }

    i {
      font-size: 50px;
      margin-bottom: 10px;
      color: #22bc1a;
    }
  


.box-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 750px;
    background: #3c3d42;
    background: linear-gradient(0deg, #f6f8e2 0%, #e0ddca 100%);
    padding: 10px;
    width: 25%;
    height: auto;
    border-radius: 10px;
    margin-top: 100px;
}

.box-field input, .box-field select {
  width: 100%; 
  max-width: 300px; 
  height: 25px;
  border-radius: 5px;
  border: 2px solid #2ea44f;
  margin: 10px;
  text-align: center;
  font-size: 16px;
}


    

    .box-field label {
        font-size: 20px;
        font-weight: bold;
        margin: 10px;
        margin-bottom: -5px;
        
    }

    .save-button {
  width: 100%; 
  max-width: 200px; 
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: block;
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


.back-button {
  position: absolute;
  bottom: 100px;
  left: 10px; 
  background-color: #85b882;
  color: black; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 10px 20px; 
  font-size: 12px;
  transition: background-color 0.3s; 
}


.back-button:hover {
  background-color: #7d861c; 
}

.list {
  
  background-color: #85b882;
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

.table-palFaktor h2 {
  text-align: center;
  margin-bottom: 10px;
}

.table-palFaktor {
  
  background-color: #85b882;
  color: black;
  margin-top: 20px; 
  border-radius: 5px;
}

.table-palFaktor table {
  width: 100%; 
  border-collapse: collapse;
}

.table-palFaktor th, .table-palFaktor td {
 
  padding: 10px;
  text-align: center;
}

.table-palFaktor thead {
  background-color: #70a26e;
  color: white;
}

.info {
 position: absolute;
 top: 200px;
 right: 20px;
}


</style>