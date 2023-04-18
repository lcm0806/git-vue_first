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
    </q-item>
    <q-item-section v-if="item.done=='Y'" side>
  <q-btn
    flat
    round
    dense
    color="red"
    icon="delete"
    @click.stop="removeItem(item.id)"
  ></q-btn>
</q-item-section>
<!--수정아이콘 // 삭제 아이콘 위에-->
<q-item-section v-if="item.done=='Y'" side>
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
  </q-list>
  <dialog-custom ref="dialog" :edit-task="editTask" :origin="origin" @onInput="editTodo">
</dialog-custom>
</template>

<script>
import DialogCustom from "components/DialogCustom.vue";
export default {
  name: "Todo",
  title: "Todo list",
  components:{DialogCustum},
  data() {
    return {
      newTask: "",
      editTask:null,
      origin:null,
    };
  },
  computed:{
    ...mapState(useTodoStore, ["tasks"]),
  },
  mounted(){
    this.listTodo();
  },
  methods: {
    ...mapActions(useTodoStore, ["insertTodo","removeTodo","listTodo","editTodo"]),
    async addTask() {
      if(this.newTask){
        //store action 저장
        this.insertTodo(this.newTask);
        await this.$q.notify({
            message: `${this.newTask} 추가하셨습니다`,
            icon:"home",
            color: "primary",
        });
        this.newTask="";
      }else{
        await this.$q.notify({
              message: `내용은 필수입력입니다`,
              icon:"warning",
              color: "red",
                });
            }
        },
        removeItem(id){
      this.removeTodo(id);
      this.newTask="";
        },
        openDialog(item) {
	      this.$refs.dialog.dialog = true; // 자식 컴포넌트의 dialog 변수 접근 및 값변경
	      this.editTask = item;  // 현재 todo 객체 보냄
	      this.origin = this.editTask.title; // 현재 todo객체의 타이틀 보냄 / 취소시 이용
	    },
    }
}
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