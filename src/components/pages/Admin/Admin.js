import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteBlogAdmin } from "../../../services/Firebase/FirebaseAdmin";
import { deleteQuestion } from "../../../services/Firebase/FirebaseQuestion";

function Admin() {
  const { blog } = useSelector((state) => state.blogs);
  const { question } = useSelector((state) => state.questions);

  const handleDeleteBlog = (id) => {
    deleteBlogAdmin(id);
  };

  const handleDeleteQuestion = (id) => {
    deleteQuestion(id);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Admin Paneli</h1>
      <div className="max-w-7xl flex flex-wrap justify-center gap-2">
        <>
          <Link
            to="/admin/add-question"
            className="bg-gray-600 p-2 text-white rounded"
          >
            Soru Ekle
          </Link>
          <Link
            to="/admin/add-blog"
            className="bg-gray-600 p-2 text-white rounded"
          >
            Blog Ekle
          </Link>
          <Link
            to="/admin/add-admin"
            className="bg-gray-600 p-2 text-white rounded"
          >
            Admin Ekle
          </Link>
          <div className="w-full text-left m-2">
            <div>
              <div className="w-full border-collapse">
                <div>
                  <div className="font-bold text-lg flex justify-between">
                    <div className="text-left text-2xl font-bold shadow-md rounded w-full px-4 py-2">
                      Bloglar
                    </div>
                  </div>
                </div>
                <div>
                  {blog &&
                    blog.map((blog, index) => (
                      <div
                        className="flex shadow-md rounded w-full items-center my-2"
                        key={blog.id}
                      >
                        <div className="bg-gray-500 text-white rounded px-3 py-1 m-2">
                          {index + 1}
                        </div>
                        <div className="px-4 py-2 w-full">{blog.header}</div>
                        <div className=" flex justify-between  flex-col md:flex-row  text-center w-1/3 items-center px-4 py-2">
                          <Link
                            to={`/admin/edit-blog/${blog.id}`}
                            className="p-2 m-1 rounded-lg hover:bg-gray-300 shadow-md w-full "
                          >
                            Düzenle
                          </Link>
                          <Link
                            to={`/academia/${blog.id}`}
                            className="p-2 rounded-lg m-1 hover:bg-gray-300 shadow-md w-full"
                          >
                            Görüntüle
                          </Link>
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="p-2 flex justify-center  m-1 rounded-lg text-red-600 hover:bg-red-600 hover:text-white shadow-md md:w-24 w-full "
                          >
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full text-left">
            <div>
              <div className="w-full border-collapse">
                <div>
                  <div className="flex justify-between font-bold text-lg">
                    <div className="shadow-md rounded  w-full px-4 py-2 text-2xl font-bold">
                      Sorular
                    </div>
                  </div>
                </div>
                <div>
                  {question &&
                    question.map((question, index) => (
                      <div
                        className="flex shadow-md rounded w-full items-center my-2 "
                        key={question.id}
                      >
                        <div className="bg-gray-500 text-white rounded  border-gray-300 px-3 py-1 m-2">
                          {index + 1}
                        </div>
                        <div className=" px-4 py-2 w-full">
                          {question.question}
                        </div>
                        <div className=" flex justify-between  flex-col md:flex-row  text-center w-1/4 items-center px-4 py-2">
                          <Link
                            to={`/admin/edit-question/${question.id}`}
                            className="p-2 m-1 rounded-lg hover:bg-gray-300 shadow-md w-full"
                          >
                            Düzenle
                          </Link>
                          <button
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="p-2 flex  m-1 justify-center  rounded-lg text-red-600 hover:bg-red-600 hover:text-white shadow-md w-24 "
                          >
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default Admin;
