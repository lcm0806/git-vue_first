import { defineStore } from "pinia";
import { uid } from "quasar";
import { LocalStorage } from 'quasar'

export default defineStore("useTodo", {

  state:()=>({
    tasks:[],
  }),

  getters : {

  },

  actions: {
    insertTodo(title){
        if(this.tasks){
          this.tasks.unshift({
            id: uid(),
            title,
            done:'N'
          });
        }else{
          this.tasks=[];
          this.tasks.push({
            id: uid(),
            title,
            done:'N'
          })
        }
  
        LocalStorage.set("todo", this.tasks);
      },
  }
})