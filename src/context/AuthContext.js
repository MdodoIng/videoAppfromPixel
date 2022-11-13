import { createContext, useEffect, useState} from "react";
import { auth, db } from "../utils/firebase";
import { onAuthStateChanged} from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({})
  const [error, setError] = useState({bookmark: false})
  const [bookmarkData, setBookmarkData] = useState(null);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
      
    });
    return () => {
      unSub();
    }
  }, []);
  useEffect(() => {
    const q = query(collection(db, 'bookmark'))
    const unsub = onSnapshot(q, (querySnapshot) => {
      let bookmarksFF = []
      querySnapshot.forEach((doc) => {
        if(doc.data().userId === currentUser.uid) bookmarksFF.push({...doc.data(), id: doc.id})
      })
      setBookmarkData(bookmarksFF)
    })
    return () => {
      unsub()
    }
  }, []);
  

  return (
    <AuthContext.Provider value={{ currentUser, error, setError, bookmarkData }}>
      {children}
    </AuthContext.Provider>
  )
  
}