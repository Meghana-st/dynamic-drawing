import { useContext, useEffect, useState } from "react";
import FabricContext from "./FabricContext";

const MirrorObject = () =>{

    const canvas = useContext(FabricContext);

    const onMirrorHorizontal = () =>{
        const selectedObject = canvas.current.getActiveObject();
        console.log("selectedobj", selectedObject.flipX);
       selectedObject.clone(function(clonedobj){
          //clonedobj.set('flipX', true);
          clonedobj.set({left: selectedObject.left - selectedObject.width -10});
          clonedobj.set({flipX: !selectedObject.flipX,
            flipY: selectedObject.flipY,});
            canvas.current.add(clonedobj);
              canvas.current.renderAll();
        });
      }

    const onMirrorVertical = () =>{
        const selectedObject = canvas.current.getActiveObject();
  
       selectedObject.clone(function(clonedobj){
          //clonedobj.set('flipY', true);
          clonedobj.set({top: selectedObject.top - selectedObject.height -10});
          clonedobj.set({flipX: selectedObject.flipX,
            flipY: !selectedObject.flipY,})
            canvas.current.add(clonedobj);
              canvas.current.renderAll();
        });
      }

    useEffect(() => {
        if (!canvas.current) return;
      }, []);

    return(<>
    <button onClick={onMirrorHorizontal}>Mirror Horizontal</button>
    <button onClick={onMirrorVertical}>Mirror Vertical</button>
    </>)
}

export default MirrorObject;