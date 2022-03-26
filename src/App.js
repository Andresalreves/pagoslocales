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
import useSocket from 'use-socket.io-client';
import loading from "./assets/images/loader-sinfondo.gif";


/*notificaciones push*/
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {
  isPushNotificationSupported,
  askUserPermission,
  registerServiceWorker,
  createNotificationSubscription,
  getUserSubscription
} from "./notificaciones/push-notifications";

import LogoNotificacion from './assets/images/design/android-chrome-192x192.png'
import IcoNotificacion from './assets/images/design/ico-notificacion.png'

const pushNotificationSupported = isPushNotificationSupported();
let serviceWorker_



const ENDPOINT = Config.ConfigSocketUrl;
const host = window.location.host
const subdomain = host.split('.')[0]

//let listaConectados=[]

const App=()=>{
  const [user, setUser] = useState(false);
  const [privilegios, setPrivilegios] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [funcionarios, setFuncionarios] = useState(false);
  const [notificaciones, setNotificaciones] = useState({});
  const [comision, setcomision] = useState(false);
  const [userConsent, setSuserConsent] = useState(Notification.permission);
  const [btnPreguntarNotificaciones, setBtnPreguntarNotificaciones] = useState(false);
  function preguntarNotificaciones(){
    setModalShow({show:false})
    if (pushNotificationSupported) {
      askUserPermission().then(consent => {
        setSuserConsent(consent);
        if (consent === "granted" || consent ==="denied") {
          setBtnPreguntarNotificaciones(false)
        }else {

        }
      })
    }
  }



  function printNotificaciones(data){
    if (data.response.notificaciones!==undefined) {
      data.response.notificaciones.map((row,key)=>{
        let mensaje= {
                          body:   row.body,
                          icon:   LogoNotificacion,
                          dir :   "ltr",
                          title : row.title,
                      };
        // Functions.Socket.emit('send_notificacion',{options:mensaje});
        //console.log(mensaje);
        if  (Notification.permission  ===  "granted")  {
            var options         =   mensaje
            if (serviceWorkerRegistration.default) {
              var  notification   =   new  Notification(row.title, options);
            }else {
              serviceWorkerRegistration.sendNotification(mensaje.icon,row.title,mensaje.body,IcoNotificacion,key);
            }
        }
      })
    }
  }

  const [socket] = useSocket(ENDPOINT,{
    autoConnect: false,
    //any other options
  });

  //console.log(socket.connect());

  useEffect(() => {
    if (pushNotificationSupported) {
      askUserPermission().then(consent => {
        setSuserConsent(consent);
        if (consent !== "granted") {
          //setBtnPreguntarNotificaciones(true)

          setModalShow({
            show:true,
            message:<>
                      <div className="title-mensage mb-3">
                        ¡ahora prodrás recibir notificaciones en tu dispositivo!
                      </div>
                      <div className="col-12 ml-auto mr-auto">
                        <div className="btn btn-primary mr-2" onClick={preguntarNotificaciones}>
                          De acuerdo, gracias...
                        </div>
                      </div>
                    </>,
            size:""
          })


        }else if (consent === "granted" || consent ==="denied") {
          setBtnPreguntarNotificaciones(false)
        }
      })
      serviceWorkerRegistration.register();
    }

    socket.connect()

    if (Store.get("error").label!==undefined) {
      setModalShow({
        show:true,
        message:<>
                  <div className="title-mensage">
                    {Store.get("error").label}
                  </div>
                  <div className="col-12 ml-auto mr-auto" onClick={()=>setModalShow({show:false})}>
                    <div className="btn btn-primary btn-block">
                      Ok
                    </div>
                  </div>
                </>,
        size:""
      })
      Store.clear()
    }

    if (Store.get("user").usuario_id!==undefined) {

      /*setInterval(function(){
        VerificaTime()
      }, 6000);*/

      socket.emit("datos_cliente_conectado",Store.get("user"))

      socket.on("datos_cliente_conectado", (data) => {
        //console.log(data,"cliente conectado");
      });

      socket.on("actualizar_cuenta", (data) => {
        restartProfile(user.token)
      });

      socket.on("actualizar_notificacion", () => {
        getNotificaciones()
      });

      socket.on("actualizar_comision", () => {
        setcomision(true)
      });

      socket.on("actualizar_tareas", (data) => {
        console.log(data,"ACTUALIZANDO");
      });

      socket.on("estatus", (data) => {
        //console.log(data);
      });

    }

  }, [socket]);

  const VerificaTime=()=>{
    const dateTime  = new Date().getTime();
    const timestamp = Math.floor(dateTime / 1000);
    const total_tiempo_acumulado  = timestamp - Store.get("t")
    if (total_tiempo_acumulado>Store.get("user").session_time) {
      Store.clear()
      setUser(false)
      document.location.href=Config.ConfigAppUrl
    }else {
      //console.log(total_tiempo_acumulado);
    }
  }

  useEffect(() => {

    if (subdomain==='funcionarios' && Functions.segment()==='') {
      setFuncionarios(true)
    }

    if (Store.get("user").usuario_id!==undefined || Store.get("user").funcionario_id!==undefined) {
      getNotificaciones()
      Store.get("user");
      setUser(Store.get("user"));
      setPrivilegios(Store.get("privilegios"))
    }else{
      setUser(false);
    }

    //console.log(user);
    //document.oncontextmenu = function(){return false}

  },[])

  useEffect(() => {


    /*if (user && parseInt(user.tipo_usuario_id)<4) {

      document.oncontextmenu = function(){return true}
      //console.log(user);
    }else {
      document.oncontextmenu = function(){return false}
    }*/
  },[user])

  const restartProfile=(token)=>{
    Functions.PostAsync("Users","loginRestartProfile",{token:token},{},{name:"callbackRestartProfile",funct:callbackRestartProfile})
  }

  const callbackRestartProfile=(response)=>{
    if (response.data!==undefined) {
      Store.set("user",response.data)
      setUser(response.data);
      //console.log(response.data);
      //document.location.reload()
    }
  }

  const emit_socket=(data)=>{
    if (data.event!==undefined) {
      switch (data.event) {
        case "actualizar_estado_clientes":
          actualizar_estado_clientes(data.data)
        break;
        case "actualizar_notificacion":
          actualizar_notificacion()
        break;
        default:
        return false
      }
    }
  }

  const actualizar_estado_clientes=(data)=>{
    socket.emit(  'actualizar_cuenta', {
                                          event:"restartProfile"
                                        }
                );
  }

  const lista_clientes_conectados=()=>{
    socket.emit('lista_clientes_conectados');
  }
  const actualizar_notificacion=()=>{
    socket.emit('actualizar_notificacion');
  }

  const actualizar_comision=()=>{
    socket.emit('actualizar_comision');
  }

  const emit_generico=(data)=>{
    socket.emit('emit_generico',data);
  }

  const getNotificaciones=()=>{
    Functions.PostAsync("Notificaciones","getNews",{},{},{name:"callbackNews",funct:callbackNews})
  }

  const callbackNews=(response)=>{
    if (response.data!==undefined && response.data.length>0) {
      setNotificaciones(response)
      PrimerNotificacion(response)
    }
  }

  const events  = {
                    emit_socket:emit_socket,
                    lista_clientes_conectados:lista_clientes_conectados,
                    actualizar_notificacion:actualizar_notificacion,
                    actualizar_comision:actualizar_comision,
                    emit_generico:emit_generico,
                  }

  const PrimerNotificacion=(data)=>{
    if (data.total_read!==0) {
      return false
    }

    if (data.data===undefined || data.data[0]===undefined) {
      return false;
    }

    let body  = data.data[0].body


    let row = {
                body:body+"...",
                title:(data.data.length===1)?data.data[0].title:"Tiene "+data.data.length+" notificaciones nuevas"
              }

    let mensaje= {
                      body:   row.body,
                      icon:   LogoNotificacion,
                      dir :   "ltr",
                      title : row.title,
                  };

    if  (Notification.permission  ===  "granted")  {
        var options         =   mensaje
        if (serviceWorkerRegistration.default) {
          var  notification   =   new  Notification(row.title, options);
        }else {
          serviceWorkerRegistration.sendNotification(mensaje.icon,row.title,mensaje.body,IcoNotificacion,0);
        }
    }
  }

  return  <>
            <div className="position-light-box" id="loadingNew" style={{display: "none"}}>
              <div className="container">
                <div className="row">
                  <div className="col text-center ">
                    <div className="pt-5">
                      <img src={loading} alt="Pgrw"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Modal modalShow={modalShow} setModalShow={setModalShow}/>{user && user.tipo_usuario_id!=='3'?<In  user={user}
                                                                                privilegios={privilegios}
                                                                                setUser={setUser}
                                                                                notificaciones={notificaciones}
                                                                                setModalShow={setModalShow}
                                                                                socket={events}
                                                                                socketIo={socket}
                                                                                comision={comision}
                                                                                setcomision={setcomision}
                                                                                />:user && user.tipo_usuario_id==='3'?<>
                                                                                  <InFuncionario
                                                                                    privilegios={privilegios}
                                                                                    user={user}
                                                                                    notificaciones={notificaciones}
                                                                                    socket2={emit_socket}
                                                                                    socketIo={socket}
                                                                                    setUser={setUser}
                                                                                    socket={events}
                                                                                    comision={comision}
                                                                                    setcomision={setcomision}
                                                                                    setModalShow={setModalShow}/>
                                                                                </>:<Out
                                                                                socketIo={socket}
                                                                                socket={emit_socket}
                                                                                funcionarios={funcionarios}
                                                                                setUser={setUser}
                                                                                setModalShow={setModalShow}/>}

          </>

}

export default App;
