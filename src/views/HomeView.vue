<script setup lang="ts">
import InputErrorVue from "@/components/InputError.vue";
import { useStore } from "@/store";
import { toRefs } from "vue";
import useLogin from "./useLogin";
import Footer from "@/components/Footer.vue";
import Error from "@/components/Error.vue";

const { submit, v$, disabled,hasError,errorMessage } = useLogin();
const store = toRefs(useStore())

</script>

<template>
  <!-- Header -->
  <section
    class="w-full px-6 pb-12 antialiased bg-white bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200"
  >
    <slot name="header"></slot>
    <div class="mx-auto max-w-7xl">
      <!-- Main Hero Content -->
      <div class="container max-w-lg px-4 py-32 mx-auto text-left md:max-w-none md:text-center">
        <h1
          class="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl"
        >
          <span class="inline md:block">Start Using</span>
          <div v-if="store.isMobile" class="my-2"></div>
          <!-- Your -->
          <span
            class="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500 md:inline-block h-20"
          >Encrypted Email</span>
          <!-- Next Great Idea -->
        </h1>
        <div
          class="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg"
        >Simplifying secure and decentralized email!</div>
        <!-- Simplifying the creation of landing pages, blog pages, application pages and so much more! -->
        <div class="flex flex-col items-center mt-12 text-center">
          <span class="relative inline-flex w-full md:w-auto">
            <a
              type="button"
              class="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-full md:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >Try Today</a>
            <span
              class="absolute top-0 right-0 px-2 py-1 -mt-3 -mr-6 text-xs font-medium leading-tight text-white bg-black rounded-full"
            >Free</span>
          </span>
          <a target="__blank" href="https://drive.google.com/file/d/1gCdJKoAegjm8LBAcoowRgEEjyzQqGRz7/view?usp=sharing" class="mt-3 text-sm text-indigo-500">View Demo</a>
        </div>
        <h1 class="text-gray-500 mt-3">
          <span class="font-bold">Note: </span>
          <a
            class="text-indigo-600 underline"
            target="_blank"
            href="https://docs.hedera.com/guides/testnet/testnet-access"
          >   Hedera Testnet Account</a> is required to use dMail.
        </h1>
      </div>
      <!-- End Main Hero Content -->
    </div>
  </section>

  <!-- Features -->
  <section class="py-20 sm:px-5 bg-white">
    <div class="container max-w-7xl mx-auto">
      <h2 class="text-4xl font-bold tracking-tight text-center">Our Features</h2>
      <p class="mt-2 text-lg text-center text-gray-600">Check out list of awesome features below.</p>
      <div class="grid grid-cols-4 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 px-4 sm:px-8 xl:px-0">
        <div
          class="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 rounded-xl"
        >
          <div class="p-3 text-white bg-blue-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 9l3 3l-3 3" />
              <line x1="13" y1="15" x2="16" y2="15" />
              <rect x="3" y="4" width="18" height="16" rx="2" />
            </svg>
          </div>
          <h4 class="text-xl font-medium text-gray-700">End to End Encryption</h4>
          <p class="text-base text-center text-gray-500">
            All emails are digitally singed and encrypted, and can only be decrypted by one person in whole world and that's the receiver. Making conversations very secure
            <br />
            <span class="text-gray-600 font-bold">Note:</span>
            <span class="text-rose-600">
              The process is similar to
              <a
                class="underline text-rose-500"
                target="_blank"
                href="https://en.wikipedia.org/wiki/Pretty_Good_Privacy"
              >(PGP)</a>
              but implementation is not
            </span>
          </p>
        </div>

        <div
          class="flex flex-col items-center justify-center col-span-4 px-8 py-12 space-y-4 bg-gray-100 rounded-xl"
        >
          <div class="p-3 text-white bg-blue-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M5 8v-3a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5" />
              <circle cx="6" cy="14" r="3" />
              <path d="M4.5 17l-1.5 5l3 -1.5l3 1.5l-1.5 -5" />
            </svg>
          </div>
          <h4 class="text-xl font-medium text-gray-700">Immutability</h4>
          <p
            class="text-base text-center text-gray-500"
          >All emails are stored on decentralized network and are completely immutable</p>
        </div>

        <div
          class="flex flex-col items-center justify-center col-span-4 px-8 py-12 space-y-4 bg-gray-100 rounded-xl"
        >
          <div class="p-3 text-white bg-blue-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
              <line x1="12" y1="12" x2="20" y2="7.5" />
              <line x1="12" y1="12" x2="12" y2="21" />
              <line x1="12" y1="12" x2="4" y2="7.5" />
              <line x1="16" y1="5.25" x2="8" y2="9.75" />
            </svg>
          </div>
          <h4 class="text-xl font-medium text-gray-700">Truly Decentralized</h4>
          <p
            class="text-base text-center text-gray-500"
          >All Email IDs / Topic IDs and emails exist on decentralized network and do not rely of any central entity</p>
        </div>

        <div
          class="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl"
        >
          <div class="p-3 text-white bg-blue-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="15" y1="5" x2="15" y2="7" />
              <line x1="15" y1="11" x2="15" y2="13" />
              <line x1="15" y1="17" x2="15" y2="19" />
              <path
                d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2"
              />
            </svg>
          </div>
          <h4 class="text-xl font-medium text-gray-700">Untraceable</h4>
          <p
            class="text-base text-center text-gray-500"
          >Create as many topics/emails as needed without revealing any personal information. No email ids no phone numbers</p>
        </div>

        <div
          class="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl"
        >
          <div class="p-3 text-white bg-blue-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="9.5" y1="11" x2="9.51" y2="11" />
              <line x1="14.5" y1="11" x2="14.51" y2="11" />
              <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
              <path
                d="M7 5h1v-2h8v2h1a3 3 0 0 1 3 3v9a3 3 0 0 1 -3 3v1h-10v-1a3 3 0 0 1 -3 -3v-9a3 3 0 0 1 3 -3"
              />
            </svg>
          </div>
          <h4 class="text-xl font-medium text-gray-700">Next Generation Authentication</h4>
          <p class="text-base text-center text-gray-500">
            <a
              class="underline text-rose-500"
              target="_blank"
              href="https://en.wikipedia.org/wiki/Public-key_cryptography"
            >Public Key cryptography</a> for everything right from authentication to decryption and sending emails to others
          </p>
        </div>

        <div
          class="flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 sm:rounded-xl"
        >
          <div class="p-3 text-white bg-blue-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 8a3 3 0 0 1 0 6" />
              <path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" />
              <path
                d="M12 8h0l4.524 -3.77a0.9 .9 0 0 1 1.476 .692v12.156a0.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8"
              />
            </svg>
          </div>
          <h4 class="text-xl font-medium text-gray-700">Easy to use</h4>
          <p
            class="text-base text-center text-gray-500"
          >In decentralized era key pairs are more common than ever, use existing network keys to send and receive emails. Without knowing all nitty and gritty details of cryptography</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Login -->
  <section class="w-full px-3 sm:px-8 py-14 bg-gray-100 xl:px-8">
    <div class="max-w-5xl mx-auto">
      <div v-if="store.accountId.value === null" class="flex flex-col items-center md:flex-row">
        <div class="w-full space-y-5 md:w-3/5 md:pr-16">
          <p class="font-medium text-blue-500 uppercase">Building Zero Trust Businesses</p>
          <h2
            class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl"
          >Changing The Way People Do Business.</h2>
        </div>

        <div class="w-full mt-16 md:mt-0 md:w-2/5">
          <Error :active="hasError" :msg="errorMessage"/>
          <form
            class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7"
            @submit.prevent="submit"
          >
            <h3 class="mb-6 text-2xl font-medium text-center">Sign in to your Account</h3>
            <input
              type="text"
              name="email"
              class="block w-full px-4 py-3 mb-4 border-2 border-transparent border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Account ID"
              v-model="v$.userAccountId.$model"
            />
            <InputErrorVue :errors="v$.userAccountId.$errors" />
            <input
              type="password"
              name="password"
              class="block w-full px-4 py-3 mb-4 border-2 border-transparent border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Private Key"
              v-model="v$.privateKey.$model"
            />
            <InputErrorVue :errors="v$.privateKey.$errors" />
            <div class="block">
              <button
                class="w-full px-3 py-4 font-medium text-white rounded-lg"
                :disabled="disabled"
                :class="disabled ? 'bg-blue-300' : 'bg-blue-600'"
              >Log Me In</button>
            </div>
            <p class="w-full mt-4 text-sm text-center text-gray-500">
              Don't have an account?
              <a href="#_" class="text-blue-500 underline">Sign up here</a>
            </p>
          </form>
        </div>
      </div>
      <div v-if="store.accountId.value !== null" class="w-full space-y-5">
        <h2
          class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl mx-auto text-center"
        >
          <span class="text-blue-500">Greetings!</span>
          <br />
          {{ store.name }}!
        </h2>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="py-24 bg-white">
    <div class="px-5 sm:px-8 mx-auto max-w-7xl lg:px-16">
      <h2 class="mb-4 text-xl font-bold md:text-3xl">Frequently Asked Questions</h2>
      <div class="grid grid-cols-1 gap-0 text-gray-600 md:grid-cols-2 md:gap-16">
        <div>
          <h5 class="mt-10 mb-3 font-semibold text-gray-900">What is dMail</h5>
          <p class="text-gray-600">
            dMail stands for decentralized email, its a platform for untraceable, and secure email powered by
            <a
              href="https://hedera.com/"
              class="text-indigo-500 underline"
            >hedera hashgraph</a>
            <a
              href="https://en.wikipedia.org/wiki/Decentralised_system"
              class="text-indigo-500 underline"
            ></a>
          </p>
          <h5 class="mt-10 mb-3 font-semibold text-gray-900">Can I try it for Free?</h5>
          <p class="text-gray-600">Absolutely, you can try out dMail for free its a open source project!</p>

          <h5 class="mt-10 mb-3 font-semibold text-gray-900">What is a Topic?</h5>
          <p class="text-gray-600">
            A topic is like a email address which others can use to send emails to you.
            Topics are native feature of hedera hashgraph the underlying decentralized network for dMail
          </p>
        </div>
        <div>
          <h5 class="mt-10 mb-3 font-semibold text-gray-900">How do i start using dMail</h5>
          <p class="text-gray-600">To use dMail just sign up and create a topic and share Topic ID and your public key to potential senders. Use compose section in dashboard to send emails.</p>

          <h5
            class="mt-10 mb-3 font-semibold text-gray-900"
          >What is the underlying scheme used for End to End Encryption?</h5>
          <p class="text-gray-600">
            dMail simplifies the process of key management by converting hedera
            ed25519
            <a
              class="underline text-rose-500"
              target="_blank"
              href="https://en.wikipedia.org/wiki/EdDSA"
            >(EdDSA)</a> to X25519
            <a
              class="underline text-rose-500"
              target="_blank"
              href="https://en.wikipedia.org/wiki/Curve25519"
            >(ECDH)</a> for key exchange along with random session based
            <a
              class="underline text-rose-500"
              target="_blank"
              href="https://en.wikipedia.org/wiki/Salsa20"
            >XSalsa20</a> for symmetric encryption.
            In future separate topic based key pairs could be supported but such activity will lead to higher reliance on centralized entities and painful key management processes.
            <a
              class="underline text-rose-500"
              target="_blank"
              href="https://libsodium.gitbook.io/doc/"
            >Libsodium</a> (wasm-wrapper)
            is used under the hood to perform these operations
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <Footer />
</template>
