import { collection, addDoc, getDoc, query, limit, orderBy, where, getDocs, DocumentData } from "firebase/firestore";
import { User } from "firebase/auth";
import { firestore } from "./firebase";

const scoreRef = collection(firestore, 'score');
export const useStore = () => {
    const createScore = async (user: User | null | undefined, score: number) => {
        if (user){
            const scoreDoc = await addDoc(scoreRef, {score: score, uid: user.uid, createdat: new Date()});
            return scoreDoc.id;
        }
    }

    const getRankingByUser = async (user: User | null | undefined) => {
        if(user){
            const snap = await getDocs(query(scoreRef, where("uid", "==", user?.uid), orderBy("score", 'desc'), limit(4)))
            return snap.docs.map((v)=>v.data())
        }
        return []
    }
    
    return {
        getRankingByUser,
        createScore
    }
}