import React from 'react';
import '../assets/mi_progress_bar.css';

const MiProgressBar=(props)=>{

  return  <>
            <div className='container_progress_bar'>
                <div className='relleno-bar' style={{width:props.porcentaje+'%'}}></div>
                <b className='porcentaje-bar'>{props.porcentaje?props.porcentaje:'0'}%</b>
            </div>
          </>
}

export default MiProgressBar;
