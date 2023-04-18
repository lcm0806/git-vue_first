<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newTask"
        @keyup.enter="addTask"
        class="col"
        bg-color="white"
        filled
        aria-placeholder="Add task"
        dense
      >
        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add"></q-btn>
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Todo",
  title: "Todo list",
  data() {
    return {
      newTask: "",
    };
  },
  methods: {
    async addTask() {

    },
  }
}
</script>

<style>

</style>