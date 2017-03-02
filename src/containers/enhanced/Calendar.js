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
            appointments: [],
        };
        props.loadClientSetting(props.clientId);
        props.loadAppointments(props.clientId, this.state.firstDayOfWeek);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.date && this.props.date != newProps.date) {
            let temp = new Date(newProps.date);
            const fd = temp.getDay();
            temp.setDate(temp.getDate() - fd);
            this.setState({ firstDayOfWeek: temp });
        }
    }
    prevClick = () => {
        let temp = new Date(this.state.firstDayOfWeek);
        temp.setDate(temp.getDate() - 7);
        this.setState({ firstDayOfWeek: temp });
    }
    todayClick = () => {
        let temp = new Date();
        const fd = temp.getDay();
        temp.setDate(temp.getDate() - fd);
        this.setState({ firstDayOfWeek: temp });
    }
    nextClick = () => {
        let temp = new Date(this.state.firstDayOfWeek);
        temp.setDate(temp.getDate() + 7);
        this.setState({ firstDayOfWeek: temp });
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
        let time = new Date(p.workHour.startHour);

        let header = [];
        header.push(<div className="col-xs-1 cell">&nbsp;</div>);//to add first empty column for hours
        for (let i = 0; i < 7; i++) {
            header.push(
                <div className="col-xs-1 cell" key={i}>
                    <span>{temp.toLocaleDateString('en-US', weekdayOption)} </span>
                    <br />
                    <span>{temp.toLocaleDateString('en-US', dayOption)}</span>
                </div>
            );
            //generate next day
            temp.setDate(temp.getDate() + 1);
        }
        let body = [];
        while (time < p.workHour.endHour) {
            let rowContent = [];
            const min = time.getMinutes();
            //Creating firt column, appointmnet hours
            rowContent.push(<div className="col-xs-1 cell firstColumn">{`${time.getHours()}:${min < 10 ? "0" + min : min}`}</div>);
            //Creating appointments' cell(specific hour, all week days)
            for (let i = 0; i < 7; i++) {
                let slotDate = new Date(this.state.firstDayOfWeek);
                slotDate.setDate(slotDate.getDate() + i);
                slotDate.setHours(time.getHours());
                slotDate.setMinutes(time.getMinutes());
                slotDate.setSeconds(0);
                slotDate.setMilliseconds(0);
                let currentApp = "";
                if (p.appointment)
                    currentApp = p.appointment.find((p) => { return p.startDate.getTime() == slotDate.getTime(); });
                rowContent.push(<Appointment date={slotDate} appointment={currentApp} />
                );
            }
            body.push(
                <div className="row calendar-body">
                    {rowContent}
                </div>
            );
            time = new Date(time.valueOf() + 1000 * 60 * p.workHour.stepMinute);
        }
        return (
            <div>
                <Button name="prevWeek" label="Prev" onClick={this.prevClick} />
                <Button name="today" label="Today" onClick={this.todayClick} />
                <Button name="nextWeek" label="Next" onClick={this.nextClick} />
                <div className="calendar">
                    <div className="row calendar-header">{header}</div>
                    {body}
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
        workHour: state.form.workHour ? state.form.workHour : {},
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