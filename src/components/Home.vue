<template>
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <v-btn color="primary" @click="$emit('navigate', 'About')">
      Go
    </v-btn>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
  };
  </script>
  