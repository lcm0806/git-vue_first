<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newTask"
        @keyup.enter="addDbTask"
        class="col"
        bg-color="white"
        filled
        aria-placeholder="Add task"
        dense
      >
        <template v-slot:append>
          <q-btn @click="addDbTask" round dense flat icon="add"></q-btn>
        </template>
      </q-input>
    </div>

    <!--reset btn-->
    <q-btn label="reset" @click="resetDb"></q-btn>
    <!--list-->
    <q-list class="bg-white" separator bordered>
      <q-item
        v-for="item in tasks"
        :key="item.title"
        @click="item.done = item.done == 'Y' ? 'N' : 'Y'"
        :class="{ 'done bg-blue-1': item.done == 'Y' }"
        v-ripple
        clickable
      >
        <q-item-section avatar>
          <q-checkbox
            v-model="item.done"
            color="primary"
            class="no-pointer-event"
            true-value="Y"
            false-value="N"
            dense
          ></q-checkbox>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.title }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="item.done == 'Y'" side>
          <q-btn
            flat
            round
            dense
            color="primary"
            icon="edit"
            @click.stop="openDialog(item)"
          >
          </q-btn>
        </q-item-section>
        <q-item-section v-if="item.done == 'Y'" side>
          <q-btn
            flat
            round
            dense
            color="red"
            icon="delete"
            @click.stop="removeDBItem(item)"
          ></q-btn>
        </q-item-section>
      </q-item>
      <!--https://quasar.dev/vue-directives/intersection#intersection-api  //observed element-->
      <div v-intersection="onIntersection" v-if="tasks.length"></div>
    </q-list>
    <!--no list-->
    <div v-if="!tasks.length" class="no-tasks absolute-center">
      <q-icon name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">No tasks</div>
    </div>
    <DialogCustom
      ref="dialog"
      :edit-task="editTask"
      :origin="origin"
      @onInput="editDBTodo"
    >
    </DialogCustom>
  </q-page>
</template>

<script>
import useTodoStore from "src/stores/Dbtodo";
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";
import todoApi from "src/apis/todoApi";
import DialogCustom from "components/DialogCustom.vue";

export default defineComponent({
  name: "Todo",
  title: "DB Todo list",
  components: { DialogCustom },
  data() {
    return {
      newTask: "",
      origin: null,
      editTask: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    ...mapState(useTodoStore, ["tasks"]),
  },
  methods: {
    ...mapActions(useTodoStore, ["resetDb","fetchData","removeDBItem","editTodo"]),
    //추가
    async addDbTask() {
      if (!this.newTask) {
        this.$refs.list.focus(); //포커스 외부로 돌림
      }
      const payload = {
        title: this.newTask,
      };
      //저장
      const result = await todoApi.create(payload);
      if (result.status == 200) {
        if (result.data.id) {
          // front
          this.tasks.unshift({
            id: result.data.id,
            title: this.newTask,
            done: "N",
          });
          this.totalCount++;
        }
        await this.$q.notify({
          message: `${this.newTask} 추가하셨습니다`,
          icon: "home",
          color: "primary",
        });
        this.newTask = "";
      }
    },

    //intersection
    async onIntersection(entry) {
      if (entry.isIntersecting) {
        this.$q.loading.show();
        await this.fetchData();
        this.$q.loading.hide();
      }
    },
    //다이얼로그 열기
    openDialog(item) {
      this.$refs.dialog.dialog = true;
      this.editTask = item;
      this.origin = this.editTask.title;
    },
  },
});
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
.no-tasks {
  opacity: 0.5;
}
</style>