import { useCallback, useContext } from "react";
import FabricContext from "./FabricContext";
import { fabric } from "fabric";

const useFabric = () => {
    
    const canvas = useContext(FabricContext);
    const fabricRef = useCallback((element) => {
      if (!element) return canvas.current?.dispose();
  
      canvas.current = new fabric.Canvas(element);
      // canvas.current.add(new fabric.Rect(
      //   {top: 100, left: 110, width: 100, height: 100, fill: 'transparent', stroke:'black'} // rx:50, ry:50
      // ));
      // canvas.current.add(new fabric.Circle({
      //   left: 80,
      //   top: 10,
      //   fill : "transparent",
      //   stroke : "black",
      //   radius : 30,
      //   // startAngle:0,
      //   // endAngle:120
      // }));
      
    }, []);
    return fabricRef;
  };

export default useFabric;