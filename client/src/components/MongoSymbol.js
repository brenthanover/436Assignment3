import React from 'react';
import '../style/MongoSymbol.css'

class MongoSymbol extends React.Component {
    state = {
        data: null,
    };

    componentDidMount() {
        console.log("mounting");
        this.callTest()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }

    callTest = async () => {
        const response = await fetch('/test_mongo');
        return await response.json();
    };

    render() {
        console.log("mongo symbol");
        console.log(this.state.data);
        if (this.state.data) {
            return <div className="mongo-symbol-div">
                <img className="mongo-symbol" src="https://digdata.io/static/art/mongo.png" alt=""/>
            </div>
        }
        return <div><br/><br/><br/></div>
    }
}

export default MongoSymbol;