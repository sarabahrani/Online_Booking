import React from 'react';
import TextBox from '../../containers/base/TextBox';
import {valEmail} from '../../validation';
class EmailBox extends React.Component {
    render() {
        return (<TextBox {...this.props} validate={[valEmail]}/>);
    }
}
export default EmailBox;