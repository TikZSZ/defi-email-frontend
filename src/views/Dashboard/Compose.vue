<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "@/store";
import Prompt from "@/components/Prompt.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import InputError from "@/components/InputError.vue";
import { localKeys } from "@/misc/localstorage/setKeys";
import LoadingButton from "@/components/LoadingButton.vue";
import { validAccountId } from "@/misc/validUserAccID";
import { sendToConsensus } from "../useConsensus";
import { PrivateKey } from "@hashgraph/sdk";
import { encrypt } from "@/misc/encrypt";
import { decodeUTF8 } from "tweetnacl-util";
import { getChunks } from "@/misc/getChunks";
import { Message} from "@/misc/interface/Message"
import { validKey } from "@/misc/validKey";

const prompt = ref(false);
const router = useRouter();
const disabled = ref(false);
const store = useStore()

const submitData = reactive({
  topicId: '',
  message: '',
  subject: '',
  x25519_public_key: ''
});

const rules: { [key in keyof typeof submitData]: any } = {
  topicId: validAccountId,
  message: { required },
  subject: { required },
  x25519_public_key: validKey(44),
}

const route = useRoute()
Object.keys(route.query).includes('topicId') && store.message && store.message.topicId && (submitData.topicId = store.message?.topicId as string)
Object.keys(route.query).includes('key') && store.message && store.message.x25519_public_key && (submitData.x25519_public_key = store.message?.x25519_public_key as string)


const v$ = useVuelidate(rules, submitData)
const twoWay = ref(false);
const receiverTopicId = ref('')
const v$r = useVuelidate({ receiverTopicId: validAccountId }, { receiverTopicId })

const submit = async () => {
  const isValid = await v$.value.$validate()
  twoWay.value && (await v$r.value.$validate())
  if (!isValid) return
  const privateKey = localKeys.getKeys.value.privateKey
  if (!privateKey) return prompt.value = true;
  return send(privateKey)
};



const send = async (privateKey: string) => {
  disabled.value = true
  try {
    const { subject, message, x25519_public_key } = submitData
    const msgToEncrypt:Message = {
      body: message,
      subject,
      date: new Date().toUTCString()
    }
    twoWay.value && (msgToEncrypt['topicId'] = receiverTopicId.value)
    const { encryptedMessage, x25519PubK } = encrypt(JSON.stringify(msgToEncrypt), privateKey, x25519_public_key)
    const msgToSendUint8 = decodeUTF8(JSON.stringify({
      message: encryptedMessage,
      x25519_public_key: x25519PubK,
      ed25519_public_key: PrivateKey.fromString(privateKey).publicKey.toStringDer()
    }))
    const msgToSendUint8WithChunks = new Uint8Array(2 + msgToSendUint8.length)
    msgToSendUint8WithChunks.set(msgToSendUint8, 2)
    const chunks = getChunks(msgToSendUint8WithChunks)
    msgToSendUint8WithChunks.set(decodeUTF8(chunks.toString()))

    const record = await sendToConsensus(submitData.topicId, msgToSendUint8WithChunks, privateKey)

    if (!record) throw new Error('no receipt for topic create txn')
    console.log({ topicSequenceNumber: record.receipt.topicSequenceNumber, topicID: record.receipt.topicId });

    prompt.value = false;
    router.push({ name: 'Topics' })
  } catch (err) {
    console.log(err);
  }
  disabled.value = false
};
</script>

<template>
  <div class="w-full bg-white">
    <div class="mx-auto max-w-7xl">
      <!-- Prompt -->
      <Prompt v-if="prompt" :sign="send" :disabled="disabled" />
      <div class="flex flex-col lg:flex-col" v-show="!prompt">
        <!-- Upper Div -->
        <div class="w-full bg-white">
          <div class="flex flex-col items-start justify-start w-full p-10">
            <h4 class="w-full text-3xl font-bold">Compose</h4>
            <form @submit.prevent="submit" class="relative w-full mt-10 space-y-8">
              <div class="relative">
                <label class="font-medium text-gray-900">
                  Topic ID
                  <span class="text-red-500 required-dot">*</span>
                </label>
                <input
                  type="text"
                  class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                  v-model="v$.topicId.$model"
                  placeholder="Enter Topic ID"
                />
                <InputError :errors="v$.topicId.$errors || []" />
              </div>
              <div class="relative">
                <label class="font-medium text-gray-900">
                  Subject
                  <span class="text-red-500 required-dot">*</span>
                </label>
                <input
                  type="text"
                  class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                  v-model="v$.subject.$model"
                  placeholder="Subject"
                />
                <InputError :errors="v$.subject.$errors || []" />
              </div>
              <div class="relative">
                <label class="font-medium text-gray-900">
                  Receiver X25519 PublicKey
                  <span class="text-red-500 required-dot">*</span>
                </label>
                <input
                  type="text"
                  class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                  v-model="v$.x25519_public_key.$model"
                  placeholder="X5519 Public Key"
                />
                <InputError :errors="v$.x25519_public_key.$errors || []" />
              </div>
              <div class="relative">
                <div
                  class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
                >
                  <input
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    @click="() => { twoWay = !twoWay; }"
                  />
                  <label
                    for="toggle"
                    class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
                <label for="toggle" class="text-sm text-gray-700">Add Topic ID for replies</label>
              </div>
              <div class="relative" v-if="twoWay">
                <label class="font-medium text-gray-900">Topic ID</label>
                <input
                  type="text"
                  class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                  v-model="v$r.receiverTopicId.$model"
                  placeholder="Topic Id"
                />
                <InputError :errors="v$r.receiverTopicId.$errors || []" />
              </div>

              <div class="relative">
                <label class="font-medium text-gray-900">
                  Compose Email
                  <span class="text-red-500 required-dot">*</span>
                </label>
                <textarea
                  class="form-control block w-full py-1.5 px-3 text-base font-normal bg-clip-padding border border-solid transition ease-in-out mt-2 focus:text-gray-700 focus:ring-blue-600 focus:outline-none placeholder-gray-400 bg-gray-200 rounded-lg focus:ring-4 focus:ring-opacity-50 resize-y"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Body"
                  v-model="v$.message.$model as any"
                ></textarea>
                <InputError :errors="v$.message.$errors || []" />
              </div>

              <!-- Submit Button -->
              <div class="relative">
                <LoadingButton name="Send Email" :disabled="disabled" />
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="css">
.toggle-checkbox:checked {
  @apply: right-0 border-green-400;
  right: 0;
  border-color: #68d391;
}
.toggle-checkbox:checked + .toggle-label {
  @apply: bg-green-400;
  background-color: #68d391;
}
</style>