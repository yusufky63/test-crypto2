import { db, storage, errorMessages } from "../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

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

export const getImageUrl = async (imageName) => {
  try {
    const url = await getDownloadURL(ref(storage, imageName));
    return url;
  } catch (error) {
    errorMessages(error);
  }
};
