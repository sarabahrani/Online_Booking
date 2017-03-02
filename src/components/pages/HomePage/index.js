import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Calendar from '../../../containers/enhanced/Calendar';
import AppointmentDetail from '../../enhanced/AppointmentDetail';

//import Divider from 'material-ui/Divider';

class HomePage extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <form>
                    <Calendar clientId="1" date={new Date()} />
                    <AppointmentDetail />
                </form>
            </MuiThemeProvider>
        );
    }
}
export default HomePage;