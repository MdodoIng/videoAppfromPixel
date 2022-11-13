import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../assets/icon-search.svg";

const SearchFiled = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/video/${search}`);
      setSearch("");
    }
  };

  return (
    <div className="searchFiled">
      <form action="" className="searchFilled_form" onSubmit={handleSubmit}>
        <img src={searchIcon} alt="" />
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search if you not a premium member"
        />
      </form>
    </div>
  );
};

export default SearchFiled;
