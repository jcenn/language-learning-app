<template>
	<div v-if="!hasFinished" class="hiragana-page-container">
		<div v-if="!hasStarted" class="start-prompt">
			<h2>Learn Hiragana here</h2>
			<button class="start-button" @click="onStart">Start!</button>
		</div>
		<div v-else class="game-container">
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
				<button @click="onNextQuestion">Next</button>
			</div>
			<div class="result-text">
				<span>{{ currentQuestionIndex }} / {{ questions.length }}</span>
			</div>
			<!-- <div class="timer-container">
				timer here
				<hr />
			</div> -->
		</div>
	</div>
	<div v-if="hasFinished" class="result-page-container">
		<h3>You've finished</h3>
		<br />
		<span>your score: </span><br />
		<span>{{ correctAnswerCount }} / {{ questions.length }}</span>
	</div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import Question from "@/dtos/question-dto";
import { QuestionService } from "@/services/question-service";
const hasStarted = ref(true);
const showCorrectAnswer = ref(false);
const currentQuestion: Ref<Question | null> = ref(null);
const selectedAnswer: Ref<String | null> = ref(null);
const hasFinished = ref(false);
let questions: Question[] = [];
let correctAnswerCount = 0;
const currentQuestionIndex = ref(0);

const questionService = new QuestionService();

onMounted(() => {
	questionService.FetchQuestions().then((data) => {
		questions = data;
		if (data.length > 0) {
			currentQuestion.value = questions[0];
		}
	});
});

const onStart = () => {
	hasStarted.value = true;
};

const onAnswer = (answer: String) => {
	if (selectedAnswer.value != null) {
		return;
	}
	selectedAnswer.value = answer;
	showCorrectAnswer.value = true;
	if (currentQuestion.value?.correctAnswer === answer) {
		// console.log("correct!");
		correctAnswerCount += 1;
	} else {
		// console.log(
		// 	`incorrect, correct answer is ${currentQuestion.value?.correctAnswer}`
		// );
	}
};

const isCorrectAnswer = (answer: String) => {
	return currentQuestion.value?.correctAnswer == answer;
};

const onNextQuestion = () => {
	selectedAnswer.value = null;
	showCorrectAnswer.value = false;
	currentQuestionIndex.value += 1;
	console.log(`current index: ${currentQuestionIndex.value}`);
	if (currentQuestionIndex.value < questions.length) {
		currentQuestion.value = questions[currentQuestionIndex.value];
	} else {
		hasFinished.value = true;
	}
};
</script>

<style lang="scss">
.hiragana-page-container {
	flex-grow: 1;
	background-color: var(--dark);
	color: var(--light);

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
	}
}
</style>
