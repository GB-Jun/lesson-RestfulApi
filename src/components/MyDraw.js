import React, {useRef} from "react";
import { productData } from "./ProductData";

export default function MyDraw() {
    const cRef = useRef()

    const drawSomething = ()=>{
        console.log(cRef)
        const cnt = cRef.current.getContext('2d');
        cnt.beginPath(); // 重置 path
        cnt.moveTo(50, 50);
        cnt.lineTo(200, 300);
        cnt.lineTo(400, 50);
        cnt.strokeStyle = 'orange'; // 設定畫筆顏色
        cnt.lineWidth = 20;// 設定畫筆粗細
        cnt.stroke(); // 在路徑上畫線
    }


    return (
        <div>
            {productData.map((item) => {
                return (
                    <div key={item.id} style={{display: 'inline-block'}}>
                        <img
                            src={`/imgs/${item.img}`}
                            width="120px"
                            alt={item.name}
                        />
                    </div>
                );
            })}
           <button onClick={drawSomething}>test</button>
            <canvas ref={cRef} width="800" height="600" style={{border: '1px dotted blue'}}></canvas>
        </div>
    );
}
