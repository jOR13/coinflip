import React from "react";

function Juegos(props) {
  const [juegos, setJuegos] = React.useState([
    {
      amount: 55,
      player1: {
        name: "John",
        side: "Cara",
        photo: "",
      },
      player2: {
        name: "Lola",
        side: "Aguila",
        photo: "",
      },
    },
  ]);

  return (
    <>
      {juegos.map((j) => (
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
            <th>{j.player1.name}</th>
            <th>Apuesta: <br/>{j.amount}</th>
            <th>{j.player2.name}</th>
          </tr>
          <tr>
            <td>{j.player1.side}</td>
            <td>
              <img
                width="120"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
                src={
                  "https://www.alaingarcia.net/conozca/i/50-centavos-mexico.jpg"
                }
              ></img>
            </td>
            <td>{j.player2.side}</td>
          </tr>
        </table>
      ))}
    </>
  );
}

export default Juegos;
