<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import Prompt from "@/components/Prompt.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import InputError from "@/components/InputError.vue";
import api from "@/misc/request/api";
import { createTopic } from "@/misc/request/hedera";
import { localKeys } from "@/misc/localstorage/setKeys";
import LoadingButton from "@/components/LoadingButton.vue";

const prompt = ref(false);
const router = useRouter();
const disabled = ref(false);
const store = toRefs(useStore());
const req = (value:string) => false
const submitData = reactive({
	topic_name: '',
});

const rules:{[key in keyof typeof submitData]:any} = {
	topic_name:{required}
}

const v$ = useVuelidate(rules,submitData)

const submit = async () => {
	const isValid = await v$.value.$validate()
	if(!isValid) return
  const privateKey = localKeys.getKeys.value.privateKey
  if(!privateKey) return prompt.value = true;
  return sign(privateKey)
};

const sign = async (privateKey: string) => {
	disabled.value = true
	try{
		const record = await createTopic(store.accountId.value!,privateKey)
		if (!record) throw new Error('no receipt for topic create txn')
		const { data } = await api.post<any>("/api/createTopic", {
			data: {
				...submitData,
				date_created:record.consensusTimestamp.toString(),
        topicId:record.receipt.topicId?.toString()
			},
		});
    console.log(data);
		prompt.value = false;
    router.push({name:'Topics'})
	} catch(err){
		console.log(err);
	}
	disabled.value = false
};
</script>

<template>
	<div class="w-full  bg-white">
		<div class="mx-auto max-w-7xl">
			<!-- Prompt -->
			<Prompt v-if="prompt" :sign="sign" :disabled="disabled" />

			<div class="flex flex-col lg:flex-row" v-show="!prompt">
				<!-- Left Div -->
				<div
					class="w-full bg-cover lg:w-6/12 xl:w-6/12 bg-gradient-to-r from-white via-white to-gray-100 min-h-screen"
				>
					<div
						class="relative flex flex-col items-center justify-center w-full h-full px-10 my-20 lg:px-16 lg:my-0"
					>
						<div class="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
							<div class="relative">
								<p class="mb-2 font-medium text-gray-700 uppercase">Work smarter</p>
								<h2 class="text-5xl font-bold text-gray-900 xl:text-6xl">Features to help you work smarter</h2>
							</div>
							<p class="text-2xl text-gray-700">
								We've created a simple formula to follow in order to gain more out of your business and your
								application.
							</p>
							<a
								href="#_"
								class="inline-block px-8 py-5 text-xl font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
							>Get Started Today</a>
						</div>
					</div>
				</div>
				<!-- Right Div -->
				<div class="w-full bg-white lg:w-6/12 xl:w-6/12 min-h-screen">
					<div class="flex flex-col items-start justify-start w-full p-10 lg:p-16 xl:p-24">
						<h4 class="w-full text-3xl font-bold">Create Topic</h4>
						<form @submit.prevent="submit" class="relative w-full mt-10 space-y-8">
							<div class="relative">
								<label class="font-medium text-gray-900">
									Name
									<span class="text-red-500 required-dot">*</span>
								</label>
								<input
									type="text"
									class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
									v-model="v$.topic_name.$model"
									placeholder="Enter Topic Name"
								/>
								<InputError :errors="v$.topic_name.$errors || []"/>
							</div>

							<!-- Submit Button -->
							<div class="relative">
                <LoadingButton name="Create Topic" :disabled="disabled"/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>