import React from 'react';
import Pin from './pin';
import axios from 'axios';

class FullPage extends React.Component {
    state = {
        pin: []
    }

    async componentDidMount() {
        const { data } = await axios.get('http://localhost:9000/pin');
        this.setState({ pin: data })
        console.log(this.state.pin);
    }

    render() {
        return (
            <React.Fragment>
                {this.state.pin.map((pin) => <Pin pin={pin} key={pin.id} />)}
            </React.Fragment>
        );
    }
}

export default FullPage;