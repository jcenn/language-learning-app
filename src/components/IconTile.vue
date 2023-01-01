<template>
	<div class="tile-container" @click="onClick">
		<span v-if="props.iconText != null" class="icon-text">{{ props.iconText }}</span>
		<img
			v-else
			class="tile-icon"
			:src="props.iconUrl"
			alt="image-not-found"
		/>
		<span class="title-text">{{ props.text }}</span>
	</div>
</template>

<script setup lang="ts">
import router from '@/router';

const props = defineProps({
	iconUrl: String,
	iconText: String,
	text: String,
  navigateTo:String
});

const onClick = () => {
  router.push(props.navigateTo!)
}
</script>

<style lang="scss">
.tile-container {
	width: 150px;
	height: 150px;

	display: flex;
	flex-direction: column;

	border: 2px solid var(--light);
	border-radius: 10%;

	background-color: var(--red);
  cursor: pointer;

	.tile-icon {
		$icon-size: 100px;
		margin: 0 auto;
		margin-top: 10px;
		border: 1px solid black;
		width: $icon-size;
		height: $icon-size;
		display: block;
	}
  .icon-text{
    font-size: 5em;
  }
	.title-text {
	}
  
  transition: background-color .2s;
  
  &:hover{
    background-color: var(--grey)
  }
}
</style>
