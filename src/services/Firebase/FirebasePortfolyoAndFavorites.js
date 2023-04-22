import { db ,errorMessages} from "../firebase";
import {
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  collection,
} from "firebase/firestore";
import { toast } from "react-toastify";

//ADD CRYPTO
export const addFavoritesCrypto = async (favorite) => {
  try {
    if (favorite) {
      const result = await addDoc(collection(db, "favorites"), favorite);
      return result.id;
    }
  } catch (error) {
    toast.warning("Lütfen Giriş Yapınız !", error.message);
  }
  await addDoc(collection(db, "favorites"), favorite);
};

//DELETE CRYPTO
export const deleteFavoritesCrypto = async (id) => {
  try {
    await deleteDoc(doc(db, "favorites", id));
  } catch (error) {
    errorMessages(error);
  }
};

//ADD PORTFOLIO
export const addPortfolyo = async (portfolyo) => {
  try {
    if (portfolyo) {
      const result = await addDoc(collection(db, "portfolios"), portfolyo);
      toast.success("Satın Alma İşlemi Başarılı");
      return result.id;
    }
  } catch (error) {
    toast.error("Satın Alma Başarısız", error.message);
  }

  await addDoc(collection(db, "portfolios"), portfolyo);
};

//UPDATE PORTFOLIO
export const updatePorfolyo = async (id, portfolyo) => {
  try {
    if (portfolyo) {
      await updateDoc(doc(db, "portfolios", id), portfolyo);
      if (portfolyo.coin_price_usd * portfolyo.buy_total_crypto <= 0.01) {
        deletePortfolyo(id);
      }
      toast.success("İşlem Gerçekleşti");
    }
  } catch (error) {
    errorMessages(error);
    toast.error("İşlem Gerçekleşmedi", error.message);
  }
};

//DELETE PORTFOLIO
export const deletePortfolyo = async (id) => {
  try {
    await deleteDoc(doc(db, "portfolios", id));
    toast.success("Silindi !");
  } catch (error) {
    errorMessages(error);
  }
};



//DELETE HISTORY
export const deleteOrderHistory = async (id) => {
    try {
      if (id) {
        await deleteDoc(doc(db, "orders", id));
      }
    } catch (error) {
      errorMessages(error);
    }
  };
  
  //ADD HISTORY
  export const addOrderHistory = async (order) => {
    try {
      const result = await addDoc(collection(db, "orders"), order);
      return result.id;
    } catch (error) {
      errorMessages(error);
    }
    await addDoc(collection(db, "orders"), order);
  };
  
