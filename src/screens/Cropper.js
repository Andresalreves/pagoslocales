import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'


const App = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const onCropComplete  = useCallback((croppedArea, croppedAreaPixels) => {
    if (croppedArea.x>=0) {
      props.onCropComplete(croppedArea, croppedAreaPixels,props.image)
    }
  }, [])


  //const aspect=props.aspect!==undefined?1/1:4/2
  const aspect=1/1

  return (
    <div className="App">
      <div className="crop-container">
        <Cropper
          image={props.image}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="controls">

      </div>
    </div>
  )
}
export default App
