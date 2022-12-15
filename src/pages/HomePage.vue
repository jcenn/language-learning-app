<template>
	<div class="homepage-container">
		<div v-show="!isLoaded" class="loading-screen-container">
			<LoadingScreen @on-go="onLoadingScreenClosed"></LoadingScreen>
		</div>
		<div v-show="isLoaded" class="homepage-main">
			<h1>HomePage</h1>
			<div class="tile"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import LoadingScreen from "@/components/LoadingScreen.vue";
import { Ref, ref } from "vue";
const isLoaded: Ref<Boolean> = ref(false);

const onLoadingScreenClosed = () => {
	isLoaded.value = true;
};
</script>

<style lang="scss">
.loading-screen-container {
	width: 100vw;
	height: 100vh;
}

.homepage-container {
	color: var(--light);
	width: 100vw;
	height: 100vh;
	background-color: var(--dark);

	.homepage-main {
		padding: 5px;
	}
}
</style>
