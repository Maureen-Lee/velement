<template>
    <div>
         <div> Parent bound v-model is: {{ model  }}</div>
         <button @click="update"> Increment</button>
</div>
</template>

<script setup>
const model = defineModel()

function update(){
    model.value++
}

</script>
