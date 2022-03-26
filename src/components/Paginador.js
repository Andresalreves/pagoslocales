const  App = (props) =>{
  return  <>
            <div className="d-flex flex-row-reverse">
                <nav aria-label="Page navigation example" className="text-right">
                  <ul className="pagination pagination-table pr-3">
                    {
                      props.paginas.map((row,key)=>{
                        let thisPage  = key+1
                        return  <li key={key} className={thisPage===props.paginaActual.label?"page-item":"page-item "} onClick={()=>{props.setPaginaActual(row) }}>
                                  <a className={thisPage===props.paginaActual.label?"page-link-active text-white mr-1":"page-link text-white mr-1"} href={"#"+row.label}>{row.label}</a>
                                </li>
                      })
                    }
                  </ul>
                </nav>
            </div>
          </>
}

export default App
