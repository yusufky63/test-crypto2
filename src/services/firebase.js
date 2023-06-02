/* eslint-disable array-callback-return */
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import { setFavorites } from "../redux/favorite/favoriteSlice";
import { setPortfolyo } from "../redux/portfolyo/portfolyoSlice";
import { setOrder } from "../redux/portfolyo/orderHistorySlice";
import { setLastLogin } from "../redux/portfolyo/lastLoginSlice";
import { setBlog } from "../redux/blog/blogSlice";
import { setQuestion } from "../redux/question/questionSlice";
import { setAdmins } from "../redux/user/adminsSlice";
import { setUsers } from "../redux/user/usersSlice";
import { store } from "../redux/store";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { getStorage } from "firebase/storage";

import {
  login as LoginRedux,
  logout as LogoutRedux,
  auth2fa as Auth2faRedux,
} from "../redux/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

const getUserAuth2FA = async (user) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Kullanıcı bulunamadı
      return null;
    }
    const useR = querySnapshot.docs[0].data();
    const auth2fa = useR.auth2fa;
    // Auth2FA durumunu kaydedin
    const auth2faControl = JSON.parse(localStorage.getItem("auth2faCheck"));

    if (auth2faControl && auth2faControl.status === "verified") {
    } else {
      const auth2faCheckData = {
        auth: auth2fa, // Auth2FA durumu (true/false)
        status: auth2fa ? "waiting" : "disable", // Doğrulama durumu ("waiting", "verified", vb.)
      };

      localStorage.setItem("auth2faCheck", JSON.stringify(auth2faCheckData));
    }

    return auth2fa;
  } catch (error) {
    console.log("Hata oluştu:", error);
    return null;
  }
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    getUserAuth2FA(user);

    const auth2faCheckData = JSON.parse(localStorage.getItem("auth2faCheck"));

    if (auth2faCheckData) {
      const auth2fa = auth2faCheckData.auth;
      const status = auth2faCheckData.status;

      if (auth2fa === false || status === "verified") {
        // Redux verilerini yükleme işlemi
        store.dispatch(LoginRedux(user));

        // FAVORITES
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

        // PORTFOLIO
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

        // ORDERS
        onSnapshot(
          query(collection(db, "orders"), where("uid", "==", user.uid)),
          (doc) => {
            store.dispatch(
              setOrder(
                doc.docs.reduce(
                  (orders, order) => [
                    ...orders,
                    { ...order.data(), id: order.id },
                  ],
                  []
                )
              )
            );
          }
        );

        // LAST LOGINS
        onSnapshot(
          query(collection(db, "lastlogins"), where("uid", "==", user.uid)),
          (doc) => {
            store.dispatch(
              setLastLogin(
                doc.docs.reduce(
                  (lastLogins, lastLogin) => [
                    ...lastLogins,
                    { ...lastLogin.data(), id: lastLogin.id },
                  ],
                  []
                )
              )
            );
          }
        );

        // Questions
        onSnapshot(query(collection(db, "questions")), (doc) => {
          store.dispatch(
            setQuestion(
              doc.docs.reduce(
                (questions, question) => [
                  ...questions,
                  { ...question.data(), id: question.id },
                ],
                []
              )
            )
          );
        });

        // isAdmin and Users
        onSnapshot(query(collection(db, "users")), (doc) => {
          const admins = doc.docs
            .map((admin) => {
              const data = admin.data();
              if (data.isAdmin === true || data.isFounder === "true") {
                return { ...data, id: admin.id };
              } else {
                return null;
              }
            })
            .filter((admin) => admin !== null);
          store.dispatch(setAdmins(admins));
          store.dispatch(
            setUsers(doc.docs.map((user) => ({ ...user.data(), id: user.id })))
          );
        });
      } else {
        if (status === "waiting") {
          console.log(status);
          // /auth-checker sayfasına yönlendirme işlemi
          const queryString = new URLSearchParams(user.uid).toString();

          const currentUrl = new URL(window.location.href);
          if (currentUrl.pathname !== "/auth-checker") {
            window.location.href = "/auth-checker?" + queryString;
          }
        }
      }
    } else {
      // Kullanıcı oturumu kapattığında yapılacak işlemler
      localStorage.removeItem("auth2faCheck");
      store.dispatch(setOrder([]));
      store.dispatch(setLastLogin([]));
      store.dispatch(LogoutRedux());
      store.dispatch(setFavorites([]));
      store.dispatch(setPortfolyo([]));
     
    }

    // Blog
    onSnapshot(query(collection(db, "academyblogs")), (doc) => {
      store.dispatch(
        setBlog(
          doc.docs.reduce(
            (blogs, blog) => [...blogs, { ...blog.data(), id: blog.id }],
            []
          )
        )
      );
    });
  }
  else {
    // Kullanıcı oturumu kapattığında yapılacak işlemler
    localStorage.removeItem("auth2faCheck");
    store.dispatch(setOrder([]));
    store.dispatch(setLastLogin([]));
    store.dispatch(LogoutRedux());
    store.dispatch(setFavorites([]));
    store.dispatch(setPortfolyo([]));
    store.dispatch(setQuestion([]));
    store.dispatch(setAdmins([]));
    store.dispatch(setUsers([]));
  }
});

//Error Handling
export const errorMessages = (error) => {
  const errorMessageMap = {
    "auth/weak-password": "Şifre en az 6 karakter olmalıdır.",
    "auth/invalid-email": "Geçersiz E-posta",
    "auth/user-not-found": "Kullanıcı Bulunamadı",
    "auth/email-already-in-use": "Bu e-posta adresi zaten kullanımda.",
    "auth/too-many-requests":
      "Çok fazla giriş denemesi. Lütfen daha sonra tekrar deneyin.",
    "auth/requires-recent-login": "Tekrar Giriş Yapın",
    "auth/user-disabled": "Kullanıcı Engellendi",
    "auth/account-exists-with-different-credential":
      "Bu E-posta Adresi Zaten Kullanımda",
    "auth/missing-email": "E-posta Adresi Giriniz",
    "auth/wrong-password": "Şifre Yanlış",
    "auth/user-token-expired":
      "Kullanıcı oturum süresi doldu. Lütfen tekrar giriş yapın.",
    "auth/user-mismatch":
      "Hatalı kullanıcı kimliği. Lütfen tekrar giriş yapın.",
    "auth/invalid-action-code": "Geçersiz veya süresi dolmuş işlem kodu.",
    "auth/operation-not-allowed": "İşlem izin verilmemiş.",
    "auth/invalid-verification-code": "Geçersiz doğrulama kodu.",
    "auth/network-request-failed": "Ağ hatası. Lütfen tekrar deneyin.",
    "auth/provider-already-linked": "Bu kimlik sağlayıcı zaten kullanımda.",
    "auth/provider-not-found": "Kimlik sağlayıcı bulunamadı.",
    "auth/credential-already-in-use": "Bu kimlik zaten kullanımda.",
    "auth/invalid-credential": "Geçersiz kimlik.",
    "auth/invalid-verification-id": "Geçersiz doğrulama kimliği.",
    "auth/invalid-continue-uri": "Geçersiz devam adresi.",
    "auth/unauthorized-continue-uri": "Devam adresine yetkisiz erişim.",
    "Cancelled by user": "İptal edildi.",
    "auth/email-already-exists": "Bu e-posta adresi zaten kullanımda.",
  };

  const errorMessage = errorMessageMap[error.code] || error.message;
  toast.error(errorMessage);
  console.log(error.message);
};
