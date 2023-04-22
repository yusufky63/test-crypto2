import { db } from "../firebase";
import {
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  where,
  getDocs,
  collection,
} from "firebase/firestore";

import { toast } from "react-toastify";
import { errorMessages } from "../firebase";

// Admin Add Function
export const setAdmin = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    if (userData.isAdmin === true && !userData.isFounder) {
      await updateDoc(userRef, { isAdmin: false });
      toast.info("Admin Yetkisi Kaldırıldı");
    } else if (userData.isAdmin === false) {
      await updateDoc(userRef, { isAdmin: true });
      toast.success("Admin Yetkisi Verildi");
    } else {
      toast.info("Kurucu Admin");
    }
  } catch (error) {
    errorMessages(error);
    toast.warning("İşlem Gerçekleştirilemedi: " + error);
  }
};

//Admin Blog Delete Function
export const deleteBlogAdmin = async (id) => {
  try {
    if (id) {
      await deleteDoc(doc(db, "academyblogs", id));
      toast.success("Blog Silindi");
    }
  } catch (error) {
    errorMessages(error);
  }
};

//Admin Blog Update Function
export const updateBlogAdmin = async (id, data) => {
  try {
    await updateDoc(doc(db, "academyblogs", id), data);
    toast.success("Blog Güncellendi");
  } catch (error) {
    errorMessages(error);
  }
};

//Admin getUsers Function
export const getUsers = async () => {
  const users = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    users.push({ ...doc.data(), id: doc.id });
  });
  return users;
};

//ADMIN SETTINGS
export const adminList = async () => {
  try {
    const querySnapshot = await getDoc(
      collection(db, "users"),
      where("isAdmin", "==", true || "isFounder", "==", true)
    );
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return data;
  } catch (error) {
    errorMessages(error);
  }
};
