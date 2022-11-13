import { useEffect, useState } from "react";
import { Home, Navbar, Bookmarks, Auth } from "./components";
import { fetchPixelsAPI } from "./utils/api";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

function App() {
  const [selectCategory, setSelectCategory] = useState("home");
  const [trending, setTreading] = useState([]);
  const [bookmark, setBookmark] = useState([]);
  const [data, setData] = useState([]);
  const { searchTerm } = useParams();
  const searchQuai = () => {
    switch (selectCategory) {
      case "home":
        return "new";
      case "video":
        return "Top";
      case "radio":
        return "Wallpaper";
      case searchTerm:
        return searchTerm;
    }
  };

  useEffect(() => {
    fetchPixelsAPI("videos/popular?per_page=15?").then((data) =>
      setTreading(data)
    );
  }, []);

  useEffect(() => {
    fetchPixelsAPI(
      `videos/search?orientation=landscape&query=${searchQuai()}&per_page=80`
    ).then((data) => setData(data));
    if (searchTerm) return setSelectCategory(searchTerm);
  }, [searchQuai(), searchTerm]);

  return (
    <Router>
      <div className="container">
        <div className="navContainer">
          <Navbar
            selectCategory={selectCategory}
            setSelectCategory={setSelectCategory}
          />
        </div>
        <div className="HomeContainer">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  selectCategory={selectCategory}
                  trending={trending}
                  setSelectCategory={setSelectCategory}
                  bookmark={bookmark}
                  setBookmark={setBookmark}
                  data={data}
                  searchQuai={searchQuai}
                />
              }
            />
            <Route
              path="/video/:searchTerm"
              element={
                <Home
                  selectCategory={selectCategory}
                  trending={trending}
                  setSelectCategory={setSelectCategory}
                  searchQuai={searchQuai}
                  bookmark={bookmark}
                  setBookmark={setBookmark}
                  data={data}
                />
              }
            />
            <Route
              path="/bookmarks"
              element={
                <Bookmarks bookmark={bookmark} setBookmark={setBookmark} />
              }
            />
            <Route path="/auth/:auth" element={<Auth />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
