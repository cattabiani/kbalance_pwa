<template>
  <v-container>
    <v-row align="center" justify="space-between" class="mb-1">
      <h2>Edit Transaction</h2>
      <v-btn color="primary" @click="navigateToTransactions">
        <v-icon>mdi-wallet</v-icon>
      </v-btn>
    </v-row>
    <v-text-field
      v-model="localData.text"
      align="center"
      label="Description"
      placeholder="Description"
      variant="solo"
    ></v-text-field>
    <div class="centered-input-container">
      <input
        v-maska="'0.99'"
        v-model="maskedAmount"
        placeholder="0.00"
        data-maska-tokens="0:\d:multiple|9:\d:optional"
        @blur="updateAmount"
        class="outlined-input"
      />
    </div>
    <v-radio-group v-model="localData.payer">
      <v-list lines="one">
        <v-list-item v-for="(person, index) in people" :key="index">
          <v-row
            align="center"
            justify="space-between"
            class="mr-2 ml-2 mb-2 mt-2"
          >
            <v-col cols="auto">
              <v-radio :value="index" />
            </v-col>
            <v-col class="d-flex align-center">
              <v-card variant="elevated" width="100%" location="center" class="mt-5">
                <div class="text-center">{{ person.text }}</div>
              </v-card>
            </v-col>
            <v-col cols="auto">
              <v-selection-control-group v-model="localData.people[index]"
                ><v-checkbox class="mt-5"
              /></v-selection-control-group>
            </v-col>
            <v-col cols="auto">
              <v-card variant="elevated" width="100%" location="center" class="mt-5">
                <div class="text-center">
                  {{ (localData.owed[index] / 100).toFixed(2) }}
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-radio-group>
    <v-row align="center" justify="center" class="mt-2">
      <v-btn @click="handleOk" color="primary" icon class="mr-5">
        <v-icon>mdi-check-circle</v-icon>
        <!-- OK icon -->
      </v-btn>
      <v-btn @click="handleCancel" color="red" icon class="ml-5">
        <v-icon>mdi-cancel</v-icon>
        <!-- Cancel icon -->
      </v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { vMaska } from "maska/vue";

const emit = defineEmits(["navigate"]);

// Define props
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// Create a local copy of the data to edit
// const localData = ref(props.data);
const localData = ref(props.data);
const maskedAmount = ref();
const people = ref([]);

// watch(
//   localData, // Watch the entire localData object
//   (newVal) => {
//     console.log(localData.value); // Log the entire localData object
//   },
//   { deep: true, immediate: true }, // Deep watch for nested properties
// );
watch(
  () => localData.value.amount, // Only watch the 'amount' field
  (newVal) => {
    if (newVal === 0) {
      maskedAmount.value = ""; // Set to empty string if amount is 0
    } else {
      maskedAmount.value = (newVal / 100).toFixed(2); // Converts to "12.34" format
    }
  },
  { immediate: true },
);

watch(
  () => [localData.value.amount, localData.value.people],
  ([newAmount, newPeople]) => {
    const trueCount = newPeople.filter(Boolean).length; // Count of `true` values in componentB
    if (trueCount == 0 || newAmount == 0) {
      localData.value.owed = Array(people.value.length).fill(0);
      return;
    }

    const partialFloor = Math.floor(newAmount / trueCount);
    let mod = newAmount % trueCount;

    console.log(partialFloor, mod);

    for (let i = newPeople.length - 1; i >= 0; --i) {
      if (newPeople[i]) {
        localData.value.owed[i] = partialFloor;
        if (mod > 0) {
          ++localData.value.owed[i];
          --mod;
        }
      } else {
        localData.value.owed[i] = 0;
      }
    }
  },
  { deep: true }, // Deep watch to capture changes within the array
);

const handleOk = () => {
  saveToLocalStorage();
  navigateToTransactions();
};

const handleCancel = () => {
  navigateToTransactions();
};

const updateAmount = () => {
  const parsedValue = parseFloat(maskedAmount.value.replace(/[^0-9.]/g, ""));
  if (!isNaN(parsedValue)) {
    localData.value.amount = Math.round(parsedValue * 100);
  } else {
    localData.value.amount = 0;
  }
};

defineExpose({ maskedAmount });

const navigateToTransactions = () => {
  // saveToLocalStorage();
  // Emit the navigation event
  emit("navigate", "Transactions");
};

const saveToLocalStorage = () => {
  console.log("saveToLocalStorage");
  localStorage.setItem(localData.value.id, JSON.stringify(localData.value));
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
  console.log(people.value);
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

<style scoped>
.centered-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px; /* Optional padding around input */
}

.outlined-input {
  text-align: center; /* Aligns text to the right */
  border: 2px solid #ccc; /* Outline color */
  padding: 10px; /* Padding inside the frame */
  border-radius: 8px; /* Rounded corners */
  outline: none; /* Remove default outline */
  width: 80%; /* Full width within container */
  /* max-width: 300px;            Optional max-width for better scaling */
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1); /* Optional shadow for depth */
  /* font-size: 1em;              Responsive font size */
}
</style>
