import {useState} from 'react';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App=(props)=>{
  //console.log(props.data);
  const [open, setOpen]               =   useState({});
  const onClick=(key)=>{
    let open_       = {...open}
        open_[key]  = (open_[key]===undefined || open_[key]===false)?true:false
        setOpen(open_)
  }
  return  <div className="toogle-content">
            {props.data!==undefined && props.data.length>0?<>
              {props.data.map((row,key)=>{
                return  <div className="row mb-4" key={key}>
                          <div className="col-2 text-center mb-2">
                            <div className="circle-icon" onClick={()=>onClick(key)}>
                              <FontAwesomeIcon icon={faAngleDown} className="cursor-pointer "/>
                            </div>
                          </div>
                          {props.columnas!==undefined && props.columnas.length>0?<>
                            {props.columnas.map((row2,key2)=>{
                              if (key2===0) {
                                return  <div className="col-10" key={key2}>
                                          <div className="col-4 p-0 x1 mb-2 text-rosa">
                                            {row2.label}
                                          </div>
                                          <div className="col-12 p-0 x1 mb-2">
                                            {row[row2.value]}
                                          </div>
                                        </div>
                              }else {
                                if (open[key]!==undefined && open[key]===true) {
                                  if (row2.label==="Acciones") {
                                    return  <div className="col-12" key={key2}>
                                              <div className="row">
                                                <div className="col-2 text-center mb-3">

                                                </div>
                                                <div className="col-5 text-left text-rosa x1 mb-3">
                                                  {row2.label}
                                                </div>
                                                <div className="col-5 p-0 x1 mb-3">
                                                  {row2.icons!==undefined&&row2.icons.length>0?<>
                                                    {row2.icons.map((row3,key3)=>{
                                                      if (row3.url !==undefined ) {
                                                        return  <row3.NavLink className="" to={row3.url+row[props.keys]}>
                                                                  {row3.icon}
                                                                </row3.NavLink>
                                                      }else if (row3.event !==undefined &&  row3.event === "AprobarCuenta") {
                                                        return  <span onClick={()=>{props.AprobarCuenta(row)}}>
                                                                  {row3.icon}
                                                                </span>
                                                      }else if (row3.event !==undefined &&  row3.event === "DenegarCuenta") {
                                                        return  <span onClick={()=>{props.DenegarCuenta(row)}}>
                                                                  {row3.icon}
                                                                </span>
                                                      }else {
                                                        return false;
                                                      }
                                                    })}
                                                  </>:false}
                                                </div>
                                              </div>
                                            </div>

                                  }else if (true) {
                                    return  <div className="col-12" key={key2}>
                                              <div className="row">
                                                <div className="col-2 text-center mb-3">

                                                </div>
                                                <div className="col-5 text-left text-rosa x1 mb-3">
                                                  {row2.label}
                                                </div>
                                                <div className="col-5 p-0 x1 mb-3">
                                                  {row[row2.value]}
                                                </div>
                                              </div>
                                            </div>
                                  }else {
                                    return false;
                                  }
                                }else {
                                  return false
                                }
                              }
                            })}
                          </>:false}
                        </div>
              })}
            </>:false}
          </div>
}

export default App
