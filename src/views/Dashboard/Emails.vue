<script setup lang="ts">
import {
  Client,
  MessagesResponse,
  topicMessages,
} from "@tikz/hedera-mirror-node-ts";
import { onBeforeRouteUpdate,useRouter } from "vue-router";
import { ref ,toRefs} from "vue";
import { localKeys } from "@/misc/localstorage/setKeys";
import Loading from "@/components/Loading.vue";
import LoadingButton from "@/components/LoadingButton.vue";
import { decryptMessages } from "@/misc/decryptMessages";
import { Message} from "@/misc/interface/Message"
import { useStore } from "@/store";

const props = defineProps<{ topicId: string }>();
const client = new Client("https://testnet.mirrornode.hedera.com/");
const msgCursor = topicMessages(client)
  .setLimit(10)
  .order("desc")
  .setTopicId(props.topicId);
const store = toRefs(useStore())
const loading = ref(false);
const hasMore = ref<boolean>(false);
const msgs = ref<(Message & {x25519_public_key:string})[] | null>([]);
let rawMessages = ref<MessagesResponse | null>(null);

const fetch = async () => {
  loading.value = true;
  try {
    const { privateKey } = localKeys.getKeys.value;
    const topicMsgs = await msgCursor.get();
    rawMessages.value = topicMsgs;
    topicMsgs.links.next && (hasMore.value = true);
    msgs.value = decryptMessages(
      rawMessages.value["messages"].reverse(),
      privateKey!
    ).reverse();
  } catch (err) {
    console.log(err);
  }
  loading.value = false;
};
fetch();

const getNext = async () => {
  loading.value = true;
  try {
    const { privateKey } = localKeys.getKeys.value;
    const topicMsgs = await msgCursor.next();
    rawMessages.value!["messages"] = [
      ...topicMsgs!["messages"].reverse(),
      ...rawMessages.value!["messages"],
    ];
    if (!topicMsgs!.links.next) {
      loading.value = false;
      hasMore.value = false;
    } else hasMore.value = true;

    let decryptedMessages = decryptMessages(
      rawMessages.value!["messages"],
      privateKey!
    ).reverse();
    msgs.value = decryptedMessages;
  } catch (err) {
    console.log(err);
  }
  loading.value = false;
};
const router = useRouter()


onBeforeRouteUpdate(async (to,from,next) => {
  msgs.value = [];
  rawMessages.value = null
  loading.value = false
  hasMore.value = false
  msgCursor.setTopicId(to.params["topicId"] as string);
  await fetch();
  next()
});


</script>

<template>
  <div class="min-h-screen w-full mt-2 relative bg-gray-100">
    <div class="mx-auto w-11/12 relative transition-all">
      <div
        v-if="hasMore && rawMessages !== null"
        class="mx-auto w-1/2 relative m-6 h-10"
      >
        <LoadingButton
          class="absolute text-white inline-flex items-center  py-3  font-medium leading-4 bg-indigo-500 sm:bg-indigo-600 w-full rounded-full px-5 hover:bg-indigo-500 focus:outline-none  focus:ring-0 focus:ring-offset-2 focus:ring-indigo-600 text-base"
          name="View More"
          :disabled="loading"
          @click="getNext"
          #default="{ text }"
        >
          <span class="mx-auto w-full">{{ text }}</span>
        </LoadingButton>
      </div>
      <div
        v-if="!hasMore && rawMessages !== null"
        class="bg-rose-600 mx-auto mb-10 text-lg text-white py-5 text-center rounded"
      >
        You have reached the end
      </div>
      <Loading :active="loading" class="mb-10 mt-2 w-full sm:px-4" />
      <!-- @click="router.push(`/dashboard/email?subject=${msg.subject}&date=${msg.date}&body=${msg.body}&key=${msg.x25519_public_key}&topicId=${msg.topicId}`)" -->
      <div
        v-if="msgs"
        v-for="msg of msgs"
        class="anim"
        @click="()=>{
          store.message.value = msg
          router.push(`/dashboard/email`)
        }"
        
      >
        <div
          class="px-2 md:px-10 py-3 flex justify-between bg-gray-100 w-full transition-all mx-auto hover:shadow-xl hover:bg-white shadow-inner relative rounded-md mt-2 border-2 border-gray-300 transform-gpu"
        >
          <p class="text-sm md:text-lg">{{ msg.subject }}</p>
          <p class="text-sm sm:text-lg right-0 relative">
            {{ new Date(msg.date).toLocaleString() }}
          </p>
        </div>
        <!-- <div class="bg-black h-px"></div> -->
      </div>
    </div>
  </div>
</template>

<style lang="css">
.anim :hover {
  transform: scale(1.001);
}
</style>
