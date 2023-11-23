import { useContext, useEffect, useState } from "react";
import FabricContext from "./FabricContext";

const CopyPasteObject = () =>{

    const canvas = useContext(FabricContext);
    let _clipboard;
    
    useEffect(() => {
        if (!canvas.current) return;
      }, []);

    const onCopyObject = () =>{
        canvas.current.getActiveObject().clone(function(cloned) {
          _clipboard = cloned;
        });
      }

    const onPasteObject = () =>{
        _clipboard.clone(function(clonedObj) {
          canvas.current.discardActiveObject();
          clonedObj.set({
            left: clonedObj.left + 10,
            top: clonedObj.top + 10,
            evented: true,
          });
          if (clonedObj.type === 'activeSelection') {
            // active selection needs a reference to the canvas.
            clonedObj.canvas = canvas.current;
            clonedObj.forEachObject(function(obj) {
              canvas.current.add(obj);
            });
            // this should solve the unselectability
            clonedObj.setCoords();
          } else {
            canvas.current.add(clonedObj);
          }
          _clipboard.top += 10;
          _clipboard.left += 10;
          canvas.current.setActiveObject(clonedObj);
          canvas.current.requestRenderAll();
        });
      }

      const onDeleteObject = () =>{

        const selectedObjects = canvas.current.getActiveObjects();
        console.log("Active objects: ", selectedObjects);
        selectedObjects.forEach((obj)=>{
          canvas.current.remove(obj);
        })
  
        canvas.current.discardActiveObject();
      }

      const keyDownHandler = (event) =>{
        if(event.ctrlKey && event.keyCode === 67)
        {
          onCopyObject();
        }
        else if(event.ctrlKey && event.keyCode === 86)
        {
          onPasteObject();
        }
        else if(event.keyCode === 46)
        {
          onDeleteObject();
        }
        else
        {
          console.log("none");
        }
      }
  
      createListenersKeyboard();
      function createListenersKeyboard() {
          document.onkeydown = keyDownHandler;
      }

    return(<>
    <button onClick={onCopyObject}>Copy</button>
    <button onClick={onPasteObject}>Paste</button>
    <button onClick={onDeleteObject}>Delete</button>
    </>)
}

export default CopyPasteObject;