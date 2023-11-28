import { useContext, useEffect, useState } from "react";
import FabricContext from "./FabricContext";

const DrawTextbox = (props) =>{

    const canvas = useContext(FabricContext);
    let isDrawing=false;
    let textBox;

    useEffect(() => {
        if (!canvas.current) return;
      }, []);

    const mouseDownHandler = (options) => {
   
          const pointer = canvas.current.getPointer(options.e);
          const { x, y } = pointer;
  
          textBox = new fabric.Textbox('Enter text...', {
            left: x,
            top: y,
            width: 100,
            fontSize: 16,
            padding:10,
            fontFamily: "Helvetica",
            borderColor: 'black',
            cornerColor: 'black',
          });
  
          canvas.current.add(textBox);
          textBox.setCoords();
        canvas.current.off('mouse:down', mouseDownHandler);
        props.setIsTextbox(false);
    }
      
      canvas.current.on('mouse:down', mouseDownHandler);

    return null;
}

export default DrawTextbox;