import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
const Registrar = () => {
  const [user, setUser] = useState({});
  const [status, setStatus] = useState(false);
  const { fullName, email, username, password, passwordRepeat, phone } = user;
  let history = useHistory();
  //lee contenidos del input
  const onChangeProyecto = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registrarUsuario = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:1337/users";
      const data = {
        username,
        password,
        email,
        fullName,
        phone,
      };
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      toast.success("✔ Se registro con exito!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      history.push("/dashboard");
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
      <ToastContainer />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={(e) => registrarUsuario(e)}>
              <div className="form-group">
                <label>Nombre completo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa tu nombre completo"
                  name="fullName"
                  onChange={onChangeProyecto}
                  value={fullName}
                />
              </div>
              <div className="form-group">
                <label>Nombre de usuario</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa tu nombre completo"
                  name="username"
                  onChange={onChangeProyecto}
                  value={username}
                />
              </div>

              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Ingresa tu email"
                  name="email"
                  onChange={onChangeProyecto}
                  value={email}
                />
              </div>

              <div className="form-group">
                <label>Contrasena</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Escribe tu contrasena"
                  onChange={onChangeProyecto}
                  value={password}
                />
              </div>
              <div className="form-group">
                <label>Verifica contrasena</label>
                <input
                  type="password"
                  placeholder="Repite tu contrasena"
                  className="form-control"
                  name="passwordRepeat"
                  onChange={onChangeProyecto}
                  value={passwordRepeat}
                />
              </div>

              <div className="form-group">
                <label>Numero de telefono</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa tu numero de telefono"
                  name="phone"
                  onChange={onChangeProyecto}
                  value={phone}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registrar;
