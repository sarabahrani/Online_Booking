import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import { emailNotification } from '../../actions';
class CheckBox extends React.Component {

    check = (e) => {
        this.props.emailNotification(e.target.checked,e.target.name);
    }
    render() {
        const p = this.props;

        return (
            <Checkbox name={p.name}
                label={p.label}
                defaultChecked={p.checked}
                onCheck={this.check}
                />
        );
    }
}
CheckBox.propTyps = {
    emailNotification: PropTypes.func,
};
const mapDispatchToProps = (dispatch) => {
    return {
        emailNotification: (checked,name) => dispatch(emailNotification(checked,name)),
    };
};
export default connect(null, mapDispatchToProps)(CheckBox);