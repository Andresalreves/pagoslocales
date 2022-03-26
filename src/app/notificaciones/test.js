import React,{useEffect,useState} from 'react';
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import StateContext from '../../helpers/ContextState';
import { faSms } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const App=(props)=>{
  const context = React.useContext(StateContext);
  const [data, setData] = useState({
                                      galeria:[],
                                    });

  useEffect(() => {
    //console.log(props.sendNotificationNow);
  },[]);

  return  <div className="container mt-3">
            <div className="row">
              <div className={props.className?props.className:"col-12 mb-3"}>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col">
                        Sistema de notificaciones
                      </div>
                    </div>
                  </div>
                  <div className="card-body">

                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App;
