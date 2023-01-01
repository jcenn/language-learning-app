import Question from "@/dtos/question-dto";

export class QuestionService {
	async FetchQuestions(): Promise<Question[]> {
		return [
			{
				promptText: "How does this character look in romanji?",
				iconText: "あ",
				answers: ["a", "ki", "sa", "ra"],
				correctAnswer: "a",
				randomAnswerOrder: false,
			},
      {
				promptText: "How does this character look in romanji?",
				iconText: "は",
				answers: ["u", "chi", "su", "ha"],
				correctAnswer: "ha",
				randomAnswerOrder: false,
			},
      {
				promptText: "How does this character look in romanji?",
				iconText: "つ",
				answers: ["e", "tsu", "chi", "ka"],
				correctAnswer: "tsu",
				randomAnswerOrder: false,
			},
		];
	}
}
