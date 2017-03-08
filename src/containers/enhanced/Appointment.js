import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { setAppointment } from '../../actions';
class Appointment extends Component {
    onSelectSlot = (selectedData) => {
        if (selectedData)
            this.props.setAppointment(selectedData);
    }
    render() {
        let selectedData = null;
        let label = "Add";
        let btnType = "btn btn-info";
        const p = this.props;
        if (p.appointment) {
            selectedData = p.appointment;
            label = selectedData.person.fullName;
            btnType = "btn btn-success";
        }

        return (
            <td className="col">
                <button className={btnType}
                    onClick={() => this.onSelectSlot(selectedData)} >
                    {label}
                </button>
            </td>
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