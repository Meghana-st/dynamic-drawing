import { useEffect, useContext } from "react";
import useFabric from "./useFabric";
import FabricContext from "./FabricContext";

const Canvas = () => {
    const fabricRef = useFabric();

    const canvas = useContext(FabricContext);

    useEffect(()=>{
        if (!canvas.current) return;

        if (canvas.current) {
          canvas.current.setWidth(window.innerWidth);
          canvas.current.setHeight(window.innerHeight);
        }
    }, []);
      
    return (
      <>
      <canvas ref={fabricRef} style={{ padding:"1rem", overflow:"hidden", border: '1px solid black'}} />
    </>
    );
  }

  export default Canvas;