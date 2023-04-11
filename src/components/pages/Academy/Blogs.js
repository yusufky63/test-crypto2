import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {deleteBlog} from "../../../services/firebase";

function Blogs() {
  const {blog} = useSelector((state) => state.blogs);
  const {user} = useSelector((state) => state.auth);
  const readTime = (blogData) => {
    if (blogData.content) {
      const wordsPerMinute = 200;
      const noOfWords = blogData.content.split(/\s/g).length;
      const minutes = noOfWords / wordsPerMinute;
      const readTime = Math.ceil(minutes);
      return readTime;
    }
  };

  const handleDelete = (id) => {
    deleteBlog(id);
  };

console.log(blog);
  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Blog Yazıları</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blog.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col mx-5"
            >
              <div className="relative h-48">
                <img
                  className="absolute inset-0 w-full h-full p-1 rounded-lg object-cover"
                  src={item.image}
                  alt={item.header}
                />
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <h2 className="text-xl font-bold mb-2 text-start flex-1">
                  {item.header}
                </h2>
                <div className="flex flex-col  text-start  mt-4">
                  <div className="text-gray-500 text-xs">
                    <span className="text-gray-600 font-semibold ">
                      Okuma Süresi :{" "}
                    </span>
                    {readTime(item)} dk
                  </div>
                  <div className="text-gray-500 text-xs mt-2">
                    <span className="text-gray-600 font-semibold">
                      Yayınlama Tarihi :{" "}
                    </span>
                    {new Date(item.date.toDate()).toLocaleString()}
                  </div>
                </div>
                {/* <div className="mt-2 flex-1">
                  <p className="text-gray-600 leading-snug text-sm">
                    {item.description}
                  </p>
                </div> */}
                <div className="bg-gray-100 px-4 py-2 mt-4 flex justify-between">
                  <Link
                    to={`/academia/${item.id}`}
                    className="block text-center text-gray-600 hover:text-gray-800 font-semibold"
                  >
                    Devamını Oku...
                  </Link>{" "}
                  {/* {user && user.email === "codexsha@gmail.com" && (
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500  mx-3.5 hover:text-red-600 font-semibold"
                    >
                      Sil
                    </button>
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
