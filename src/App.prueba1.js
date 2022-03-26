import React,{useState,useEffect} from 'react';
import Store from "./helpers/Store";
import Config from "./helpers/Config";
import Functions from "./helpers/Functions";
import In from "./app/In";
import InFuncionario from "./app/InFuncionario";
import Out from "./app/Out";
import Modal from './screens/modal';
import './App.css';
import './App_andres.css';

//import socketIOClient from "socket.io-client";
//const socket      =   socketIOClient(Config.ConfigSocketUrl);

// import io from "socket.io-client";
// const socket = io.connect('/');


const host = window.location.host
const subdomain = host.split('.')[0]

const App=()=>{

  const [user, setUser] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [funcionarios, setFuncionarios] = useState(false);

  // useEffect(() => {
  //   socket.on("actualizar", (data) => {
  //
  //   });
  //   socket.on("estatus", (data) => {
  //     console.log(data);
  //   });
  // }, [socket]);

  useEffect(() => {
    if (subdomain==='funcionarios' && Functions.segment()==='') {
      setFuncionarios(true)
      //console.log(subdomain,Functions.segment());
    }

    if (Store.get("user").usuario_id!==undefined || Store.get("user").funcionario_id!==undefined){
      Store.get("user");
      setUser(Store.get("user"));
    }else{
      setUser(false);
    }
  },[])

  const on_socket=(data)=>{

  }

  const emit_socket=(data)=>{
    // console.log("mande una petición");
    // socket.emit("actualizar", (data) => {
    //   console.log(data);
    // });
  }


  return  <><Modal modalShow={modalShow} setModalShow={setModalShow}/>{user && user.tipo_usuario_id!=='3'?<In  user={user}
                                                                                setUser={setUser}
                                                                                setModalShow={setModalShow}
                                                                                socket={emit_socket}
                                                                                />:user && user.tipo_usuario_id==='3'?<>
                                                                                  <InFuncionario
                                                                                    socket={emit_socket}
                                                                                    setUser={setUser}
                                                                                    setModalShow={setModalShow}/>
                                                                                </>:<Out
                                                                                socket={emit_socket}
                                                                                funcionarios={funcionarios}
                                                                                setUser={setUser}
                                                                                setModalShow={setModalShow}/>}</>

}

export default App;
