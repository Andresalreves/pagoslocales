import React,{useState,useEffect} from 'react';
import RichTextEditor from 'react-rte';

const format =  "html"
const App=(props)=>{

  const [value, setValue]             = useState(RichTextEditor.createEmptyValue());
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if(props.defaultValue!==undefined){
      setValue(RichTextEditor.createValueFromString(props.defaultValue, 'html'))
    }
  },[props.defaultValue])

  const onChange=(value)=>{
    setValue(value)
    if (props.setInputs!==undefined) {
      let inputs_ = {...props.inputs}
          inputs_[props.name] =   value.toString('html')
          props.setInputs(inputs_)
    }
  }


  return <RichTextEditor
            className={props.className}
            placeholder={props.placeholder}
            value={value}
            onChange={onChange}
          />
}

export default App
