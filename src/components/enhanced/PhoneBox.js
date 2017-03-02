import React from 'react';
import TextBox from '../../containers/base/TextBox';
import {valNumber} from '../../validation';
class PhoneBox extends React.Component {
    render() {
        return (<TextBox {...this.props} validate={[valNumber]} />);
    }
}
export default PhoneBox;