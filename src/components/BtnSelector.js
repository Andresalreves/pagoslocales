import {useState,useEffect} from 'react';
const App=({data,inputs,setInputs,name,onUpdate})=>{
    const [activo, setActivo] = useState(false);

    const onClick=(row)=>{

      if (setInputs && row.value!==inputs[name]) {
        let inputs_ = {...inputs}
            inputs_[name] =  row.value
            setInputs(inputs_)
            onUpdate(row.value)
      }
    }

    return  <div className="row">
              {
                data&&data.length>0?<>
                  {data.map((row,key)=>{
                    return  <div key={key} className="col">
                              <div onClick={()=>onClick(row)} className={parseInt(inputs[name])===row.value || (inputs[name]===undefined && row.value===1)?"btn btn-primary btn-block":"btn btn-outline-primary2 btn-block"}>
                                {row.label} {row.value}
                              </div>
                            </div>
                  })}
                </>:false
              }
            </div>
}

export default App
