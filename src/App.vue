<template>
	<div id="app-container">
		<NavBar></NavBar>
		<router-view />
	</div>
	<!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  -->
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
</script>

<style lang="scss">
:root {
	--test-color: red;
	--dark: #1d1d20;
	--light: #e6e9ff;
	--grey: #676a80;
	--grey-rgb: 118, 122, 148;

	--red: #f31a2d;
	--blue: #10239e;
	--yellow: #ebba17;
	--green: #067d22;
}

body {
	margin: 0;
	overflow-x: hidden;
	overflow-y: hidden;
	scrollbar-width: 0;
	width: 100vw;
	height: 100vh;
}
#app {
	font-family: "Noto Sans JP", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100%;
}
#app-container{
	height: 100%;
	display: flex;
	flex-direction: column;
}
/*nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
*/
</style>
