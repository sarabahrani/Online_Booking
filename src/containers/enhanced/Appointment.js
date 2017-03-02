import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { setAppointment } from '../../actions';
import FlatButton from 'material-ui/FlatButton';
class Appointment extends Component {
    onSelectSlot = (selectedData) => {
        this.props.setAppointment(selectedData);
    }
    render() {
        let selectedData = null;
        let label = "";
        const p = this.props;
        const styles = {
            height: 'auto',
        };
        let appointmentInfoToShow = null;
        if (p.appointment) {
            selectedData = p.appointment;
            appointmentInfoToShow = selectedData.person.fullName;
            label = "Edit";
        }
        else
            label = "Add";
        return (
            <div className="col-xs-1 cell reservationCell">
                {appointmentInfoToShow}
                <FlatButton className="col-xs-1 cell flatButton" label={label} style={styles}
                    onClick={() => this.onSelectSlot(selectedData)} value={selectedData} />
            </div>
        );
    }
}
Appointment.propTypes = {
    date: PropTypes.object,
    appointment: PropTypes.object,
    setAppointment: PropTypes.func,
};
const mapDispatchToProps = (dispatch) => {
    return {
        setAppointment: (selectedData) => dispatch(setAppointment(selectedData)),
    };
};
export default connect(null, mapDispatchToProps)(Appointment); 