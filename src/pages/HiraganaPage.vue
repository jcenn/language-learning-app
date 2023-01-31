<template>
	<div v-if="!hasFinished" class="hiragana-page-container">
		<div :hidden="hasStarted" class="start-prompt">
			<h1 class="title">Hiragana Practice</h1>
			<!-- <button class="start-button" @click="onStart">Start!</button> -->
			<LoadingScreen @on-go="onStart" text="Start!"></LoadingScreen>
		</div>
		<div :hidden="!hasStarted" class="game-container">
			<h2 class="question-prompt">{{ currentQuestion?.promptText }}</h2>
			<div class="question-text-container">
				<h1 class="question-text">{{ currentQuestion?.iconText }}</h1>
			</div>
			<div class="answers">
				<div
					v-for="answer in currentQuestion?.answers"
					class="answer"
					:class="{
						'correct-answer':
							showCorrectAnswer && isCorrectAnswer(answer),
						'wrong-answer':
							showCorrectAnswer && !isCorrectAnswer(answer),
						selected: answer == selectedAnswer,
						selectable: selectedAnswer == null,
					}"
					@click="onAnswer(answer)"
				>
					<h4 class="answer-text">{{ answer }}</h4>
				</div>
			</div>
			<div class="action-buttons-container">
				<button class="next-button" @click="onNextQuestion">▶</button>
			</div>
			<div class="result-text">
				<span
					>{{ currentQuestionIndex + 1 }} /
					{{ questions.length }}</span
				>
			</div>
			<div class="timer-container">
				<div
					class="timer"
					:class="{ 'no-transition': !isTimerAnimated }"
				></div>
			</div>
		</div>
	</div>
	<div :hidden="!isLoading" class="loading-icon-container"></div>
	<div v-if="hasFinished" class="result-page-container">
		<h1>Completed!</h1>
		<h2>Your score:</h2>
		<h3 class="score-display">
			{{ correctAnswerCount }} / {{ questions.length }}
		</h3>
		<!-- <button @click="onTryAgain">Try again!</button> -->
		<LoadingScreen @on-go="onTryAgain" text="Try Again!"></LoadingScreen>
	</div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import Question from "@/dtos/question-dto";
import { QuestionService } from "@/services/question-service";
import LoadingScreen from "@/components/LoadingScreen.vue";
const hasStarted = ref(false);
const showCorrectAnswer = ref(false);
const currentQuestion: Ref<Question | null> = ref(null);
const selectedAnswer: Ref<String | null> = ref(null);
const hasFinished = ref(false);
const isTimerAnimated = ref(true);
let questions: Question[] = [];
let correctAnswerCount = 0;
const currentQuestionIndex = ref(0);

const questionService = new QuestionService();
let timer: HTMLElement;
const timerTime = 4;
let currentTimeout: number | null;
const isLoading = ref(true);
onMounted(() => {
	timer = document.querySelector(".timer") as HTMLElement;
	timer.style.transitionDuration = timerTime + "s";
	hasFinished.value = false;
	currentQuestion.value = null;

	isTimerAnimated.value = true;
	questionService.FetchHiraganaQuestions(true).then((data) => {
		questions = data;
		if (data.length > 0) {
			currentQuestion.value = questions[0];
		}
		isLoading.value = false;
	});
});

const onStart = () => {
	hasStarted.value = true;
};

const resetTimer = () => {
	if (currentTimeout != null) {
		clearTimeout(currentTimeout);
	}
	isTimerAnimated.value = false;
	timer.style.width = "100%";

	//EXPLANATION: setting isTimerAnimated to true right away doesn't work (i guess css is rendered on a separate thread?)
	//so we do a little hacky fix
	currentTimeout = setTimeout(() => {
		isTimerAnimated.value = true;
	}, 100);
};

const onAnswer = (answer: String) => {
	if (selectedAnswer.value != null) {
		return;
	}
	selectedAnswer.value = answer;
	showCorrectAnswer.value = true;
	if (currentQuestion.value?.correctAnswer === answer) {
		correctAnswerCount += 1;
	}

	isTimerAnimated.value = true;
	timer.style.width = "0px";
	currentTimeout = setTimeout(() => {
		onNextQuestion();
	}, timerTime * 1000);
};

const isCorrectAnswer = (answer: String) => {
	return currentQuestion.value?.correctAnswer == answer;
};

const onNextQuestion = () => {
	resetTimer();
	selectedAnswer.value = null;
	showCorrectAnswer.value = false;
	currentQuestionIndex.value += 1;
	if (currentQuestionIndex.value < questions.length) {
		currentQuestion.value = questions[currentQuestionIndex.value];
	} else {
		hasFinished.value = true;
	}
};

const onTryAgain = () => {
	hasStarted.value = false;
	hasFinished.value = false;
	setTimeout(() => {
		timer = document.querySelector(".timer") as HTMLElement;
		timer.style.transitionDuration = timerTime + "s";

		correctAnswerCount = 0;
		currentQuestionIndex.value = 0;
		currentQuestion.value = null;
		questionService.FetchHiraganaQuestions(true).then((data) => {
			questions = data;
			if (data.length > 0) {
				currentQuestion.value = questions[0];
			}
		});
	}, 200);
	resetTimer();

	// Setup();
};

// Durstenfeld shuffle
function shuffleArray(array: any[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
</script>

<style lang="scss">
.hiragana-page-container {
	flex-grow: 1;
	background-color: var(--dark);
	color: var(--light);

	.start-prompt {
		.title {
			margin-top: 100px;
		}
	}

	.game-container {
		.question-prompt {
		}
		.question-text-container {
			display: flex;
			align-items: center;
			min-height: 300px;
			.question-text {
				width: 100%;
				font-size: 10em;
				margin: 0;
			}
		}

		.answers {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-evenly;

			.answer {
				width: 35%;
				height: 75px;
				margin: 30px 0;

				background-color: var(--grey);
				// border: 2px solid white;
				border: 3px solid black;
				border-radius: 15px;

				&.correct-answer {
					background-color: var(--green);
					// border: 2px solid black;
				}
				&.wrong-answer {
					background-color: var(--red);
				}
				&.selected {
					border: 3px solid white;
				}
				&.selectable {
					cursor: pointer;
				}

				display: flex;
				align-items: center;

				.answer-text {
					font-size: 2em;

					margin: 0;
					display: block;
					width: 100%;
					text-align: center;
				}
			}
		}
		.action-buttons-container {
			display: flex;
			justify-content: end;
			& > button {
				width: 60px;
				height: 40px;
				margin: 30px 60px;
				color: var(--light);
				font-size: 1.2em;
				background-color: var(--grey);
				border: 0;
				font-family: inherit;
				border: 2px solid black;
				border-radius: 5px;
				transition: background-color 0.2s ease-out;
				&:hover {
					background-color: black;
					cursor: pointer;
				}
			}
		}
		.timer-container {
			padding: 0 50px;
			.timer {
				width: 100%;
				height: 10px;
				margin-top: 10px;
				background-color: var(--light);
				transition: width linear;
			}
			.timer.no-transition {
				transition: none !important;
			}
		}
	}
}
.result-page-container {
	background-color: var(--dark);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: var(--light);
	height: 100%;
	.score-display {
		margin-top: 0px;
	}

	// & button {
	// 	width: 50px;
	// }
}
</style>
