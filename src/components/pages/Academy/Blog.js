import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
function Blog() {
  const {id} = useParams();
  const {blog} = useSelector((state) => state.blogs);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const data = blog.find((item) => item.id === id);
    setBlogData(data);
  }, [blog, id]);
  const readTime = () => {
    if (blogData.content) {
      const wordsPerMinute = 200;
      const noOfWords = blogData.content.split(/\s/g).length;
      const minutes = noOfWords / wordsPerMinute;
      const readTime = Math.ceil(minutes);
      return readTime;
    }
  };
  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="">
            {id && (
              <div
                key={blogData.id}
                className="bg-white rounded-lg overflow-hidden "
              >
                <h3 className="font-semibold text-4xl m-5 text-left" dangerouslySetInnerHTML={{__html: blogData.header}}>
               
                </h3>

                <img
                  className=" w-full max-h-96 min-h-96 rounded-lg bg-cover object-center p-3 "
                  src={blogData.image}
                  alt={blogData.header}
                />
                <p className="text-gray-500 text-start">Okuma Süresi: {`${readTime()} dk`}</p>
                <div className="w-full h-[0.5px] bg-gray-300 "></div>
                <div className="p-4">
                  <p className="text-gray-700 text-left whitespace-pre-wrap" dangerouslySetInnerHTML={{__html: blogData.content}}>
                   
                  </p>
                  <p className="text-gray-600 text-sm mt-2"></p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
