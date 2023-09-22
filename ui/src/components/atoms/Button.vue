<!-- src/components/atoms/Button.vue -->
<template>
    <button :class="btnClass" @click="handleClick">
      <slot></slot>
    </button>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue';
  
  // Definimos las props y emisores de eventos
  const props = defineProps<{ variant: string }>();
  const emit = defineEmits();
  
  // Calculamos la clase del botón en base a la variante
  const btnClass = ref(`btn-${props.variant || 'primary'}`);
  
  // Función para manejar el evento de clic
  const handleClick = (event: Event) => {
    window.console.log('Click en el botón')
    emit('click', event);
  };
  </script>
  
  <style scoped>
  /* Estilos para el botón */
  .btn-primary {
    background-color: blue;
    color: white;
  }
  
  .btn-secondary {
    background-color: grey;
    color: white;
  }
  </style>
  