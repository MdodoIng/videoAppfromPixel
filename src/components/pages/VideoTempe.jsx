import { useEffect, useState, useContext } from "react";
import bookIcon from "../../assets/icon-bookmark-empty.svg";
import bookmarkedIcon from "../../assets/icon-bookmark-full.svg";
import tv from "../../assets/icon-nav-tv-series.svg";
import paly from "../../assets/icon-play.svg";
import { AuthContext } from "../../context/AuthContext";
import { createBookmark } from "../../utils/bookmark";


import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import {db, storage } from "../../utils/firebase";



const VideoTempe = ({ classN, videos, searchQuai, bookmark, setBookmark, bookmarkId }) => {
  const [book, setBook] = useState(false);
  const { currentUser, setError, error, bookmarkData } = useContext(AuthContext)


  const handleBookMark = async () => {
    if ( currentUser) {

      
      if (book === false ) {
        
        await addDoc(collection(db, 'bookmark'), {
          videos,
          userID: currentUser.uid,
        })
        setBook(true)
    } else if (book === true) {
      await deleteDoc(doc(db, 'bookmark', bookmarkId))
    }
  } else if ( !currentUser) setError({...error, bookmark: true})
  };

  useEffect(() => {
    const q = bookmarkData?.map(i => i)
    const sss = () =>{
    q?.forEach(element => { 
      if (element.videos.id === videos.id)
      return setBook(true)
    });
    
    }
    return () => {
      sss()
    };
  }, []);
  


  return (
    <div className={`${classN} video_Content`}>
      <div className="imageC">
        <div className="play">
          <span>
            <img src={paly} alt="" />
            <p>Play</p>
          </span>
        </div>
        <img src={videos?.image} alt="" className="video_thumbnail" />
      </div>
      <span
        className="video_bookmark"
        onClick={() => handleBookMark(videos?.id)}
      >
        <img src={!book ? bookIcon : bookmarkedIcon} alt="" />
      </span>
      <div className="video_details">
        <p>{videos?.duration}s</p>
        <span className="dot" />
        <img src={tv} alt="" />
        <p>{videos?.video_files?.map((i) => i?.fps).slice(0, 1)}</p>
        <span className="dot" />
        <p>{videos?.user?.name}</p>
      </div>
      <h2 className="video_name">{videos?.url?.slice(29, 45)}...</h2>
    </div>
  );
};

export default VideoTempe;
