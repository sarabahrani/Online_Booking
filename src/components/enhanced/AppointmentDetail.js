import React from 'react';
import TextBox from '../../containers/base/TextBox';
import EmailBox from './EmailBox';
import PhoneBox from './PhoneBox';
import CheckBox from '../../containers/base/CheckBox';
class AppointmentDetail extends React.Component {
    render() {
        return (
            <div>
                <TextBox name="FullName" required />
                <PhoneBox name="Phone" required />
                <EmailBox name="Email" />
                <h4>Email Notification Schedule</h4>
                <CheckBox name="week" label="One week later" />
                <CheckBox name="day" label="One day Later" checked />
                <CheckBox name="hour" label="2 hours later" />
            </div>);
    }
}
export default AppointmentDetail;