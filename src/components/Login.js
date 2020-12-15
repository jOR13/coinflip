import React, { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { UserContext } from "../context/UserContext";

const Login = () => {
  let history = useHistory();
  //context user
  const { userLog, setUserLog } = useContext(UserContext);
  const [user, setUser] = useState({});
  const { email, password } = user;

  //lee contenidos del input
  const onChangeProyecto = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const inciarSesion = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:1337/auth/local";
      const data = {
        identifier: email,
        password: password,
      };
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data.user);
      setUser(response.data.user);

      setUserLog(response.data.user);

      localStorage.setItem('user', response.data.user.fullName);

      // if (userLog != "") {
      //   history.push("/dashboard");
      // }

      toast.success("✔ Se registro con exito!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
      toast.error("Revise que sus datos sean correctos", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      {/* {userLog === "" ? ( */}
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={(e) => inciarSesion(e)}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    name="email"
                    onChange={onChangeProyecto}
                    value={email}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    placeholder="Password"
                    onChange={onChangeProyecto}
                    value={password}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <ToastContainer />
              </form>
              <Link to="/registrar">Registrarse</Link>
            </div>
          </div>
        </div>
      {/* // ) : (
      //   <h1>Bienvenido {userLog}</h1>
      // )} */}
    </>
  );
};

export default Login;
