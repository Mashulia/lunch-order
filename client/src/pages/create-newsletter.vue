<script setup lang="ts">
const name = ref("name");
const phone = ref("phone");
const email = ref("email");
const select = ref("select");
const checkbox = ref("checkbox");

const items = ref(["Item 1", "Item 2", "Item 3", "Item 4"]);

const submit = (values) => {
  alert(JSON.stringify(values, null, 2));
};
</script>

<template>
  <div>
    <form @submit.prevent="submit">
      <v-text-field v-model="name" :counter="10" label="Name"></v-text-field>

      <v-text-field
        v-model="phone"
        :counter="7"
        :error-messages="phone"
        label="Phone Number"
      ></v-text-field>

      <v-text-field v-model="email" label="E-mail"></v-text-field>

      <v-select v-model="select" :items="items" label="Select"></v-select>

      <v-checkbox
        v-model="checkbox"
        label="Option"
        type="checkbox"
        value="1"
      ></v-checkbox>

      <v-btn class="me-4" type="submit"> submit </v-btn>

      <v-btn> clear </v-btn>
    </form>
  </div>
</template>
