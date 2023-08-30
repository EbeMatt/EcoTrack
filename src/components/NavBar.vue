<template>

<div>
    <nav>
      <div class="logo">EcoTrack</div>
      <ul>
        <li>
          <router-link to="../home">Home</router-link>
        </li>
        <li>
          <router-link to="../mydate">Meine Daten</router-link>
        </li>
        <li>
          <a href="#">Diagramme</a>
          <ul>
            <li><a href="#">Haushalt</a></li>
            <li><a href="#">Auto</a></li>
            <li><a href="#">Essen</a></li>
            <li>
              <router-link to="../dashboardKlima">Statistiken</router-link>
            </li>
            <li>
              <a href="#">Rechner<span class="fa fa-plus"><strong>+</strong></span></a>
              <ul>
                <li><a href="#">Spritverbrauch</a></li>
                <li><a href="#">CO2-Verbrauch</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="../savetipps">Tipps zum Sparen</router-link>
        </li>
        <li><a href="#">Meine Erfolge</a></li>
      </ul>
    </nav>
    </div>


</template>


<script>

export default {
    name: 'NavBar',
}

</script>

<style>

nav {
  
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  background: #3c3d42;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 999;
}
    
    
    

nav::after {
    content: '';
    clear: both;
    display: table;
}

nav .logo {
  
    float: left;
    color:rgb(201, 84, 20);
    font-size: 40px;
    font-weight: 600;
    line-height: 100px;
    padding-left: 60px;
}

nav ul {
    float: right;
    list-style: none;
    margin-right: 40px;
    position: relative;
    

}

nav ul li {
   float: none;
   display: inline-block;
   background: #3c3d42;
   margin: 0 10px;
}

nav ul li a {
    text-decoration: none;
    line-height: 70px;
    font-size: 20px;
    pad: 8px 15px;
    color: white;
}

nav ul li a:hover {
    color: #f6f8e2;
    text-decoration:  underline 3px solid #f6f8e2;
                
}



nav ul ul {
    position: absolute;
    top: 90px;
    opacity: 0;
    visibility: hidden;
    transition: .3s;
    
    
}

nav ul li:hover > ul {
    top: 70px;
    opacity: 1;
    visibility: visible;
    
}

nav ul ul li {
    position: relative;
    margin: 0px;
    width: 150px;
    float: none;
    display: list-item;
    text-align: center;
    border-bottom: 2px solid #f6f8e2;
}

nav ul ul li a {
    line-height: 50px;
    
}

nav ul ul ul li {
    position: relative;
    top: -70px;
    left: 150px;
}

.fa-plus {
    margin-left: 40px;
    font-size: 15px;
   color: white;
}



</style>