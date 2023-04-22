import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { errorMessages } from "../firebase";

//Add Questions

export const addQuestions = async (data) => {
  try {
    const result = await addDoc(collection(db, "questions"), data);
    toast.success("Soru Eklendi");
    return result.id;
  } catch (error) {
    errorMessages(error);
  }
};

//editQuestions
export const editQuestions = async (id, data) => {
  try {
    await updateDoc(doc(db, "questions", id), data);
    toast.success("Soru Güncellendi");
  } catch (error) {
    errorMessages(error);
  }
};
//Delete Questions
export const deleteQuestion = async (id) => {
  try {
    if (id) {
      await deleteDoc(doc(db, "questions", id));
      toast.success("Soru Silindi");
    }
  } catch (error) {
    errorMessages(error);
  }
};

//Score
export const addScore = async (data) => {
  try {
    const scoreRef = doc(db, "scores", data.uid); // Belge yolu veya referansı oluştur
    const scoreDoc = await getDoc(scoreRef); // Belgeyi getir
    if (scoreDoc.exists()) {
      const existingScore = scoreDoc.data(); // Mevcut veriyi al
      if (!existingScore.score || existingScore.score < data.score) {
        await setDoc(scoreRef, data); // Yeni veriyi ekle, eğer eski veri yoksa veya yeni veri daha yüksekse
      }
    } else {
      await setDoc(scoreRef, data); // Belge yoksa yeni veriyi ekle
    }
  } catch (error) {
    errorMessages(error);
  }
};

//Get Score Top 3
export const getScoreTop3 = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "scores"));
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return data;
  } catch (error) {
    errorMessages(error);
  }
};
