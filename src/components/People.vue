<template>
  <v-container>
    <v-row align="center" justify="space-between" class="mb-1">
      <h1>People</h1>
      <v-btn icon @click="addPerson">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn color="primary" @click="navigateToTransactions">
        <v-icon>mdi-wallet</v-icon>
      </v-btn>
    </v-row>
    <v-list lines="one">
      <v-list-item v-for="(person, index) in people" :key="index">
        <v-row align="center" justify="space-between" class="mr-2 ml-2">
          <v-text-field
            v-model="person.text"
            align="center"
            placeholder="New Person"
            label="Name"
            variant="solo"
            class="mr-2 mt-5"
          >
          </v-text-field>
          <v-btn icon @click="deletePerson(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-row>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
const emit = defineEmits(["navigate"]);

const people = ref([]);

// Function to add a person
const addPerson = () => {
  people.value.push({ text: "" });
};

// Function to delete a person
const deletePerson = (index) => {
  people.value.splice(index, 1);
};

const navigateToTransactions = () => {
  saveToLocalStorage();
  // Emit the navigation event
  emit("navigate", "Transactions");
};

// Function to save notes to localStorage
const saveToLocalStorage = () => {
  localStorage.setItem("people", JSON.stringify(people.value));
};

// Save data when the app becomes inactive
const saveToLocalStorageIfHidden = () => {
  if (document.visibilityState === "hidden") {
    saveToLocalStorage();
  }
};

// Retrieve stored notes
onMounted(() => {
  const storedPeople = localStorage.getItem("people");
  if (storedPeople) {
    people.value = JSON.parse(storedPeople);
  }
  document.addEventListener("visibilitychange", saveToLocalStorageIfHidden);
  window.addEventListener("beforeunload", saveToLocalStorage);
});

onBeforeUnmount(() => {
  document.removeEventListener("visibilitychange", saveToLocalStorageIfHidden);
  window.removeEventListener("beforeunload", saveToLocalStorage);
});
</script>
