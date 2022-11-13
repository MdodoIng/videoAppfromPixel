import { collection, onSnapshot, query, QuerySnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../utils/firebase";
import { SearchFiled, VideoTempe } from "./";

const Bookmarks = (bookmark, setBookmark) => {
  const { currentUser, bookmarkData } = useContext(AuthContext)
  const bookmarkedName = bookmark?.bookmark?.map((i) => i);

  const Wallpaper = bookmark?.bookmark?.filter(
    (item) => item?.searchQuai?.toString() === "Wallpaper"
  );

  const newVi = bookmark?.bookmark?.filter(
    (item) => item?.searchQuai?.toString() === "new"
  );
  const top = bookmark?.bookmark?.filter(
    (item) =>
      item?.searchQuai?.toString() !== "new" &&
      item?.searchQuai?.toString() !== "Wallpaper"
  );


console.log('first', bookmarkData);



  return (
    <div className="home">
      <SearchFiled />
      <div className="home-recommended">
        {bookmarkData?.length ? (
          <>
          
              <>
                <h1 className="first-heading">Bookmarked New videos</h1>
                <div className="homeVideos-container">
                  <div className="homeGrid">
                    {bookmarkData?.map((i) => (
                      <VideoTempe bookmark={bookmark} setBookmark={setBookmark}
                        classN="videoInHome" bookmarkId={i.id}
                        videos={i?.videos}
                      />
                    ))}
                  </div>
                </div>
              </>
            
            <>
              {Wallpaper.length > 0 && (
                <>
                  <h1 className="first-heading">Bookmarked Wallpaper</h1>
                  <div className="homeVideos-container">
                    <div className="homeGrid">
                      {Wallpaper?.map((i) => (
                        <VideoTempe
                          classN="videoInHome"
                          videos={i?.videos}
                          book
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
            <>
              {top.length > 0 && (
                <>
                  <h1 className="first-heading">Bookmarked Videos</h1>
                  <div className="homeVideos-container">
                    <div className="homeGrid">
                      {top?.map((i) => (
                        <VideoTempe
                          classN="videoInHome"
                          videos={i?.videos}
                          book
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          </>
        ) : (
          <h1
            className="first-heading"
            style={{
              textAlign: "center",
              fontSize: "2.4rem",
              fontWeight: "600",
            }}
          >
            You have no bookmark, nothing to show
          </h1>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
