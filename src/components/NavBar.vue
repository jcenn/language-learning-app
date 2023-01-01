<template>
	<div class="navbar">
		<span class="title-text" @click="onTitleClick"> Nihon-Go! </span>
		<div class="sidebar-container" @click="onSidebarIconClick"></div>
	</div>
</template>

<script setup lang="ts">
import router from "@/router";

const onTitleClick = () => {
	router.push("/");
};

const onSidebarIconClick = () => {
	//TODO: expand sidebar
	router.push("/about"); //temporary
};
</script>

<style lang="scss">
.navbar {
	$navbar-height: 75px;
	$font-size: 3em;

	width: 100vw;
	height: $navbar-height;

	display: flex;
	justify-content: space-between;
	.title-text {
		margin-left: 25px;
		line-height: $navbar-height;
		font-size: $font-size;
		color: var(--red);
		min-width: 235px;
		
		// @media (hover: hover) {
		transition: font-size 0.3s ease-out;
		&:hover {
			font-size: calc($font-size + 3px);
			cursor: pointer;
		}
		// }
	}
	.sidebar-container {
		width: $navbar-height;
		height: $navbar-height;
		font-size: $font-size;
		margin-right: 15px;
		cursor: pointer;

		&::before {
			content: "[]";
		}
		&:hover::before {
			content: "[ ]";
		}
	}
}
</style>
