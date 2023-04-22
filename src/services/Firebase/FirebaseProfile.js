/* eslint-disable array-callback-return */
import { toast } from "react-toastify";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
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
  getDoc,
  doc,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import { auth, db, errorMessages } from "../firebase";

export const register = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);

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

//LOGIN
export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
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
    errorMessages(error);
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
      }
      toast.success("Github İle Giriş Yapıldı");
      window.location.href = "/";
    })
    .catch(function (error) {
      errorMessages(error);
    });
};

//RESET PASSWORD
export const resetPassword = async (email) => {
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
    errorMessages(error);
  }
};
