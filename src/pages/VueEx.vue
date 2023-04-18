<template class ="q-pa-md q-qutter-md">
      <q-card-section :class="{active:isActive, 'text-h3': hasError}"> 
      change color
      </q-card-section>
</template>
<script>

import {date} from 'quasar';
export default {
  name:'',
  title:"VueEx",
  components:{},
  data(){
    return{
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed:{
      fullName: {
        get(){
          return this.firstName + ' ' + this.lastName
        },
        set(newValue){
          [this.firstName, this.lastName] = newValue.split(' ')
        }
      }
  },
  watch:{

  },
  mounted(){

  },
  methods:{
   calculateDate(){
    setInterval(() => {
      const timeStamp = Date.now();
      const formattedString = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm");
      this.str = formattedString;
    },1000);
    return this.str;
   }
  },

}
</script>

<style>

</style>