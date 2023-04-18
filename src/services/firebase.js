/* eslint-disable array-callback-return */
import {initializeApp} from "firebase/app";
import {toast} from "react-toastify";
import {setFavorites} from "../components/redux/favorite/favoriteSlice";
import {setPortfolyo} from "../components/redux/portfolyo/portfolyoSlice";
import {setOrder} from "../components/redux/portfolyo/orderHistorySlice";
import {setLastLogin} from "../components/redux/portfolyo/lastLoginSlice";
import {setBlog} from "../components/redux/blog/blogSlice";
import {setQuestion} from "../components/redux/question/questionSlice";

import {setAdmins} from "../components/redux/user/adminsSlice";
import {setUsers} from "../components/redux/user/usersSlice";

import {store} from "../components/redux/store";
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
  setDoc,
  getDocs,
  getDoc,
  doc,
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import {
  login as LoginRedux,
  logout as LogoutRedux,
  auth2fa as Auth2faRedux,
} from "../components/redux/auth";

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
export const auth2fa = false;
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

//REGISTER
export const register = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    // "users" koleksiyonundaki belgeyi al
    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);

    // Kullanıcının verilerini güncelle veya yeni bir belge oluştur
    if (docSnap.exists()) {
      console.log("Kullanıcı zaten kayıtlı");
    } else {
      await setDoc(userDoc, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        isAdmin: false,
      });
      console.log("Kullanıcı başarıyla kaydedildi");
    }
  } catch (error) {
    console.log(error);
  }
};

export const auth2faCheck = async () => {
  onSnapshot(
    query(collection(db, "users"), where("uid", "==", auth.currentUser.uid)),
    (snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.data().auth2fa) {
          console.log("2FA");
          window.location.href = "/auth-checker";
        }
      });
    }
  );
};

//LOGIN
export const login = async (email, password) => {
  try {
    const {user} = await signInWithEmailAndPassword(auth, email, password);
    // "users" koleksiyonundaki belgeyi al
    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);
    // Kullanıcının verilerini güncelle veya yeni bir belge oluştur
    if (!docSnap.exists()) {
      await setDoc(userDoc, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        isAdmin: false,
        uid: user.uid,
        auth2fa: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//GOOGLE AUTH
const googleProvider = new GoogleAuthProvider();

// Google Signin Function
export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);
    if (!docSnap.exists()) {
      await setDoc(userDoc, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        isAdmin: false,
        uid: user.uid,
        auth2fa: false,
      });
      auth2faCheck();
    }
  } catch (error) {
    errorMessages(error);
  }
};

//GITHUB AUTH
const providerGithub = new GithubAuthProvider();
export const githubLogin = async () => {
  await signInWithPopup(auth, providerGithub)
    .then(function (result) {
      auth2faCheck();
      toast.success("Github İle Giriş Yapıldı");
      const userDoc = doc(db, "users", result.uid);
      const docSnap = getDoc(userDoc);
      // Kullanıcının verilerini güncelle veya yeni bir belge oluştur
      if (!docSnap.exists()) {
        setDoc(userDoc, {
          name: result.displayName,
          email: result.email,
          photoURL: result.photoURL,
          isAdmin: false,
          uid: result.uid,
          auth2fa: false,
        });
        toast.success("Kullanıcı başarıyla kaydedildi");
      }

      window.location.href = "/";
    })
    .catch(function (error) {
      toast.error("Github ile giriş yapılamadı!", error.message);
      errorMessages(error);
    });
};

//RESET PASSWORD
export const resetPasword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Şifre Sıfırlama Maili Gönderildi");
    return true;
  } catch (error) {
    errorMessages(error);

    return false;
  }
};

