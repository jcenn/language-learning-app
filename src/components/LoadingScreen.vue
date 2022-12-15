<template>
	<div class="loading-screen">
		<div class="circle">
			<div class="inner-circle" @click="onClickGo">
				<span class="hover-text">Go!</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const emits = defineEmits(["onGo"]);
const onClickGo = () => {
	emits("onGo");
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap");

.loading-screen {
	height: 100%;
	width: 100%;
	background-color: var(--dark);

	.circle {
		$circle-radius: 100px;
		$border-width: 100px;
		$horizontal-space: 60px;

		$text-color: var(--light);
		$text-size: 5em;

		position: absolute;
		left: calc(50% - $circle-radius - $border-width - $horizontal-space);
		top: calc(50% - $circle-radius - $border-width);
		z-index: 10;

		background: var(--light);
		border-radius: 5%;
		width: 2 * calc($circle-radius + $border-width + $horizontal-space);
		height: 2 * calc($circle-radius + $border-width);

		.hover-text {
			@media (hover: hover) {
				color: var(--red);
				opacity: 0;
			}
			@media (hover: none) {
				color: var(--light);
				opacity: 1;
			}

			font-family: "Noto Sans JP", sans-serif;
			font-size: $text-size;
			bottom: 5px;
			position: relative;
			transition: all 0.2s ease-out;
			// -moz-transition: opacity 0.5s linear; /* Firefox */
		}
		&:hover {
			.hover-text {
				color: var(--light);
				opacity: 1;
			}
		}

		.inner-circle {
			right: 5px;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 5px;
			box-sizing: border-box;
			position: relative;
			z-index: -1;

			position: absolute;
			left: calc(50% - $circle-radius);
			top: calc(50% - $circle-radius);
			width: 2 * calc($circle-radius);
			height: 2 * calc($circle-radius);
			border-radius: 50%;

			background-color: var(--red);

			&:hover {
				cursor: pointer;
			}
		}
	}
}
</style>
