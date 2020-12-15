import React, { useState, useEffect, useContext } from "react";
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/UserContext";
import {
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import "../styles.css";

function Juegos(props) {
  const [juegos, setJuegos] = useState('');
  const [ladoLibre, setLadoLibre] = useState();
  const { userLog, setUserLog } = useContext(UserContext);

  const [winner, setWinner] = useState({
    result: "",
    nader: ""
  });

  useEffect(() => {
    obtenerJuegos();
  }, []);

  const obtenerJuegos = async () => {
    try {
      const url = "http://localhost:1337/juegos";
      const response = await axios.get(url);
      console.log(response.data);
      setJuegos(response.data);


    } catch (error) {
      console.log(error);
    }

  }

  //metodo para jugar
  const jugar = async (id) => {


    if (userLog.ladoPlayer1 === 'Cara') {
      setLadoLibre("Cruz");
    } else {
      setLadoLibre("Cara");
    }

    if (Math.random() < 0.5) {
      setWinner({ result: "Cara" });
    } else {
      setWinner({ result: "Cruz" });
    }


    try {
      const url = `http://localhost:1337/juegos/${id}`;
      const data = {
        player2: userLog.username,
        ladoPlayer2: ladoLibre,
        ganador: winner.result,
      };
      const response = await axios.put(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      obtenerJuegos();
      toast.success("✔ Se registro con exito!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      //history.push("/juegos");
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
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            {juegos != '' ? (
              juegos.map((j) => (
                <table
                  style={{
                    display: "table",
                    margin: "0 auto",
                    border: "1px solid black",
                    border: "1px solid",
                    marginTop: "40px",
                    textAlign: "center",
                    width: "80%",
                  }}
                >
                  <tr>
                    <th>{j.player1}</th>
                    <th>Apuesta: <br />{j.monto}</th>
                    <th>{j.player2}</th>
                  </tr>
                  <tr>
                    <td>{j.ladoPlayer1} {winner.result === j.ladoPlayer1 ? <h2>Ganador</h2> : null}</td>
                    <td>
                      <div className="App">
                        <div id="coin" className={winner.result} key={+new Date()}>
                          <div className="side-a">
                            <h2>-</h2>
                          </div>
                          <div className="side-b">
                            <h2>+</h2>
                          </div>
                        </div>
                      </div>
                      {/* <img
                        width="120"
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                        src={
                          "https://www.alaingarcia.net/conozca/i/50-centavos-mexicoddd.jpg"
                        }
                      ></img> */}
                    </td>
                    {j.player2 === "" ? <button id="btn" style={{ marginTop: -45 }} className="btn btn-primary" onClick={() => jugar(j.id)}>Entrar</button> : <td>{j.ladoPlayer2} {winner.result === j.ladoPlayer2 ? <h2>Ganador</h2> : null}</td>}
                  </tr>
                </table>
              ))


            ) : (<h5>Por el momento no hay datos</h5>
              )
            }
            <Link to="/crear-juego">Nuevo</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Juegos;


