import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import { setFavorites } from "../components/redux/favorite/favoriteSlice";
import { setPortfolyo } from "../components/redux/portfolyo/portfolyoSlice";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile,
  updatePassword,
  sendEmailVerification,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";

import {
  doc,
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import {
  login as LoginRedux,
  logout as LogoutRedux,
} from "../components/redux/auth";

import { store } from "../components/redux/store";
const firebaseConfig = {
  apiKey: "AIzaSyCFcfAps0FW8omode7E-ebrZQ82L_6RuqI",
  authDomain: "crypto-app-18330.firebaseapp.com",
  databaseURL:
    "https://crypto-app-18330-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "crypto-app-18330",
  storageBucket: "crypto-app-18330.appspot.com",
  messagingSenderId: "407357067170",
  appId: "1:407357067170:web:0accaa52f9cf0eb7a22cfb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
const user = auth.currentUser;
//REGISTER
export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    toast.success("Kayıt Başarılı");

    return user;
  } catch (error) {
    toast.error(
      error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ? "Şifre en az 6 karakter olmalıdır."
        : error.message ||
          error.message === "Firebase: Error (auth/invalid-email)."
        ? "Geçersiz E-posta"
        : error.message ===
          "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
        ? "Bu e-posta adresi zaten kullanımda."
        : error.message ===
          "Firebase: The email address is badly formatted. (auth/invalid-email)."
        ? "Geçersiz E-posta"
        : error.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ? "Şifre en az 6 karakter olmalıdır."
        : error.message
    );
  }
};

//LOGIN
export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Giriş Başarılı", user.email);

    return user;
  } catch (error) {
    toast.error(
      error.message === "Firebase: Error (auth/user-not-found)."
        ? "Kullanıcı Bulunamadı"
        : error.message === "Firebase: Error (auth/wrong-password)."
        ? "Şifre Yanlış"
        : error.message === "Firebase: Error (auth/invalid-email)."
        ? "Geçersiz E-posta"
        : error.message
    );
  }
};

//RESET PASSWORD
export const resetPasword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Şifre Sıfırlama Maili Gönderildi");
    return true;
  } catch (error) {
    toast.error(
      error.message === "Firebase: Error (auth/user-not-found)."
        ? "Kullanıcı Bulunamadı"
        : error.message === "Firebase: Error (auth/invalid-email)."
        ? "Geçersiz E-posta"
        : error.message
    );

    return false;
  }
};

//LOGOUT
export const logout = async () => {
  console.log(auth);
  try {
    await signOut(auth);
    toast.success("Çıkış Başarılı");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  console.log(auth);
  if (user) {
    console.log(user);
    store.dispatch(LoginRedux(user));
    console.log("onAuthStateChanged", user);
    //FAVORITES
    onSnapshot(
      query(collection(db, "favorites"), where("uid", "==", user.uid)),
      (doc) => {
        store.dispatch(
          setFavorites(
            doc.docs.reduce(
              (favorites, favori) => [
                ...favorites,
                { ...favori.data(), id: favori.id },
              ],
              []
            )
          )
        );
      }
    );
    //PORTFOLIO

    onSnapshot(
      query(collection(db, "portfolios"), where("uid", "==", user.uid)),
      (doc) => {
        store.dispatch(
          setPortfolyo(
            doc.docs.reduce(
              (portfolios, portfolyo) => [
                ...portfolios,
                { ...portfolyo.data(), id: portfolyo.id },
              ],
              []
            )
          )
        );
      }
    );
  } else {
    store.dispatch(LogoutRedux());
    store.dispatch(setFavorites([]));
  }
});

//GOOGLE AUTH
const providerGoogle = new GoogleAuthProvider();
providerGoogle.setCustomParameters({
  prompt: "select_account",
});
export const googleLogin = async () => {
  await signInWithPopup(auth, providerGoogle)
    .then((result) => {
      // store.dispatch(LoginRedux(result));
      toast.success("Google İle Giriş Yapıldı");
      window.location.href = "/";
    })
    .catch((error) => {
      toast.error("Google ile giriş yapılamadı!", error.message);
    });
};

//GITHUB AUTH
const providerGithub = new GithubAuthProvider();
export const githubLogin = async () => {
  await signInWithPopup(auth, providerGithub)
    .then(function (result) {
      // store.dispatch(LoginRedux(result.user));
      toast.success("Github İle Giriş Yapıldı");
      window.location.href = "/";
    })
    .catch(function (error) {
      toast.error("Github ile giriş yapılamadı!", error.message);
      console.log(error.message);
    });
};

//ADD CRYPTO
export const addCrypto = async (favorite) => {
  try {
    if (favorite) {
      const result = await addDoc(collection(db, "favorites"), favorite);
      return result.id;
    }
  } catch (error) {
    toast.error("Not Eklenemdi", error.message);
  }

  await addDoc(collection(db, "favorites"), favorite);
};

//DELETE CRYPTO
export const deleteCrypto = async (id) => {
  try {
    await deleteDoc(doc(db, "favorites", id));
  } catch (error) {
    console.log(error.message);
    toast.error(
      error.message === "Missing or insufficient permissions."
        ? "İşlem İçin Yetkiniz Yok (Başka Bir Kullanıcı Tarafından Eklendi !"
        : error.message
    );
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
        console.log(id)
        deletePortfolyo(id);
      }
      toast.success("İşlem Gerçekleşti");
    }
  } catch (error) {
    console.log(error.message);
    toast.error("İşlem Gerçekleşmedi", error.message);
  }
};

//DELETE PORTFOLIO
export const deletePortfolyo = async (id) => {
  try {
    await deleteDoc(doc(db, "portfolios", id));
    toast.success("Silindi !");
  } catch (error) {
    console.log(error.message);
    toast.error(
      error.message === "Missing or insufficient permissions."
        ? "İşlem İçin Yetkiniz Yok (Başka Bir Kullanıcı Tarafından Eklendi !"
        : error.message
    );
  }
};

//UPDATE PROFILE
export const upProfile = async (photoURL, displayName) => {
  try {
    await updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
    toast.success("Profil Güncellendi");
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};

//UPDATE PASSWORD
export const UpdatePassword = async (password) => {
  updatePassword(user, password)
    .then(() => {
      toast.success("Şifre Güncelleme Başarılı");
    })
    .catch((error) => {
      // if (error.code === "auth/requires-recent-login") {
      //   store.dispatch(
      //     openModal({
      //       name: "re-auth-modal",
      //     })
      //   );
      // }

      toast.error(
        error.message === "Firebase: Error (auth/requires-recent-login)."
          ? "Tekrar Giriş Yapın"
          : error.message || error.message === "auth/weak-password"
          ? "Şifre En Az 6 Karakter Olmalıdır"
          : error.message
      );
    });
};

//SEND EMAIL VERIFICATION
export const emailVerified = async () => {
  try {
    sendEmailVerification(user).then(() => {
      toast.success("Onay Linki Gönderildi !");
    });
  } catch (error) {
    toast.error(error);
  }
};

//DELETE ACCOUNT
export const deletAccount = async () => {
  await deleteUser(auth.currentUser)
    .then(() => {
      toast.success("Hesabınız Silindi !");
    })
    .catch((error) => {
      toast.warning(error.message);
    });
};

export const reAuth = async (password) => {
  try {
    const credential = await EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );

    const { user } = await reauthenticateWithCredential(
      auth.currentUser,
      credential
    );
    toast.success("Onaylandı !");
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};
