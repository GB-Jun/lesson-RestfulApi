import React, { useEffect, useState } from "react";
import { AB_GET_LIST } from "./config/ajax-path";

// componentDidMount
// componentDidUpdate
// componentWillUnmount

export default function App() {
    const [data, setData] = useState({});

    const getData = async () => {
        const r = await fetch(AB_GET_LIST);
        const obj = await r.json();
        console.log(obj);
        setData(obj);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            {console.log({ data })}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">姓名</th>
                        <th scope="col">Email</th>
                        <th scope="col">手機號碼</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
