<template>
    <div>
      <h1>About Page</h1>
      <p>This is the about page!</p>
      <v-btn color="primary" @click="$emit('navigate', 'Home')">
      Go
    </v-btn>
    </div>
  </template>
  
  <script>
  export default {
    name: 'About',
  };
  </script>