//LOGOUT
export const logout = async () => {
  try {
    await signOut(auth);
    window.location.href = "/";
    toast.success("Çıkış Başarılı");
    return true;
  } catch (error) {
    errorMessages(error);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(LoginRedux(user));
    store.dispatch(Auth2faRedux(user));
    if (Auth2faRedux) {
      //FAVORITES
      onSnapshot(
        query(collection(db, "favorites"), where("uid", "==", user.uid)),
        (doc) => {
          store.dispatch(
            setFavorites(
              doc.docs.reduce(
                (favorites, favori) => [
                  ...favorites,
                  {...favori.data(), id: favori.id},
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
                  {...portfolyo.data(), id: portfolyo.id},
                ],
                []
              )
            )
          );
        }
      );
      //ORDERS
      onSnapshot(
        query(collection(db, "orders"), where("uid", "==", user.uid)),
        (doc) => {
          store.dispatch(
            setOrder(
              doc.docs.reduce(
                (orders, order) => [...orders, {...order.data(), id: order.id}],
                []
              )
            )
          );
        }
      );
      //lAST LOGINS
      onSnapshot(
        query(collection(db, "lastlogins"), where("uid", "==", user.uid)),
        (doc) => {
          store.dispatch(
            setLastLogin(
              doc.docs.reduce(
                (lastLogins, lastLogin) => [
                  ...lastLogins,
                  {...lastLogin.data(), id: lastLogin.id},
                ],
                []
              )
            )
          );
        }
      );
      //Questions
      onSnapshot(query(collection(db, "questions")), (doc) => {
        store.dispatch(
          setQuestion(
            doc.docs.reduce(
              (questions, question) => [
                ...questions,
                {...question.data(), id: question.id},
              ],
              []
            )
          )
        );
      });
    } else {
      store.dispatch(setOrder([]));
      store.dispatch(setLastLogin([]));
      store.dispatch(LogoutRedux());
      store.dispatch(setFavorites([]));
      store.dispatch(setPortfolyo([]));
    }
  } else {
    store.dispatch(setOrder([]));
    store.dispatch(setLastLogin([]));
    store.dispatch(LogoutRedux());
    store.dispatch(setFavorites([]));
    store.dispatch(setPortfolyo([]));
  }
  //Blog
  onSnapshot(query(collection(db, "academyblogs")), (doc) => {
    store.dispatch(
      setBlog(
        doc.docs.reduce(
          (blogs, blog) => [...blogs, {...blog.data(), id: blog.id}],
          []
        )
      )
    );
  });

  //isAdmin and Users
  onSnapshot(query(collection(db, "users")), (doc) => {
    const admins = doc.docs
      .map((admin) => {
        const data = admin.data();
        if (data.isAdmin === true) {
          return {...data, id: admin.id};
        } else {
          return null;
        }
      })
      .filter((admin) => admin !== null);

    store.dispatch(setAdmins(admins));

    store.dispatch(
      setUsers(doc.docs.map((user) => ({...user.data(), id: user.id})))
    );
  });
});

//ADD CRYPTO
export const addCrypto = async (favorite) => {
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
export const deleteCrypto = async (id) => {
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

//PROFILE

//UPDATE PROFILE
export const upProfile = async (photoURL, displayName) => {
  try {
    await updateProfile(auth.currentUser, {
      displayName,
      photoURL,
      auth2fa: true,
    });
    toast.success("Profil Güncellendi");
  } catch (error) {
    errorMessages(error);
  }
};

//UPDATE PASSWORD
export const UpdatePassword = async (password) => {
  updatePassword(auth.currentUser, password)
    .then(() => {
      toast.success("Şifre Güncelleme Başarılı");
    })
    .catch((error) => {
      errorMessages(error);
    });
};

//SEND EMAIL VERIFICATION
export const emailVerified = async () => {
  try {
    sendEmailVerification(auth.currentUser).then(() => {
      toast.success("Onay Linki Gönderildi !");
    });
  } catch (error) {
    errorMessages(error);
  }
};

//DELETE ACCOUNT
export const deletAccount = async () => {
  await deleteUser(auth.currentUser)
    .then(() => {
      toast.success("Hesabınız Silindi !");
    })
    .catch((error) => {
      errorMessages(error);
    });
};

export const reAuth = async (password) => {
  try {
    const credential = await EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );

    const {user} = await reauthenticateWithCredential(
      auth.currentUser,
      credential
    );
    toast.success("Onaylandı !");
    return user;
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

//ADD LOGIN HISTORY
export const lastLoginIP = async (loginData) => {
  try {
    const result = await addDoc(collection(db, "lastlogins"), loginData);
    return result.id;
  } catch (error) {
    errorMessages(error);
  }
  await addDoc(collection(db, "lastlogins"), loginData);
};

//ADD AcademyBlog

export const AddAcademyBlog = async (academyBlog) => {
  try {
    const result = await addDoc(collection(db, "academyblogs"), academyBlog);
    toast.success("Blog Eklendi");
    return result.id;
  } catch (error) {
    errorMessages(error);
  }
};

//EditAcademyBlog
export const EditAcademyBlog = async (id, data) => {
  try {
    await updateDoc(doc(db, "academyblogs", id), data);
    toast.success("Blog Güncellendi");
  } catch (error) {
    console.log(error);
  }
};

//ADD AcademyBlog Photo

export const AddAcademyBlogPhoto = async (academyBlogPhoto) => {
  const storageRef = ref(storage, "academyblogs/" + academyBlogPhoto.name);
  const uploadTask = uploadBytesResumable(storageRef, academyBlogPhoto);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress === 100) {
          toast.success("Fotoğraf Yüklendi");
        }
      },
      (error) => {
        errorMessages(error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        resolve(downloadURL);
      }
    );
  });
};

