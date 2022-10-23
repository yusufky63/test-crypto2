import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import { setFavorites } from "../components/redux/favorite/favoriteSlice";
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
} from "firebase/auth";

import {
  doc,
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
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
    toast.error(error);
  }
};

//LOGIN
export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Giriş Başarılı", user.email);

    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

//RESET PASSWORD
export const resetPasword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Şifre Sıfırlama Maili Gönderildi");
    return true;
  } catch (error) {
    toast.error("Lütfen Geçerli bir Mail Adresi Giriniz !", error.message);
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
    store.dispatch(LoginRedux(user));
    console.log("onAuthStateChanged", user);
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
      store.dispatch(LoginRedux(result));
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
      store.dispatch(LoginRedux(result.user));
      toast.success("Github İle Giriş Yapıldı");
      window.location.href = "/";
    })
    .catch(function (error) {
      toast.error("Github ile giriş yapılamadı!", error.message);
      console.log(error.message);
    });
};



//ADD NOTE
export const addNote = async (favorite) => {
  try {
    const result = await addDoc(collection(db, "favorites"), favorite);
    return result.id;
  } catch (error) {
    toast.error("Not Eklenemdi", error.message);
  }

  await addDoc(collection(db, "favorites"), favorite);
};

//DELETE NOTE
export const deleteNote = async (id) => {
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