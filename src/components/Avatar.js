import React,{useState,useEffect} from 'react';
import StateContext from '../helpers/ContextState';
import Functions from '../helpers/Functions';
import Store from '../helpers/Store';
import getCroppedImg from '../helpers/cropImage'
import Cropper from '../screens/Cropper'

const App=(props)=>{


  const [img, setImg] = useState(props.src);
  const [inputs, setInputs] = useState({});
  const context =   React.useContext(StateContext);

  useEffect(() => {
    if (Store.get("user").foto!=='') {
      setImg(Store.get("user").foto)
    }
  },[])

  const submitCrop=(inputs_)=>{
    let send  = {...inputs_}

    Functions.PostAsync("Users","setAvatar",send,{},{name:"callbackSubmitCropper",funct:callbackSubmitCropper})
  }

  const callbackSubmitCropper=(response)=>{
    if (response.error===undefined) {
      let user      =   {...Store.get("user")}
          user.foto =   response.data
          Store.set("user",user)
          setImg(response.data)
    }
  }

  const subCrop=()=>{
    async function croping(){
      let croppedImage = await getCroppedImg(
                                              inputs.image,
                                              inputs.croppedAreaPixels
                                            )
      let inputs_                   =   inputs;
          inputs_.image             =   croppedImage
          setInputs(inputs_)
      context.setModalShow({
        show:false,
        message:"",
      })
      submitCrop(inputs_)
    }
    croping(this)
  }

  const onCropComplete=(croppedArea, croppedAreaPixels,image_)=>{
    let inputs_ =   inputs;
        inputs_.croppedArea       = croppedArea
        inputs_.croppedAreaPixels = croppedAreaPixels
        inputs_.image             = image_
        setInputs(inputs_)
  }

  const cropper=(event)=>{
    let file          =   event.target.files[0];
    let reader        =   new FileReader();

    reader.onload     =   function() {
      context.setModalShow({
                              footer:true,
                              footer_btn:subCrop,
                              show:true,
                              size:"lg",
                              message:<div style={{height:"500px"}}><Cropper onCropComplete={onCropComplete} image={reader.result}/></div>
                            })

    }
    reader.readAsDataURL(file);
  }
  return  <div className="position-relative text-center">
            <input type="file" className="inputfile position-absolute" name="userfile" accept="image/*"  onChange={cropper} />
            <img src={img} className={props.className} alt={props.alt}/>
          </div>
}
export default App
