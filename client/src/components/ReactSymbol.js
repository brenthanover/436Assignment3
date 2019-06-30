import React from 'react';
import '../style/ReactSymbol.css'

class ReactSymbol extends React.Component {
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
        const response = await fetch('/test');
        return await response.json();
    };

    render() {
        console.log("react symbol");
        console.log(this.state.data);
        if (this.state.data) {
            return <div className="react-symbol-div">
                <img className="react-symbol" src="https://cdn-images-1.medium.com/max/1600/0*W1LxH_wVnveHqbze.png" alt=""/>
            </div>
        }
        return <div><br/><br/><br/></div>
    }
}

export default ReactSymbol;