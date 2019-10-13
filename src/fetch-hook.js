
import React, { useState, useEffect } from 'react';
import "./fetch.css";
import load from "./load.gif"

function Fetchh() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch("https://status.datadoghq.com/history.json")
            .then(Response => Response.json())
            .then(setLoading(false))
            .then(fetchResult => setData(fetchResult.components));
    }, []);
    console.log(data)
    if (loading) {
        return <img className="img" src={load} />
    } else {
        return (<>
            <input
                className="search"
                type="text"
                placeholder="typeToSearch"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                }}
            />
            <div className="container">
                { query.length>0 ?  
                    data.filter(element =>
                        element.name.toLowerCase().includes(query.toLowerCase())
                    )
                        .map(element => (
                            <div className="boxes">
                                <p>{element.name}</p>
                                <p >{element.status}</p>
                            </div>
                        ))
                :
                data.map(element =>
                        <div className="boxes">
                    <p>{element.name}</p>
                    <p>{element.status}</p>
                </div>

                )}
            </div>
        </>
        );
    }

}

export default Fetchh;