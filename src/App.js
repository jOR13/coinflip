import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Juegos from "./components/Juegos";
import CrearJuego from "./components/CrearJuego";
import { UserContext } from "./context/UserContext";
import Login from "./components/Login"; 
import Registrar from "./components/Registrar"; 
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import Badge from "@material-ui/core/Badge";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function App() {
  const [userLog, setUserLog] = useState(null);
  const classes = useStyles();

  if (userLog != null) {
    console.log(userLog.image[0].formats.thumbnail.url);
  }

  return (
    <>
      <Router>
        <div className="justifyContent-center" >
          <div className="row">
            <div className="col-md-12 ">
              <nav className="navbar navbar-dark bg-dark">
                <div style={{ height: "50px", width: "100%" }}>
                  <Link
                    className="ml-4 mr-4 "
                    style={{ verticalAlign: "middle" }}
                    to="/login"
                  >
                    Iniciar sesion
                  </Link>
                  <Link
                    className="ml-4 mr-4"
                    style={{ verticalAlign: "middle" }}
                    style={{ verticalAlign: "middle" }}
                    to="/juegos"
                  >
                    Juegos
                  </Link>
                  <Link
                    className="ml-4 mr-4"
                    style={{ verticalAlign: "middle" }}
                    to="/crear-juego"
                  >
                    Crear juego
                  </Link>
                  <Link
                    className="ml-4 mr-4"
                    style={{ verticalAlign: "middle" }}
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                  <div style={{ color: "#fff", textAlign: "center" }}>
                    {userLog != null ? (
                      <div
                        className={classes.root}
                        style={{
                          marginTop: -26,
                          display: "block",
                          marginLeft: "90%",
                        }}
                      >
                        <StyledBadge
                          overlap="circle"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          variant="dot"
                        >
                          <Avatar
                            alt={userLog.fullName}
                            src={
                              "http://localhost:1337" +
                              userLog.image[0].formats.thumbnail.url
                            }
                            title={userLog.fullName}
                          />
                        </StyledBadge>{" "}
                        <b Style={{ color: "#fff", textAlign: "center" }}>
                          {userLog.fullName}
                        </b>
                        <Badge
                          overlap="circle"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                        ></Badge>
                      </div>
                    ) : null}
                  </div>
                </div>
              </nav>
            </div>
          </div>

          <Switch>
            <UserContext.Provider value={{ userLog, setUserLog }}>
              <Route exact path="/juegos">
                <Juegos />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route path="/crear-juego">
                <CrearJuego />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/registrar">
                <Registrar />
              </Route>
            </UserContext.Provider>
          </Switch>
        </div>
      </Router>
    </>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
