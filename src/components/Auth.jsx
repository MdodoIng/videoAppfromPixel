import { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import { useParams, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { storage, db, auth as authFire } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Loading from "./pages/Loading";


const Auth = () => {
  const [login, setLogin] = useState(true);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFromValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFromError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { auth } = useParams();
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (auth === "signin") {
      try {
        const res = await createUserWithEmailAndPassword(
          authFire,
          email,
          password
        );

        const date = new Date().getTime();
        const storageRef = ref(storage, `${email + date}`);

        // await uploadBytesResumable(storageRef).then(() => {
        //   getDownloadURL(storageRef).then(async (downloadURL) => {
        //     try {
        //       await updateProfile(res.user, {
        //         photoURL: downloadURL,
        //       });

        //       await setDoc(doc(db, "users", res.user.uid), {
        //         uid: res.user.uid,
        //         email,
        //         photoURL: downloadURL,
        //       });

        //       await setDoc(doc, (db, "userBooks", res.user.uid), {});
        //       console.log('first');
        
        //     } catch (error) {
          //       console.log(error);
          //       setErr(true);
          //       setLoading(false);
          //     }
          //   });
          // });
          
      navigate("/");
      } catch (error) {
        setErr(true);
        setLoading(false);
        console.log(error);
      }
    }
    if (auth === "login") {
      try {
        await signInWithEmailAndPassword(authFire, email, password);
        navigate("/");
      } catch (error) {
        setErr(true);
      }
    }
    setLoading(false)
  };

  const handleClick = () => {
    if (auth === "signin") {
      setLogin(true);
      navigate("/auth/login");
    } else {
      setLogin(false);
      navigate("/auth/signin");
    }
  };
  const iconClick = () => navigate("/");
  useEffect(() => {
    if (auth === "login") {
      setLogin(true);
    } else setLogin(false);
  }, []);

  const handleChange = (e) => {
    const { placeholder, value } = e.target;

    if (placeholder === "Email address") {
      setFromValues({ ...formValues, email: value });
      const reqex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

      if (!formValues.email) {
        setFromError({ ...formError, email: "Can't be blank" });
      } else if (!reqex.test(formValues.email)) {
        setFromError({ ...formError, email: "Invalid email" });
      } else return setFromError({ ...formError, email: "" });
    }

    if (placeholder === "Password") {
      setFromValues({ ...formValues, password: value });
      if (!formValues.password) {
        setFromError({ ...formError, password: "Can't be blank" });
      } else return setFromError({ ...formError, password: "" });
    }

    if (placeholder === "Confirm Password") {
      setFromValues({ ...formValues, confirmPassword: value });

      if (!formValues.confirmPassword) {
        setFromError({ ...formError, confirmPassword: "Can't be blank" });
      } else if (formValues.confirmPassword !== formValues.password) {
        setFromError({
          ...formError,
          confirmPassword: "This password does not match",
        });
      } else return setFromError({ ...formError, confirmPassword: "" });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <img
          src={logo}
          alt=""
          width={34}
          style={{ cursor: "pointer" }}
          onClick={iconClick}
        />
        <form action="" onSubmit={loginSubmit}>
          <label htmlFor="">{login ? "Login" : "Sign Up"}</label>
          <div className="inputBox">
            <input
              type="email"
              placeholder="Email address"
              required
              value={formValues.email}
              onChange={handleChange}
            />

            <small>{formError.email}</small>
          </div>

          <div className="inputBox">
            <input
              type="password"
              placeholder="Password"
              required
              value={formValues.password}
              onChange={handleChange}
            />
            <small>{formError.password}</small>
          </div>
          {!login && (
            <div className="inputBox">
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={formValues.confirmPassword}
                onChange={handleChange}
              />
              <small>{formError.confirmPassword}</small>
            </div>
          )}

          <button>{login ? "Login to your account" : "Create account"}</button>

          <p>
            {login ? "Don't have an account?" : "already have an account?"}

            <span onClick={handleClick}>{login ? "Sign Up" : "Login"}</span>
          </p>
        </form>
        {loading && <Loading />}
      </div>
    </div>
  );
};

export default Auth;
