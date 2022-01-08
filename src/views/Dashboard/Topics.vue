<script lang="ts" setup>
import api from "@/misc/request/api";
import { ref } from "vue";
import Loading from "@/components/Loading.vue";
import LoadingButtonVue from "@/components/LoadingButton.vue";
import { useRouter } from "vue-router";
const router = useRouter()
const topics = ref<Topics[]|null>(null);

interface Topics {
  topicId: string;
  topic_id: number;
  user: User;
  topic_name: string;
  date_created: string;
}

const topic_id = ref<number|null>(null)

interface User {
  public_key: string;
  x25519_public_key: string;
}

const d = (async () => {
	const { data } = await api.get<Topics[]>("/api/getTopicsByUser");
	topics.value = data;
})

d()


async function deleteTopic(id:number){
  topic_id.value = id
  await api.get(`/api/deleteTopic/${id}`)
  topics.value!.map((topic,i) => {
    if(topic.topic_id === id){
      topics.value!.splice(i,1)
    }
  })
  topic_id.value =null
}
</script>

<template>
	<div class="relative mx-auto w-full ">
		<Loading :active="!topics" />
		<div v-if="topics && topics.length === 0" class="bg-white min-h-screen">
			<div
				class="lg:flex lg:items-center lg:justify-between w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20"
			>
				<h2 class="text-3xl  font-extrabold text-black  sm:text-4xl">
					<span class="block">Want to receive emails ?</span>
					<span class="block text-indigo-500">Create a topic to get started!</span>
				</h2>
				<div class="">
					<div class="inline-flex mt-36 rounded-md shadow">
						<router-link
							:to="{name:'CreateTopic'}"
							class="absolute py-4 px-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg left-8"
						>Get started</router-link>
					</div>
				</div>
			</div>
		</div>

		<div v-else-if="topics && topics.length > 0" class="container min-h-screen lg:mt-9 px-4 mx-auto sm:px-8">
			<div class="py-8">
				<div class="flex flex-row mb-1 sm:mb-0 justify-between w-full">
					<h2 class="text-2xl leading-tight">Topics</h2>
				</div>
				<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
					<div class="inline-block min-w-full shadow-md border-2 border-b-0 border-opacity-50 rounded-lg overflow-hidden">
						<!-- Table -->
						<table class="min-w-full leading-normal">
							<!-- Table Head -->
							<thead  >
								<tr>
									<th
										scope="col"
										class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
									>id</th>
									<th
										scope="col"
										class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
									>Name</th>
									<th
										scope="col"
										class="px-5 py-3 md:block bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
									>X25519 Public Key
									</th>
									<th
										scope="col"
										class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
									></th>
								</tr>
							</thead>
							<!-- Table Body -->
							<tbody >
								<tr v-for="topic in topics">
									<!-- Table Data Entries -->
									<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
										<p class="text-gray-900 select-all whitespace-no-wrap">{{ topic.topicId }}</p>
									</td>
									<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
										<p class="text-gray-900 whitespace-no-wrap">{{ topic.topic_name }}</p>
									</td>
									<td class="px-5 py-5  table-cell border-b border-gray-200 bg-white text-sm">
										<p
											class="text-gray-900 whitespace-no-wrap select-all break-all"
										>{{ topic.user.x25519_public_key }}</p>
									</td>
									<td class=" border-b border-gray-200 leading-6 bg-white text-sm">
										<LoadingButtonVue name="Delete Topic" :disabled="!!topic_id && topic_id === topic.topic_id"
                      class="w-40 py-1 mt-2 bg-blue-500 rounded-lg"
                      @click="() => {
                        deleteTopic(topic.topic_id)
                      }"
                      />
										<div class="my-2"></div>
										<LoadingButtonVue name="View Emails" :disabled="false"  class="w-40 py-1 mb-2 bg-blue-500 rounded-lg" @click="router.push({path:`/dashboard/emails/${topic.topicId}/`})"/>
										<br>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<router-link
					:to="{name:'CreateTopic'}"
					class="py-4 px-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
				>
				Create Topic
			</router-link>
		</div>
	</div>
</template>

