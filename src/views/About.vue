<template>
  <div class="relative">
    <section
      class="px-14 mt-5 text-gray-600 text-lg font-mono"
      style="min-height: 58vh"
    >
      <p>
        dMail is next generation email powered by modern cryptography and
        decentralization. Today most services require users to give their
        personal information like emails, phone numbers etc. dMail doesn't
        require any personal information to use except a
        <a href="https://docs.hedera.com/guides/core-concepts/accounts"
          >hedera account</a
        >
        which is a decentralized entity.
      </p>
      <br />
      <p>
        Using Topics as mailbox from hedera consensus service we allow users to
        receive emails/messages that are by default encrypted and can only be
        decrypted by the receiver and since no personal information is collected
        by us the users completely remain anonymous.
      </p>
      <br />
      <div>
        <p>
          dMail simplifies the process of key management by converting hedera
          ed25519
          <a target="_blank" href="https://en.wikipedia.org/wiki/EdDSA"
            >(EdDSA)</a
          >
          to X25519
          <a target="_blank" href="https://en.wikipedia.org/wiki/Curve25519"
            >(ECDH)</a
          >
          for key exchange along with random session based
          <a target="_blank" href="https://en.wikipedia.org/wiki/Salsa20"
            >XSalsa20</a
          >
          for symmetric encryption. In future separate topic based key pairs
          could be supported but such activity will lead to higher reliance on
          centralized entities and painful key management processes.
          <a target="_blank" href="https://libsodium.gitbook.io/doc/"
            >Libsodium</a
          >
          (wasm-wrapper) is used under the hood to perform these operations
        </p>
      </div>
    </section>
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Footer from "@/components/Footer.vue";
const aStyle =
  "underline text-indigo-500 focus:outline-none hover:text-gray-400";
</script>

<style scoped>
a {
  @apply text-rose-500;
  text-decoration: underline;
}

p {
  @apply text-gray-600;
}
</style>
