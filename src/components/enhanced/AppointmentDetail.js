import React from 'react';
import TextBox from '../../containers/base/TextBox';
import EmailBox from './EmailBox';
import PhoneBox from './PhoneBox';
import CheckBox from '../../containers/base/CheckBox';
class AppointmentDetail extends React.Component {
    render() {
        return (
            <form>
                <div className="fixed-div">
                    <div>
                        <TextBox name="FullName" required />
                        <PhoneBox name="Phone" required />
                        <EmailBox name="Email" />
                    </div>
                    <br />
                    <div>
                        <h4>Email Notification Schedule</h4>
                        <CheckBox name="week" label="One week later" />
                        <CheckBox name="day" label="One day Later" />
                        <CheckBox name="hour" label="2 hours later" />
                    </div>
                    <br />
                    <div>
                        <div>
                            <button type="reset" className="btn">Cancel</button>
                            <button type="submit" className="btn btn-info">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
export default AppointmentDetail;