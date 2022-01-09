<script lang="ts" setup>
import Error from "@/components/Error.vue";
import Footer from "@/components/Footer.vue";
import InputError from "@/components/InputError.vue";
import { ref } from "vue";
import useLogin from "./useLogin";

const { submit, v$,disabled,hasError,errorMessage } = useLogin();


</script>

<template>
	<section class="w-full px-8 py-16 md:py-40 bg-gray-100 xl:px-8">
		<div class="max-w-5xl mx-auto">
			<div class="flex flex-col items-center md:flex-row">
				<!-- Left Div -->
				<div class="w-full space-y-5 md:w-3/5 md:pr-16">
					<p class="font-medium text-blue-500 uppercase">Smart Login</p>
					<h2
						class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl"
					>Changing The Way People login</h2>
					<p class="text-xl text-gray-600 md:pr-16">No more emails and passwords just web3 credentials.</p>
					<p class="text-xl text-red-400">
						Note 1: As of today there is no wallet extension (for hedera) on browsers that allows signing transactions
						so for now you will have to manually enter the credentials
					</p>
					<p
						class="text-xl text-red-400"
					>Note 2: Your private key never leaves the browser all transactions are signed in browser by you.</p>
				</div>
				<!-- Right Div  -->
				<div class="w-full mt-16 md:mt-0 md:w-2/5">
          <Error :active="hasError" :msg="errorMessage" ></Error>
					<form
						class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7"
						@submit.prevent="() => {
							submit()
						}"
					>
						<div>
							<h3 class="mb-6 text-2xl font-medium text-center">Sign in to your Account</h3>
							<input
								type="text"
								name="email"
								class="block w-full bg-gray-100 px-4 py-3 mb-4 border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
								placeholder="Account ID"
								v-model="v$.userAccountId.$model"
							/>
							<InputError :errors="v$.userAccountId.$errors" />
						</div>
						<div>
							<input
								type="password"
								name="password"
								class="block w-full bg-gray-100 px-4 py-3 mb-4 border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
								placeholder="Private Key"
								v-model="v$.privateKey.$model"
							/>
							<InputError :errors="v$.privateKey.$errors" />
						</div>

						<div class="block">
							<button
								class="w-full px-3 py-4 font-medium text-white rounded-lg"
								:disabled="disabled"
								:class="disabled?'bg-blue-300':'bg-blue-600'"
							>Log Me In</button>
						</div>
						<p class="w-full mt-4 text-sm text-center text-gray-500">
							Don't have an account?
							<router-link :to="{ name: 'SignUp' }" href="#_" class="text-blue-500 underline">Sign up here</router-link>
						</p>
					</form>
				</div>
			</div>
		</div>
	</section>

  <Footer />
</template>


