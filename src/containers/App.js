import React from 'react';

//import Divider from 'material-ui/Divider';

class App extends React.Component {
    render() {
        return (
            <div>
                <div>Header</div>
                <div className="container">{this.props.children}</div>
                <div>Footer</div>
            </div>
        );
    }
}
export default App;