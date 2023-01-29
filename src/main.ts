import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDKOF26N0QMiyMhXC_Qq104zPJ_U1JRawc",

	authDomain: "nihon-go-2e7e1.firebaseapp.com",

	projectId: "nihon-go-2e7e1",

	storageBucket: "nihon-go-2e7e1.appspot.com",

	messagingSenderId: "1028208209439",

	appId: "1:1028208209439:web:f773864e7c2aa628f66f2a",

	measurementId: "G-XWT2N9197P",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
createApp(App).use(router).mount("#app");
