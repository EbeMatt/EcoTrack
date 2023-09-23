<template>
    <div class="container">
        <h4>Berechnungsgrundlage:</h4>
        <p>Die von hier gezeigten Werte und Formeln dienen zum Berechnen des C02-Ausstoßes.</p>
    </div>
</template>


<script>
 export default {
    name: 'BerechnungsGrundlageFahrzeug'
 }


</script>

<style scoped>


.container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  
    width: 100%;
    border-radius: 5px;
    
    

}


h4 {
  margin-bottom: 10px; 
  font-size: 18px; 
}

p {
  margin-top: 0; 
  font-size: 16px; 
}
</style>