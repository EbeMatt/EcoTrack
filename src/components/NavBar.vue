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
          <ul>
            <li><router-link to="../datapersontable">Datenblatt</router-link></li>
          </ul>
        </li>
        <li>
          <a href="#">Diagramme</a>
          <ul>
            
            <li>
              <router-link to="../dashboardKlima">Statistiken</router-link>
            </li>

          </ul>
        </li>
        <li>
          <router-link to="../savetipps">Tipps zum Sparen</router-link>
        </li>
        <li>
          <a href="#">Meine Erfolge</a>
          <ul>
            <li>
              <router-link to="../gamecenter">Eco Challenge</router-link>
            </li>
          </ul>
        </li>
        <li><a href="#" @click="logout()">Log out</a></li>
      </ul>
    </nav>
    </div>


</template>


<script>

export default {
    name: 'NavBar',
    methods: {
  // Methode zum Setzen eines Cookies
  setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  },
  logout() {
    // löscht den Token-Cookie und den UserID-Cookie
    this.setCookie('token', '', -1);
    this.setCookie('userId', '', -1);

    // löscht auch die Token- und UserID-Einträge aus dem localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    // navigiert zur gewünschten Seite
    this.$router.push('/ecotrack');
  }
}
};

</script>

<style>

nav {
  
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  
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