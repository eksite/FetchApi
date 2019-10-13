import React from "react";
import "./fetch.css";
import load from "./load.gif";

class Fetch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            query: "",
            loading: false
        };
    }

    componentWillMount() {
        this.state.loading = true;
        fetch("https://status.datadoghq.com/history.json")
            .then(Response => Response.json())
            .then(fetchResult => this.setState({ loading: false, data: fetchResult.components }));
    }

    components() {
        if (this.state.query.length > 0) {
            return this.state.data
                .filter(element =>
                    element.name.toLowerCase().includes(this.state.query.toLowerCase())
                )
                .map(element => (
                    <div className="boxes">
                        <p>{element.name}</p>
                        {/* <p className="dot box" /> */}
                        <p >{element.status}</p>
                    </div>
                ));
        }
        return this.state.data.map(element => (
            <div className="boxes">
                <p>{element.name}</p>
                <p>{element.status}</p>
            </div>
        ));
    }

    handleChange = e => {
        this.setState({ query: e.target.value });
        console.log(this.state.query);
    };

    render() {
        if (this.state.loading) {
            return <img className="img" src={load} />
        } else {
            return (<>
                <input
                    className="search"
                    type="text"
                    placeholder="typeToSearch"
                    value={this.state.query}
                    onChange={this.handleChange}
                />
                <div className="container">
                    {this.components()}
                </div>
            </>
            );
        }
    }
}

export default Fetch;
