import React, { useRef, useEffect, useState } from "react";
import { productData } from "./ProductData";

export default function MyDraw2() {
    const realRef = useRef();
    const shadowRef = useRef();
    const [cart, setCart] = useState([]);
    const [cache, setCache] = useState({}); // 快取 image 物件

    const addItem = (id) => {
        const item = productData.find((v) => v.id === id); // 找到第一個符合的項目
        if (item) {
            const newItem = { ...item, tid: Date.now() };
            setCart([...cart, newItem]);
        }
    };

    const removeItem = (tid) => {
        const newCart = cart.filter((v) => v.tid !== tid);
        setCart(newCart);
    };

    const getImageFromPath = (path)=>{
        return new Promise((resolve, reject)=>{
            
            if(cache[path]){
                return resolve(cache[path]); // 回傳已存在的資料
            }

            const img = new Image();
            img.onload = () => {
                resolve(img);
                setCache({...cache, [path]:img});
            };
            img.src = path;
        });
    }

    const renderCanvas = async ()=>{
        const realCtx = realRef.current.getContext("2d");
        const shadowCtx = shadowRef.current.getContext("2d");
        const bg = await getImageFromPath('/imgs/dish.jpeg');

        shadowCtx.clearRect(0, 0, shadowRef.current.width, shadowRef.current.height);
        shadowCtx.drawImage(bg, 0, 0);

        const tmpCart = cart.slice(0,5);
        for(let i=0; i<tmpCart.length; i++){
            const img = await getImageFromPath(`/imgs/${tmpCart[i].img}`);
            shadowCtx.drawImage(img, i*100, i*100);
        }
        realCtx.drawImage(shadowRef.current, 0, 0);
    }

    useEffect(() => {
        renderCanvas();
    }, [cart]);

    return (
        <div>
            {productData.map((item) => {
                return (
                    <div
                        key={item.id}
                        style={{ display: "inline-block" }}
                        onClick={() => addItem(item.id)}
                    >
                        <img
                            src={`/imgs/${item.img}`}
                            width="120px"
                            alt={item.name}
                        />
                    </div>
                );
            })}
            <br />
            <canvas
                ref={shadowRef}
                width="800"
                height="600"
                hidden
            ></canvas>
            <canvas
                ref={realRef}
                width="800"
                height="600"
                style={{ border: "1px dotted blue" }}
            ></canvas>
            <br />
            {cart.map((item) => {
                return (
                    <div
                        key={item.tid}
                        style={{ display: "inline-block" }}
                        onClick={() => removeItem(item.tid)}
                    >
                        <img
                            src={`/imgs/${item.img}`}
                            width="120px"
                            alt={item.name}
                        />
                    </div>
                );
            })}
        </div>
    );
}
