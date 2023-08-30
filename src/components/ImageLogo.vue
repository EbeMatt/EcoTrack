<template>



<div class="imagePosition">
    <img src="../assets/Logo1.png">
    </div>


</template>

<script>

export default {
    name: 'ImageLogo',
}

</script>

<style>

.imagePosition{
    position: absolute;
    top: 30%;
    left: 25%;
    transform: translate(-50%, -50%);
}

img {
    width: 32%;
    height: auto;
     box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.2),
    5px 5px 15px rgba(0, 0, 0, 0.3),
    -5px -5px 15px rgba(255, 255, 255, 0.1);
    border: 6px double rgb(201, 83, 20);
    border-top-left-radius: 12px;
    
   
} 


</style>