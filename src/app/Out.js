import React from "react";
import Out from "./auth/login";
import Outfuncionarios from "./auth/loginFuncionarios";
import RecoverPassNew from "./auth/recoverPassNew33";
import RecoverPassDirect from "./auth/RecoverPassDirect";
import VerificacionSMS from "./auth/verificacionSMS";
import StateContext from '../helpers/ContextState';

import Create from "./auth/create";
import Politicas from "./configuracion/Politicas";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";


function App(props) {
  return (
    <div className="bg-login">
      <StateContext.Provider value={{...props}}>
        <Router>
          <Switch>
            <Route exact path="/">
              {!props.funcionarios?<Out setModalShow={props.setModalShow} setUser={props.setUser} />:<Outfuncionarios setModalShow={props.setModalShow} setUser={props.setUser} />}
            </Route>
            <Route exact path="/funcionarios">
              <Outfuncionarios setModalShow={props.setModalShow} setUser={props.setUser} />
            </Route>
            <Route path="/recoverPass">
              <RecoverPassNew setModalShow={props.setModalShow}/>
            </Route>
            <Route path="/create">
              <Create setModalShow={props.setModalShow}/>
            </Route>
            <Route path="/Politicas">
              <Politicas />
            </Route>
            <Route path="/Users/recoverPass">
              <RecoverPassDirect setModalShow={props.setModalShow} setUser={props.setUser} />
            </Route>
            <Route path="/auth/VerificacionSMS/:telefono" >
              <VerificacionSMS setModalShow={props.setModalShow} />
            </Route>
          </Switch>
        </Router>
      </StateContext.Provider>
    </div>
  );
}

export default App;
