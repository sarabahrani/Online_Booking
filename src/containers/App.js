import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import Divider from 'material-ui/Divider';

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <div className="container">Header</div>
                    <hr />
                    <div className="container-fluid">{this.props.children}</div>
                    <hr />
                    <div className="container">Footer</div>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default App;