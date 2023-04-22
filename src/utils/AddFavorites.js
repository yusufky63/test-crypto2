import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";

function AddFavorites({ id }) {
  const { favori } = useSelector((state) => state.favorites);

  const data = favori.find((item) => item.name === id);
  if (data) {
    return <AiTwotoneHeart fontSize={30} color="red"></AiTwotoneHeart>;
  } else {
    return <AiOutlineHeart fontSize={30} color="black"></AiOutlineHeart>;
  }
}
export default AddFavorites;
