const App=(props)=>{
    return <div className={props.myclass?"OptionCard "+props.myclass:"OptionCard"}>
                <div className=" d-none d-sm-block">
                  <span className="OptionIndicator">{props.OptionIndicator}</span>
                </div>
                {props.TextOptionIndicator}
            </div>
}
export default App
