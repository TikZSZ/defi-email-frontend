<template >
<div class="relative h-screen">
    <section class="px-14 mt-5 ">
    <h1 class="text-2xl my-5 font-medium">About</h1>
    <div class="space-y-3 font-mono text-xl text-gray-500">
      <p>
        factura is a HApp (Hybird App) similar to a
        <a
          href="https://ethereum.org/en/dapps/#what-are-dapps"
          target="_blank"
          :class="aStyle"
        >DApps (Decentralised App)</a>
        except that it uses central servers for storing verbose information
        and
        <a
          href="https://www.investopedia.com/terms/d/distributed-ledger-technology-dlt.asp"
          target="_blank"
          :class="aStyle"
        >distributed ledger technology (DLT)</a>
        for important and critical information using
        <a
          target="_blank"
          href="https://en.wikipedia.org/wiki/Public-key_cryptography"
          :class="aStyle"
        >asymetric cryptography</a>.
      </p>
      <p>
        Behind the scenes factura relies on word's most performant and scalable DLT
        <a
          href="https://hedera.com/"
          :class="aStyle"
        >Hedera</a> and its
        <a href="https://hedera.com/consensus-service" :class="aStyle">Consensus Service</a>
        It is one of the fews DLTs in the world with 10000+ TPS (Transactions Per Second) with
        average confirmation time of 3-5 Seconds (w/finality) and lowest fee.
      </p>
      <p>Low confirmation times is what makes factura soo much faster than any other DApp from other DLTs</p>
      <p>
        Key to success of factura lies in the fact that the data is first signed and then stored on DLT which is
        a form of immutable, immortal storage keeping the data alive for indefinite peroids of time.
        With the key feature being that it can be independently verified by anyone anytime.
      </p>
      <p>
        Not only the receipts issued on the
        platform are digitally signed but even store information is signed and saved on DLT
        to link the digital identity of a seller and store. In future digital KYC services
        could make this even better
      </p>
      <p>
        <span class="text-red-400">Creator Notes:</span>
        <br />factura is a rather simple invoice management application with complex wells and whistles of today.
        Though its usecases are limited, but the approach to building HApps with fast DLTs and cryptography is
        rather promising for many use cases that require both scale and trust.
      </p>
    </div>
  </section>

  <!-- Footer -->

  <section class="bg-gray-100 w-full -bottom-10 relative">
    <div class="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
      <div class="flex justify-center space-x-6">
        <a
          href="http://twitter.com/TikZ41414516"
          target="__blank"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">Twitter</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
            />
          </svg>
        </a>
        <a
          href="https://github.com/TikZSZ"
          target="__blank"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">GitHub</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
            <path
              fill-rule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
      <p
        class="mt-8 text-base leading-6 text-center text-gray-400"
      >© 2021 factura, Inc. All rights reserved.</p>
    </div>
  </section>
</div>
</template>

<script lang="ts" setup>
const aStyle = "underline text-indigo-500 focus:outline-none hover:text-gray-400"
</script>