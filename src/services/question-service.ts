import Question from "@/dtos/question-dto";
import { db } from "@/firebase/init";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
export class QuestionService {
	async FetchHiraganaQuestions(random: boolean): Promise<Question[]> {
		const q = query(collection(db, "hiragana-questions"));
		const querySnap = await getDocs(q);
		const questions = querySnap.docs.map((d) => d.data() as Question);

		if (random) this.shuffleArray(questions);

		return questions;
	}
	async FetchKatakanaQuestions(random: boolean): Promise<Question[]> {
		const q = query(collection(db, "katakana-questions"));
		const querySnap = await getDocs(q);
		const questions = querySnap.docs.map((d) => d.data() as Question);

		if (random) this.shuffleArray(questions);

		return questions;
	}

	// Durstenfeld shuffle
	private shuffleArray(array: any[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}
}
