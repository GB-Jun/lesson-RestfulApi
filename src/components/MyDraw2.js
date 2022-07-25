import React, { useRef, useEffect, useState } from "react";
import { productData } from "./ProductData";

export default function MyDraw2() {
    const realRef = useRef();
    const [cart, setCart] = useState([]);

    const addItem = (id) => {
        const item = productData.find((v) => v.id === id);
        if (item) {
            const newItem = { ...item, tid: Date.now() };
            setCart([...cart, newItem]);
        }
    };

    const removeItem = (tid) => {
        const newCart = cart.filter((v) => v.tid !== tid);
        setCart(newCart);
    };

    useEffect(() => {
        console.log(realRef.current);
        const img = new Image();

        img.onload = () => {
            const ctx = realRef.current.getContext("2d");
            ctx.drawImage(img, 0, 0);
        };
        img.src = "/imgs/dish.jpeg";
    }, []);

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
