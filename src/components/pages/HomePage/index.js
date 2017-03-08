import React from 'react';
import Calendar from '../../../containers/enhanced/Calendar';
import AppointmentDetail from '../../enhanced/AppointmentDetail';

//import Divider from 'material-ui/Divider';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <div className="container-fluid col-md-6">
                    <Calendar clientId="1" date={new Date()} />
                </div>
                <div className="container col-md-5 offset-md-1">
                    <AppointmentDetail />
                </div>
            </div>
        );
    }
}
export default HomePage;