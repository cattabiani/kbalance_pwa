<template>
  <div id="app">
    <component :is="currentPage" @navigate="navigate" />
  </div>
</template>

<script>
import Home from './components/Home.vue';
import About from './components/About.vue';

export default {
  name: 'App',
  components: {
    Home,
    About,
  },
  data() {
    return {
      currentPage: 'Home',
    };
  },
  methods: {
    navigate(page) {
      this.currentPage = page;
    },
  },
};
</script>

<!-- <template>
  <v-container>
    <v-row align="center" justify="space-between" class="mb-1">
      <h1>kNote</h1>
      <v-btn icon @click="addNote">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <v-list lines="one">
      <v-list-item v-for="(note, index) in notes" :key="index">
        <v-row align="center" justify="space-between" class="mr-2 ml-2">
          <v-text-field
            v-model="note.text"
            align="center"
            placeholder="new note"
            variant="outlined"
            class="mr-2 mt-5"
          >
          </v-text-field>
          <v-btn icon @click="deleteNote(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-row>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>

import { ref, onMounted, onBeforeUnmount, computed } from "vue";

// Reactive variables
const notes = ref([]);


// Function to add a note
const addNote = () => {
  notes.value.push({ text: ""});
};

// Function to delete a note
const deleteNote = (index) => {
  notes.value.splice(index, 1);
};

// Function to save notes to localStorage
const saveToLocalStorage = () => {
  localStorage.setItem("notes", JSON.stringify(notes.value));
};

// Save data when the app becomes inactive
const saveToLocalStorageIfHidden = () => {
  if (document.visibilityState === "hidden") {
    saveToLocalStorage();
  }
};

// Retrieve stored notes
onMounted(() => {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notes.value = JSON.parse(storedNotes);
  }
  document.addEventListener("visibilitychange", saveToLocalStorageIfHidden);
  window.addEventListener("beforeunload", saveToLocalStorage);
});

onBeforeUnmount(() => {
  document.removeEventListener("visibilitychange", saveToLocalStorageIfHidden);
  window.removeEventListener("beforeunload", saveToLocalStorage);
});
</script> -->


