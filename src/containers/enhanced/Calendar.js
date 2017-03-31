import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadClientSetting, loadAppointments } from '../../actions';
import Button from '../../components/base/Button';
import Appointment from './Appointment';
//import moment from 'moment';
class Calendar extends React.Component {
    constructor(props) {
        super(props);
        // the date of today
        let temp = props.date || new Date();
        //generate the number of the day of week 0-6 e.i monday:1
        const fd = temp.getDay();
        //find the date of today and subtract it forom its number of week, find the dat of the first day of the week ,sunday
        temp.setDate(temp.getDate() - fd);
        this.state = {
            firstDayOfWeek: temp,
            year: temp.getFullYear(),
        };
        props.loadClientSetting(props.clientId);
        props.loadAppointments(props.clientId, this.state.firstDayOfWeek);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.date && this.props.date != newProps.date) {
            let temp = new Date(newProps.date);
            const fd = temp.getDay();
            temp.setDate(temp.getDate() - fd);
            this.setState({
                firstDayOfWeek: temp,
                year: temp.getFullYear()
            });
        }
    }
    prevClick = () => {
        let temp = new Date(this.state.firstDayOfWeek);
        temp.setDate(temp.getDate() - 7);
        this.setState({
            firstDayOfWeek: temp,
            year: temp.getFullYear()
        });
    }
    todayClick = () => {
        let temp = new Date();
        const fd = temp.getDay();
        temp.setDate(temp.getDate() - fd);
        this.setState({
            firstDayOfWeek: temp,
            year: temp.getFullYear()
        });
    }
    nextClick = () => {
        let temp = new Date(this.state.firstDayOfWeek);
        temp.setDate(temp.getDate() + 7);
        this.setState({
            firstDayOfWeek: temp,
            year: temp.getFullYear()
        });
    }
    render() {
        const p = this.props;
        const weekdayOption = {
            weekday: 'short',
        };
        const dayOption = {
            month: 'short',
            day: 'numeric',
        };
        let temp = new Date(this.state.firstDayOfWeek);
        let time = new Date(p.clientInfo.startHour);
        let header = [];
        header.push(<th className="col-md-1">&nbsp;</th>);//to add first empty cell
        for (let i = 0; i < 7; i++) {
            header.push(
                <th className="col" id="calendar-header" key={i}>
                    <span>{temp.toLocaleDateString('en-US', weekdayOption)} </span>
                    <br />
                    <span>{temp.toLocaleDateString('en-US', dayOption)}</span>
                </th>
            );
            //generate next day
            temp.setDate(temp.getDate() + 1);
        }
        let body = [];
        while (time <= p.clientInfo.endHour) {
            let rowContent = [];
            const min = time.getMinutes();
            //Creating firt column, appointmnet hours
            rowContent.push(<td className="first-column">{`${time.getHours()}:${min < 10 ? "0" + min : min}`}</td>);
            //Creating appointments' cell(specific hour, all week days)
            for (let i = 0; i < 7; i++) {
                let slotDate = new Date(this.state.firstDayOfWeek);
                slotDate.setDate(slotDate.getDate() + i);
                slotDate.setHours(time.getHours());
                slotDate.setMinutes(time.getMinutes());
                slotDate.setSeconds(0);
                slotDate.setMilliseconds(0);
                let currentApp = "";
                if (p.appointment) {
                    currentApp = p.appointment.find((p) => {
                        return p.date.getTime() == slotDate.getTime();
                    });
                }
                rowContent.push(<Appointment date={slotDate} appointment={currentApp} />
                );
            }
            body.push(
                <tr className="row">
                    {rowContent}
                </tr>
            );
            time = new Date(time.valueOf() + 1000 * 60 * p.clientInfo.stepMinute);
        }
        return (
            <div>
                <div className="dashhead">
                    <div className="dashhead-titles">
                        <h3 className="dashhead-title">Booking List</h3>
                        <h4>{this.state.year}</h4>
                    </div>
                    <div className="dashhead-toolbar">
                        <div className="btn-group dashhead-toolbar-item btn-group-thirds">
                            <button type="button" className="btn btn-nav btn-outline-primary" onClick={this.prevClick}>Prev</button>
                            <button type="button" className="btn btn-nav btn-outline-primary active" onClick={this.todayClick}>Today</button>
                            <button type="button" className="btn btn-nav btn-outline-primary" onClick={this.nextClick}>Next</button>
                        </div>
                    </div>
                </div>
                <div className="calendar">
                    <table className="table table-striped table-hover ">
                        <thead>
                            <tr className="row">{header}</tr>
                        </thead>
                        <tbody id="calendar-body">
                            {body}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
Calendar.propTypes = {
    loadCalendar: PropTypes.func,
    date: PropTypes.object,
    loadAppointments: PropTypes.func,
    loadClientSetting: PropTypes.func,
    clientId: PropTypes.string,
};
function mapStateToProps(state) {
    return {
        clientInfo: state.form.clientInfo ? state.form.clientInfo : {},
        appointment: state.form.appointment ? state.form.appointment : {},
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadClientSetting: (clientId) => dispatch(loadClientSetting(clientId)),
        loadAppointments: (clientId, firstDayOfWeek) => dispatch(loadAppointments(clientId, firstDayOfWeek)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);