import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
class Button extends React.Component {
    render() {
        return (
            <RaisedButton {...this.props} />
        );
    }
}
export default Button;