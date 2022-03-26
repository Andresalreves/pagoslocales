import {useState} from 'react';
const App=({title,classNameMain,classNameBody,Component,modelo,metodo})=>{
  const [footer, setFooter] = useState(false);
  return    <div className={classNameMain}>
              <div className="title-cuadro-intermedio bg-blue text-white p-2">
                <b>{title}</b>
              </div>
              <div className={classNameBody}>
                {<Component modelo={modelo} metodo={metodo} funct={setFooter}/>}
              </div>
              <div className="footer-container px-4 pt-2 pb-2 bg-blue2 text-white">
                {footer}
              </div>
            </div>
}

export default App
