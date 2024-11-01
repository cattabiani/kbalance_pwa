<template>
  <v-container>
    <v-row align="center" justify="space-between" class="mb-1">
      <h1>Transactions</h1>
      <v-btn icon @click="addItem">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn color="primary" @click="navigateToPeople"
        ><v-icon>mdi-account</v-icon></v-btn
      >
    </v-row>
    <v-list lines="one">
      <v-list-item
        v-for="(id, index) in ids"
        :key="index"
        @click="navigateToEditTransaction(getItem(id))"
      >
        <v-row
          align="center"
          justify="space-between"
          class="mr-2 ml-2 mb-1 mt-1"
        >
          <v-col cols="auto">
            <p>
              {{ new Date(getItem(id).date).toLocaleDateString("en-US", {}) }}
              <span style="margin-left: 20px"></span>
              {{ getItem(id).text || "new transaction" }}
            </p>
          </v-col>
          <v-col cols="auto" class="d-flex align-center" style="gap: 50px">
            <p>{{ (getItem(id).amount / 100).toFixed(2) }}</p>
            <v-btn icon @click.stop="deleteItem(id, index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { v4 as uuidv4 } from "uuid";
const emit = defineEmits(["navigate", "navigate-with-data"]);

const people = ref([]);

// Reactive array of IDs
const ids = ref([]);

// Reactive map (object) mapping IDs to strings
const itemsMap = ref({});

const addItem = () => {
  const key = "item-" + uuidv4();

  // Create the new transaction entry
  const newItem = {
    id: key,
    amount: 0,
    currency: 0,
    description: "",
    payer: 1,
    people: Array(people.value.length).fill(true),
    owed: Array(people.value.length).fill(0),
    date: Date.now(),
  };

  // Add to itemsMap
  itemsMap.value[key] = newItem; // Use direct assignment
  localStorage.setItem(key, JSON.stringify(newItem));

  // Add to ids array
  ids.value.push(key);
};

const getItem = (id) => {
  // Check if the item is already in itemsMap
  let ans = itemsMap.value[id];

  // If the item is not found in itemsMap, retrieve it from localStorage
  if (!ans) {
    const value = localStorage.getItem(id);
    if (value) {
      // Parse the value and store it in itemsMap
      ans = JSON.parse(value);
      itemsMap.value[id] = ans;
    }
  }

  // Return the item, which may be undefined if it doesn't exist
  return ans;
};

const deleteItem = (id, index) => {
  // Delete the entry from itemsMap
  delete itemsMap.value[id];
  localStorage.removeItem(id);
  ids.value.splice(index, 1);
};

const navigateToEditTransaction = (id) => {
  saveToLocalStorage();
  emit("navigate-with-data", { page: "EditTransaction", data: id });
};

const navigateToPeople = () => {
  saveToLocalStorage();
  // Emit the navigation event
  emit("navigate", "People");
};

const saveToLocalStorage = () => {
  // Save the array of IDs to localStorage
  localStorage.setItem("transactions", JSON.stringify(ids.value));
};

// Save data when the app becomes inactive
const saveToLocalStorageIfHidden = () => {
  if (document.visibilityState === "hidden") {
    saveToLocalStorage();
  }
};

const loadFromLocalStorage = () => {
  const storedPeople = localStorage.getItem("people");
  if (storedPeople) {
    people.value = JSON.parse(storedPeople);
  }
  const storedIds = localStorage.getItem("transactions");
  if (storedIds) {
    ids.value = JSON.parse(storedIds);
  }
};

// Retrieve stored notes
onMounted(() => {
  loadFromLocalStorage();
  document.addEventListener("visibilitychange", saveToLocalStorageIfHidden);
  window.addEventListener("beforeunload", saveToLocalStorage);
});

onBeforeUnmount(() => {
  document.removeEventListener("visibilitychange", saveToLocalStorageIfHidden);
  window.removeEventListener("beforeunload", saveToLocalStorage);
});
</script>