export const deleteBlog = async (id) => {
  try {
    if (id) {
      await deleteDoc(doc(db, "academyblogs", id));
      toast.success("Blog Silindi");
    }
  } catch (error) {
    errorMessages(error);
  }
};

export const getImageUrl = async (imageName) => {
  try {
    const url = await getDownloadURL(ref(storage, imageName));
    return url;
  } catch (error) {
    errorMessages(error);
  }
};

//Auth2FA

export const auth2FA = async (id, secretKey, backupCode) => {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      auth2fa: true,
      Auth2FAcreatedAt: new Date(),
      secretKey: secretKey,
      backupCode: backupCode,
    });
  } catch (error) {
    console.log(error);
    toast.warning("İşlem Gerçekleştirilemedi: ", error);
  }
};

// Delete 2FA

export const delete2FA = async (id) => {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      auth2fa: false,
      Auth2FAcreatedAt: null,
      secretKey: null,
      backupCode: null,
    });
  } catch (error) {
    console.log(error);
    errorMessages(error);
  }
};

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
    const result = await addDoc(collection(db, "scores"), data);
    return result.id;
  } catch (error) {
    errorMessages(error);
  }
};

//Get Score Top 3
export const getScoreTop3 = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "scores"),           
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

// User Delete Function
export const DeleteUser = async (userId) => {
  try {
    await db.collection("users").doc(userId).delete();
  } catch (error) {
    console.error("Error deleting user: ", error);
  }
};

// Admin Add Function
export const setAdmin = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    if (userData.isAdmin === true && !userData.isFounder) {
      await updateDoc(userRef, {isAdmin: false});
      toast.info("Admin Yetkisi Kaldırıldı");
    } else if (userData.isAdmin === false) {
      await updateDoc(userRef, {isAdmin: true});
      toast.success("Admin Yetkisi Verildi");
    } else {
      toast.info("Kurucu Admin");
    }
  } catch (error) {
    console.log(error);
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
    users.push({...doc.data(), id: doc.id});
  });
  return users;
};
//Error Handling
const errorMessages = (error) => {
  toast.error(
    error.message ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ? "Şifre en az 6 karakter olmalıdır."
      : error.message === "Firebase: Error (auth/invalid-email)."
      ? "Geçersiz E-posta" === "Firebase: Error (auth/user-not-found)."
      : error.message === "Firebase: Error (auth/email-already-in-use)."
      ? "Bu e-posta adresi zaten kullanımda."
      : error.message ===
        "Firebase: The email address is badly formatted. (auth/invalid-email)."
      ? "Geçersiz E-posta"
      : error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ? "Şifre en az 6 karakter olmalıdır."
      : error.message === "Firebase: Error (auth/user-not-found)."
      ? "Kullanıcı Bulunamadı"
      : error.message === "Firebase: Error (auth/wrong-password)."
      ? "Şifre Yanlış"
      : error.message === "Firebase: Error (auth/too-many-requests)."
      ? "Çok fazla giriş denemesi. Lütfen daha sonra tekrar deneyin."
      : error.message === "Missing or insufficient permissions."
      ? "İşlem İçin Yetkiniz Yok (Başka Bir Kullanıcı Tarafından Eklendi !"
      : error.message === "Firebase: Error (auth/requires-recent-login)."
      ? "Tekrar Giriş Yapın"
      : error.message === "auth/weak-password"
      ? "Şifre En Az 6 Karakter Olmalıdır"
      : error.message === "Firebase: Error (auth/user-disabled)."
      ? "Kullanıcı Engellendi"
      : error.message ===
        "Firebase: Error (auth/account-exists-with-different-credential)."
      ? "Bu E-posta Adresi Zaten Kullanımda"
      : error.message === "Firebase: Error (auth/missing-email)."
      ? "E-posta Adresi Giriniz"
      : error.message === "Firebase: Error (auth/invalid-email)."
      ? "Geçersiz E-posta"
      : error.message
  );
  console.log(error.message);
};
