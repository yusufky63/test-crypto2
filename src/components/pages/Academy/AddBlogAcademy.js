import React, {useState} from "react";
import {AddAcademyBlog, AddAcademyBlogPhoto} from "../../../services/firebase";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
const AddBlogAcademy = () => {
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);

  const {user} = useSelector((state) => state.auth);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const downloadUrl = await AddAcademyBlogPhoto(file);
    setDownloadUrl(downloadUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (header && content && downloadUrl) {
      await AddAcademyBlog({
        mail: user.email,
        displayName: user.displayName && user.displayName,
        header,
        content,
        date: new Date(),
        image: downloadUrl,
        uid: user.uid,
      });
      setHeader("");
      setContent("");
      setDate("");
      setImage(null);
    } else {
      toast.warning("Lütfen tüm alanları doldurunuz!");
    }
  };

  return (
    <div className="flex justify-center items-start mt-10 m-5 text-left">
      <div className="w-full max-w-7xl" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block  tracking-wide text-gray-700  font-bold mb-2"
              htmlFor="header"
            >
              Başlık
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              id="header"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block  tracking-wide text-gray-700  font-bold mb-2"
              htmlFor="content"
            >
              İçerik
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block  tracking-wide text-gray-700 font-bold mb-2"
              htmlFor="photo"
            >
              Resim Ekle
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="file"
              id="photo"
              onChange={handleUpload}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            {downloadUrl && (
              <img
                src={downloadUrl}
                className=" max-w-[450px] border p-3 rounded-sm flex justify-center"
                alt="uploaded"
              />
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            Ekle
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddBlogAcademy;
