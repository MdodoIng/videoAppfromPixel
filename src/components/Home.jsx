import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchPixelsAPI } from "../utils/api";
import { SearchFiled, Trending, VideoTempe } from "./";

const Home = ({
  selectCategory,
  trending,
  setSelectCategory,
  bookmark,
  setBookmark,data,
  searchQuai
}) => {
  const {error, setError} = useContext(AuthContext)
  const { searchTerm } = useParams();

  const heading = () => {
    switch (selectCategory) {
      case "home":
        return "Recommended for you";
      case "video":
        return "New videos";
      case "radio":
        return "Wallpaper";
      case searchTerm:
        return `Found ${data?.total_results} results for '${searchTerm}'`;
    }
  };

  
  const book = (id) => {
    if (id && bookmark ) {

     return bookmark?.map(i => i?.id) === id
    }
  }

  if(error.bookmark) {
    setTimeout(() => {
      setError({...error, bookmark: false})
    }, 3000)
  }

return (
  <div className="home">
    {error.bookmark && <div className="error">
      <p>
      Please login to bookmark
      </p>
    </div>}
      <SearchFiled />
      {selectCategory === "home" && 
      <Trending 
      trending={trending} setBookmark={setBookmark} bookmark={bookmark}/>}
      <div className="home-recommended">
        <h1 className="first-heading">{heading()}</h1>
        <div className="homeVideos-container">
          <div className="homeGrid">
            {data?.videos?.map((video) => (
              <VideoTempe
              classN="videoInHome"
              key={video?.id}
              videos={video}
                searchQuai={searchQuai}
                bookmark={bookmark}
                setBookmark={setBookmark}
                book={book(video?.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Home;
