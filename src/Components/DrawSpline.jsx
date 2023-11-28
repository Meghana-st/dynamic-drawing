import { useContext, useEffect, useState } from "react";
import FabricContext from "./FabricContext";

const DrawSpline = (props) =>{

    const canvas = useContext(FabricContext);
    let isDrawing=false;
    let spline;

    useEffect(() => {
        if (!canvas.current) return;
      }, []);

    const mouseDownHandler = (options) => {
            if (!isDrawing) {
                const pointer = canvas.current.getPointer(options.e);
                const { x, y } = pointer;
        
                // Define Bézier curve path data
                const pathData = `M ${x} ${y} C ${x + 50} ${y - 50}, ${x + 100} ${y + 50}, ${x + 150} ${y}`;
        
                spline = new fabric.Path(pathData, {
                  fill: 'transparent',
                  stroke: 'black',
                  strokeWidth: 2,
                });
        
                canvas.current.add(spline);
                isDrawing = true;
              } else {
                isDrawing = false;
              }
          }

    const mouseMoveHandler = (options) => {
        if (isDrawing) {
                    const pointer = canvas.current.getPointer(options.e);
                    const { x, y } = pointer;
            
                    // Update the Bézier curve path data
                    const pathData = `M ${spline.path[0][1]} ${spline.path[0][2]} C ${x} ${y}, ${x + 50} ${y}, ${x + 100} ${y}`;
            
                    spline.set({
                      path: new fabric.Path(pathData).path,
                    });
            
                    canvas.current.renderAll();
                  }
              }

    const mouseDblClickHandler = () => {
            if (isDrawing) {
              spline.setCoords();
              isDrawing = false;
              canvas.current.off('mouse:down', mouseDownHandler);
              canvas.current.off('mouse:move', mouseMoveHandler);
              canvas.current.off('mouse:dblclick', mouseDblClickHandler);
              props.setIsSpline(false);
            }
          }

    canvas.current.on('mouse:down', mouseDownHandler);
    canvas.current.on('mouse:move', mouseMoveHandler);
    canvas.current.on('mouse:dblclick', mouseDblClickHandler);

    //   canvas.current.on('mouse:down', (options) => {
    //     if (!isDrawing) {
    //         const pointer = canvas.current.getPointer(options.e);
    //         const { x, y } = pointer;
    
    //         // Define Bézier curve path data
    //         const pathData = `M ${x} ${y} C ${x + 50} ${y - 50}, ${x + 100} ${y + 50}, ${x + 150} ${y}`;
    
    //         spline = new fabric.Path(pathData, {
    //           fill: 'transparent',
    //           stroke: 'black',
    //           strokeWidth: 2,
    //         });
    
    //         canvas.current.add(spline);
    //         isDrawing = true;
    //       } else {
    //         isDrawing = false;
    //       }
    //   });
  
    //   canvas.current.on('mouse:move', (options) => {
    //     if (isDrawing) {
    //         const pointer = canvas.current.getPointer(options.e);
    //         const { x, y } = pointer;
    
    //         // Update the Bézier curve path data
    //         const pathData = `M ${spline.path[0][1]} ${spline.path[0][2]} C ${x} ${y}, ${x + 50} ${y}, ${x + 100} ${y}`;
    
    //         spline.set({
    //           path: new fabric.Path(pathData).path,
    //         });
    
    //         canvas.current.renderAll();
    //       }
    //   });
  
    //   canvas.current.on('mouse:dblclick', () => {
    //     if (isDrawing) {
    //       isDrawing = false;
    //     //   canvas.off('mouse:down');
    //     //   canvas.off('mouse:move');
    //     //   canvas.off('mouse:dblclick');
    //     }
    //   });
  

    return null;
}

export default DrawSpline;