import Select from '../screens/select';
const App=(props)=>{
  return <>
            <div className="mt-2">
              <Select
                required={true}
                data={props.data}
                name={props.name}
                selectDefault={props.selectDefault}
                onChange={props.onChange}
              />
            </div>
            <input  type="text"
                    className={props.className2}
                    placeholder={props.placeholder2}
                    onChange={props.onChange}
                    name={props.name2}
                    id={props.id2}
                    event={props.event2?'solonumeros':''}/>
          </>
}
export default App
