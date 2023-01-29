<template>
	<div class="homepage-container">
		<div v-show="!isLoaded" class="loading-screen-container">
			<LoadingScreen @on-go="onLoadingScreenClosed"></LoadingScreen>
		</div>
		<div v-show="isLoaded" class="homepage-main">
			<h1>What would you like to practice today?</h1>
			<div class="tiles">
				<IconTile text="Hiragana" icon-text="あ" navigate-to="hiragana"/>
				<IconTile text="Katakana" icon-text="ツ" navigate-to="katakana"/>
				<IconTile text="Kanji" icon-text="人" navigate-to="kanji"/>
				<IconTile text="Lessons" icon-text="📖" navigate-to="lessons"/>

			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import IconTile from "@/components/IconTile.vue";
import LoadingScreen from "@/components/LoadingScreen.vue";
import { Ref, ref } from "vue";
const isLoaded: Ref<Boolean> = ref(true); // temporary, set to true later

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
	flex-grow: 1;
	background-color: var(--dark);
	display: flex;
	flex-direction: column;

	.homepage-main {
		padding: 5px;
		flex-grow: 1;
		
		display: flex;
		flex-direction: column;
		.tiles {
			display: flex;
			padding-top: 30px;

			flex-grow: 1;
			@media (max-width:680px) {
				flex-direction: column;
				align-items: center;
			}
			justify-content: space-evenly;
		}
	}

}
</style>
