<script lang="ts" setup>
import api from "@/misc/request/api";
import { useStore } from "@/store";
import { ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import Dropdown from "./Dropdown.vue";
import Option from "./Option.vue";
const { isMobile,currentPath } = toRefs(useStore());
const router = useRouter();
type Option = {
	name: string;
	icon: string;
	link: string;
};

defineProps<{ isOpen: boolean; toggle: (bol: boolean) => void }>();

const options: Option[] = [
	{
		name: "Topics",
		icon: `<svg
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6zm223-69l-62 74q-8 9-21 11h-3q-13 0-21-7l-692-577-692 577q-12 8-24 7-13-2-21-11l-62-74q-8-10-7-23.5t11-21.5l719-599q32-26 76-26t76 26l244 204v-195q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5z"
      />
    </svg>`,
    link:'/dashboard/topics'
	},
	{
		name: "Compose",
		icon: `<svg class="w-6 h-6 -ml-1 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
		</svg>`,
		link: "/dashboard/compose",
	},
];

const emails = {
		name: "Emails",
		icon: `<svg
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg"
      >
      <path
        d="M1728 608v704q0 92-66 158t-158 66h-1216q-92 0-158-66t-66-158v-960q0-92 66-158t158-66h320q92 0 158 66t66 158v32h672q92 0 158 66t66 158z"
      />
    </svg>`,
    link:'/dashboard/emails'
}

const topics = ref<Topics[] | null>(null);

export interface Topics {
  topicId: string;
  topic_id: number;
  user: User;
  topic_name: string;
  date_created: string;
}

interface User {
  public_key: string;
  x25519_public_key: string;
}

const d = (async () => {
  const { data } = await api.get<Topics[]>("/api/getTopicsByUser");
  topics.value = data;
})();


</script>

<template>
	<div
		class="lg:block absolute "
		:class="{ 'absolute w-52 z-20': isMobile, 'relative w-80': !isMobile, hidden: !isOpen }"
	>
		<div class="bg-white overflow-hidden">
			<div class="flex items-center justify-start pt-6 ml-8">
				<p class="font-bold  text-xl">Plannifer</p>
			</div>

			<nav class="mt-6 min-h-screen">
				<div>
					<Option
						v-for="option in options"
            :click="() => {toggle(false)}"
            :link="option.link"
						:name="option.name"
						:style="`w-full flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start border-l-4 ${
							option.link.split('/')[2] === currentPath.split('/')[2]
								? ' border-purple-500 text-gray-800 '
								: 'hover:text-gray-800 border-transparent text-gray-400'
						} `"
						:icon="option.icon"
          >
          </Option>
          <Option  
            :click="()=>{
              toggle(false)
              router.push(`/dashboard/emails/${topics![0].topicId}/`)
            }"
            :link="'#'"
						:name="emails.name"
						:style="`w-full flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start border-l-4 ${
							emails.link.split('/')[2] === currentPath.split('/')[2] || emails.link.split('/')[2] === currentPath.split('/')[2]+'s'
								? ' border-purple-500 text-gray-800 '
								: 'hover:text-gray-800 border-transparent text-gray-400'
						} `"
						:icon="emails.icon"
            v-if="topics"
            >
              <Dropdown :topics="topics"/>
            </Option>
				</div>
			</nav>
		</div>
	</div>
</template>
