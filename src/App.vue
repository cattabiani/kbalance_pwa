<template>
  <div id="app">
    <component
      :is="components[currentPage]"
      @navigate="navigate"
      @navigate-with-data="navigateWithData"
      :data="currentData"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import People from "./components/People.vue";
import Transactions from "./components/Transactions.vue";
import EditTransaction from "./components/EditTransaction.vue";

// Component registration
const components = {
  People,
  Transactions,
  EditTransaction,
};

// Reactive data
const currentPage = ref("Transactions");
const currentData = ref(null);

// Navigation methods
const navigate = (page) => {
  currentPage.value = page;
  currentData.value = null;
};

const navigateWithData = ({ page, data }) => {
  currentPage.value = page;
  currentData.value = data;
};
</script>
