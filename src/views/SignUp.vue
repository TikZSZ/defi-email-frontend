<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import Prompt from "@/components/Prompt.vue";
import useVuelidate from "@vuelidate/core";
import { required, } from "@vuelidate/validators";
import { validAccountId } from "@/misc/validUserAccID";
import InputError from "@/components/InputError.vue";
import { X25519PrivateKey } from "@/misc/cryptography/encryption";
import { validKey } from "@/misc/validKey";
import Error from "@/components/Error.vue";

const prompt = ref(false);

const router = useRouter();

const submitData = reactive({
  name: "",
  userAccountId: "",
  public_key: "",
});


const rules: { [key in keyof typeof submitData]: any } = {
  name: { required },
  userAccountId: validAccountId,
  public_key: validKey(88)
}
const hasError = ref(false)
const errorMessage = ref('')
const v$ = useVuelidate(rules, submitData)

const submit = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return
  prompt.value = true;
};
const disabled = ref(false)

const sign = async (privateKey: string) => {
  disabled.value = true
  hasError.value = false
  try {
    const x25519_public_key = X25519PrivateKey.fromEdd25519PrivateKey(privateKey).publicKey.toString()
    await useStore().submitSignUp(privateKey, { x25519_public_key: x25519_public_key, ...submitData }, router)
  } catch (err:any) {
    disabled.value = false
    let eC = err.response?.status
    hasError.value = true
    if(eC === 403) errorMessage.value = 'User already exists'
    if(eC === 401) errorMessage.value = 'Credentials mismatch'
    console.log(err);
  }
  prompt.value = false;
};
</script>

<template>
  <section class="w-full min-h-screen bg-white">
    <div class="mx-auto max-w-7xl">
      <!-- Prompt -->
      <Prompt v-if="prompt" :sign="sign" :disabled="disabled" />

      <div class="flex flex-col lg:flex-row" v-show="!prompt">
        <!-- Left Div -->
        <div
          class="relative w-full bg-cover lg:w-6/12 xl:w-6/12 bg-gradient-to-r from-white via-white to-gray-100"
        >
          <div
            class="relative flex flex-col items-center justify-center w-full h-full px-10 my-20 lg:px-16 lg:my-0"
          >
            <div class="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
              <div class="relative">
                <p class="mb-2 font-medium text-gray-700 uppercase">Smart SingUp</p>
                <h2
                  class="text-5xl font-bold text-gray-900 xl:text-6xl"
                >Forget About Email and Password</h2>
              </div>
              <p
                class="text-2xl text-gray-700"
              >We've created a simple method for signin/signup without email and password powered by cryptography</p>
              <p
                class="text-xl text-red-400"
              >Note 1: Your private key never leaves the browser all transactions are signed in browser.</p>
              <p
                class="text-xl text-red-400"
              >Note 2: Your private keys are saved in local storage for subsequent use.
              If you don't want that then u can delete the key and you will need to provide it again when required.
              </p>
              <p
                class="text-xl text-red-400"
              >Note 3: Since dMail is in beta stage, currently only testnet accounts are supported</p>
            </div>
          </div>
        </div>
        <!-- Right Div -->
        <div class="w-full bg-white lg:w-6/12 xl:w-6/12">
          <div class="flex flex-col items-start justify-start w-full h-full p-10 lg:p-16 xl:p-24">
            <h4 class="w-full text-3xl font-bold">Signup</h4>
            <p class="text-lg text-gray-500">
              or, if you have an account you can
              <router-link to="/signin" href="#_" class="text-blue-600 underline">sign in</router-link>
            </p>
            <form @submit.prevent="submit" class="relative w-full mt-10 space-y-8">
              <Error :msg="errorMessage" :active="hasError"  class="rounded-b-xl"></Error>
              <div class="relative">
                <label class="font-medium text-gray-900">
                  Name
                  <span class="text-red-500 required-dot">*</span>
                </label>
                <input
                  type="text"
                  class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                  v-model="v$.name.$model"
                  placeholder="Enter Your Name"
                />
                <InputError :errors="v$.name.$errors" />
              </div>
              <div class="relative">
                <label class="font-medium text-gray-900">
                  Account ID
                  <span class="text-red-500 required-dot">*</span>
                </label>
                <input
                  type="text"
                  class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                  v-model="v$.userAccountId.$model"
                  placeholder="Enter Your Account ID "
                />
                <InputError :errors="v$.userAccountId.$errors" />
              </div>
              <div class="relative">
                <label class="font-medium text-gray-900">
                  Public Key
                  <span class="text-red-500 required-dot">*</span>
                </label>
                <input
                  type="password"
                  class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                  v-model="v$.public_key.$model"
                  placeholder="Public Key"
                />
                <InputError :errors="v$.public_key.$errors" />
              </div>
              <!-- Submit Button -->
              <div class="relative">
                <button
                  href="#_"
                  class="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
                >Create Account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
