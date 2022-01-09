import { useStore } from '@/store';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from "@vuelidate/core";
import { required, minLength, } from "@vuelidate/validators";
import { helpers } from "@vuelidate/validators";
import { validAccountId } from '@/misc/validUserAccID';
import { validKey } from '@/misc/validKey';

export default function(){

  const router = useRouter()

  const submitData = reactive({
    userAccountId:'',
    privateKey:''
  })
  
  const rules = {
    userAccountId: validAccountId, // Matches state.firstName
    privateKey: validKey(96), // Matches state.lastName
  }
  const v$ = useVuelidate(rules, submitData)

  const submit = async () => {
    const isFormCorrect = await v$.value.$validate()
      // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
      if (!isFormCorrect) return
      // actually submit form
    await useStore().submitLogin({accountId:submitData.userAccountId,privateKey:submitData.privateKey},router);
    submitData.userAccountId = "";
    submitData.privateKey = ""
  }

  const disabled = computed(()=>{
    return v$.value.userAccountId.$error || v$.value.privateKey.$error
  })  
  const hasError = ref(false)
  const errorMessage = ref('')
  const login = async () => {
    hasError.value = false
    try{
      await submit()
    }catch(err:any){
      console.log({err});
      let eC = err.response?.status || 500
      hasError.value = true
      if (eC === 404 || eC === 401 ) errorMessage.value = 'Invalid credentials'
      else if(err.name === 'BadKeyError') errorMessage.value = 'Invalid key'
      else errorMessage.value = 'Oops! something went wrong try again later'
    }
  }
  return {submitData,submit:login,v$,disabled:disabled,hasError,errorMessage}
}