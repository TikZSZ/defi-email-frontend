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
  <Footer />

</div>
</template>

<script lang="ts" setup>
import Footer from '@/components/Footer.vue';

const aStyle = "underline text-indigo-500 focus:outline-none hover:text-gray-400"

</script>