import Question from "@/dtos/question-dto";
import { db } from "@/firebase/init";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
export class QuestionService {
	async FetchHiraganaQuestions(): Promise<Question[]> {
		const q = query(collection(db, "hiragana-questions"))
		let querySnap = await getDocs(q)
		
		return querySnap.docs.map((d) => d.data() as Question)
	
	}
	async FetchKatakanaQuestions(): Promise<Question[]> {
		// const sampleQuestionRef = doc(db, "hiragana-questions/a");
		// let snap = await getDoc(sampleQuestionRef);
		const q = query(collection(db, "katakana-questions"))
		let querySnap = await getDocs(q)
		
		return querySnap.docs.map((d) => d.data() as Question)
	
	}
}
