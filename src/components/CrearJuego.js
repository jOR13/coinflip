import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

function CrearJuego(props) {
  //context user
  const { userLog, setUserLog } = useContext(UserContext);
  const [juego, setJuego] = useState({});
  const { player1, ladoPlayer1, player2, ladoPlayer2, ganador, monto } = juego;
  let history = useHistory();

  const onChangeProyecto = (e) => {
    setJuego({
      ...juego,
      [e.target.name]: e.target.value,
    });
  };

  const registrarJuego = async (e) => {
    e.preventDefault();

    console.log(userLog);

    try {
      const url = "http://localhost:1337/juegos";
      const data = {
        player1: userLog.username,
        ladoPlayer1: ladoPlayer1,
        player2: "",
        ladoPlayer2: "",
        ganador: "",
        monto: monto,
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

      history.push("/juegos");
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
      <h1>Registrar</h1>
      <div className="row">
        <div className="col-6" style={{ marginLeft: 30, marginTop: 30 }}>
          <form onSubmit={(e) => registrarJuego(e)}>
            <div className="form-group">
              <label>Cantidad</label>
              <input
                type="number"
                className="form-control"
                aria-describedby="apuestaHelp"
                name="monto"
                onChange={onChangeProyecto}
                value={monto}
              />
              <small id="apuestaHelp" class="form-text text-muted">
                La cantidad se descontara automaticamente de tu cartera.
              </small>
            </div>

            <div className="form-group">
              <label>Lado:</label> {"   "}
              <select
                name="ladoPlayer1"
                value={ladoPlayer1}
                onChange={onChangeProyecto}
              >
                <option value=""></option>
                <option value="Cara">Cara</option>
                <option value="Cruz">Cruz</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Crear
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CrearJuego;
