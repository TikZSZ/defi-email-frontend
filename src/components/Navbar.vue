<script setup lang="ts">
import { useStore } from "@/store";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavLinkVue from "./NavLink.vue";
import { useClickOutside } from "./useOutsideClick";

const showMenu = ref(false);
const store = useStore()
const route = useRoute()
const router = useRouter()

const elRef = ref()
useClickOutside(elRef,showMenu)

const logOut = async () => {
	await store.logOut(route, router)
};
</script>


<template>
	<div class="w-full antialiased bg-white border-b ">
		<div class="mx-auto ">
			<nav class="relative z-10 h-24 select-none">
				<div
					class="container relative flex flex-wrap items-center justify-between h-24 mx-auto overflow-hidden font-medium  border-gray-200 lg:overflow-visible lg:justify-center sm:px-4 lg:px-2"
				>
					<!-- Logo -->
					<div class="flex items-center justify-start w-1/4 h-full pr-4">
						<router-link :to="{ name: 'Home' }" class="inline-block py-4 lg:py-0">
							<span class="p-1 text-xl font-black leading-none text-gray-900">
								<span>dMail</span>
								<span class="text-indigo-600">.</span>
								<span
									class="relative -top-2 right-0 px-2 py-0.5 -mt-3 -mr-6 text-xs font-medium leading-tight text-white bg-indigo-600 rounded-full"
								>Beta</span>
							</span>
						</router-link>
					</div>
					<!-- Nav Links -->
					<div
						class="top-0 left-0 items-start w-full h-full p-4 text-sm bg-gray-900 bg-opacity-50 lg:items-center lg:w-3/4 lg:text-base lg:bg-transparent lg:p-0 lg:relative lg:flex"
						:class="{ 'flex fixed': showMenu, hidden: !showMenu }"
					>
						<div
							class="flex-col w-full h-auto overflow-hidden bg-white rounded-lg lg:bg-transparent lg:overflow-visible lg:rounded-none lg:relative lg:flex lg:flex-row"
						>
							<!-- Logo -->
							<router-link
								:to="{ name: 'Home' }"
								class="items-center block w-auto h-16 mt-5 px-6 text-xl font-black leading-none text-gray-900 lg:hidden"
							>
								factura
								<span class="text-indigo-600">.</span>
								<span
									class="relative -top-2 right-0 px-2 py-0.5 -mt-3 -mr-6 text-xs font-medium leading-tight text-white bg-indigo-600 rounded-full"
								>Beta</span>
							</router-link>
							<!-- normal Nav Buttons -->
							<div
								class="flex flex-col items-start justify-center w-full space-x-6 text-center lg:space-x-8 lg:w-2/3 lg:mt-0 lg:flex-row lg:items-center -mt-5"
							>
								<NavLinkVue @click="showMenu = false" name="Home" to="/home" />
								<NavLinkVue @click="showMenu = false" name="Dashboard" to="/dashboard" v-if="store.accountId" />
								<NavLinkVue @click="showMenu = false" name="About" to="/about" />
							</div>
							<!-- Auth Buttons -->
							<div
								class="flex flex-col items-start justify-end w-full pt-4 lg:items-center lg:w-1/3 lg:flex-row lg:py-0"
								v-if="!store.accountId"
							>
								<router-link
									:to="{ name: 'SignIn' }"
									class="w-full px-6 py-2 mr-0 text-gray-700 lg:px-0 lg:pl-2 lg:mr-5 lg:w-auto"
								>Sign In</router-link>
								<router-link
									:to="{ name: 'SignUp' }"
									class="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white bg-indigo-600 lg:w-auto lg:rounded-full lg:px-5 hover:bg-indigo-500 focus:outline-none lg:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-indigo-600"
								>Sign Up</router-link>
							</div>
							<!-- Logout Button -->
							<div
								class="flex flex-col items-start justify-end w-full pt-2 lg:items-center lg:w-1/3 lg:flex-row lg:py-0"
								v-else
							>
								<div
									class="w-full px-6 lg:py-3 text-xl mr-0 text-gray-700 lg:px-0 lg:pl-2  lg:mr-5 lg:w-auto pb-2"
								>{{ store.name }}</div>
								<button
									@click="logOut()"
									class="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white bg-indigo-600 lg:w-auto lg:rounded-full lg:px-5 hover:bg-indigo-500 focus:outline-none lg:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-indigo-600"
								>Logout</button>
							</div>
						</div>
					</div>
					<!-- Mobile Buttons -->
					<div
            ref="elRef"
						@click="showMenu = !showMenu"
						class="absolute right-0 flex flex-col items-end justify-center w-10 h-10 bg-white rounded-full cursor-pointer lg:hidden hover:bg-gray-100"
					>
						<svg
							class="w-6 h-6 text-gray-700"
							v-if="!showMenu"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
							x-cloak
						>
							<path d="M4 6h16M4 12h16M4 18h16" />
						</svg>
						<svg
							class="w-6 h-6 text-gray-700"
							v-else="showMenu"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							x-cloak
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</div>
				</div>
			</nav>
		</div>
	</div>
</template>
