import React, { PropTypes } from 'react';
import TextBox from '../../containers/base/TextBox';
import EmailBox from './EmailBox';
import PhoneBox from './PhoneBox';
import CheckBox from '../../containers/base/CheckBox';
import { appointmentSubmit } from '../../actions';
import { connect } from 'react-redux';
class AppointmentDetail extends React.Component {
    appointmentSubmit = () => {
        const p = this.props;
        const data = {
            fullName: p.fullName,
            phone: p.phone,
            email: p.email,
            weekReminder: p.weekReminder,
            dayReminder: p.dayReminder,
            hourReminder: p.hourReminder,
            // date: p.date,
            // clientId: p.clientId,
        };
        this.props.appointmentSubmit(data);
    };
    render() {
        return (
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
                        <button type="reset" className="btn">Reset</button>
                        <button type="submit" className="btn btn-info" onClick={this.appointmentSubmit} >Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}
AppointmentDetail.propTypes = {
    appointmentSubmit: PropTypes.func,
};
function mapStateToProps(state) {
    return {
        fullName: state.form.FullName ? state.form.FullName : {},
        phone: state.form.Phone ? state.form.Phone : {},
        email: state.form.Email ? state.form.Email : {},
        weekReminder: state.form.week ? state.form.week : {},
        dayReminder: state.form.day ? state.form.day : {},
        hourReminder: state.form.hour ? state.form.hour : {},
        // date: state.form.date ? state.form.date : {},
        // clientId: state.form.clientId ? state.form.clientId : {},
        // id: state.form.id ? state.form.id : {},
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        appointmentSubmit: (data) => dispatch(appointmentSubmit(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetail);