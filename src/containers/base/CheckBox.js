import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import { emailNotification } from '../../actions';
class CheckBox extends React.Component {
    constructor(props) {
        //  console.log('constructor');
        super(props);
        this.state = {
            value: props.value || false,
        };
    }
    componentWillReceiveProps(nextProps) {

        if (this.props.value != nextProps.value) {
            if (this.state.value != nextProps.value)
                this.setState({ value: nextProps.value });
        }
    }

    check = () => {
        // console.log('check');
        const value = !this.state.value;
        this.setState({ value });
        this.props.checked(value, this.props.name);
    }
    render() {
        const p = this.props;
        //console.log('render');
        return (
            <Checkbox name={p.name}
                label={p.label}
                checked={this.state.value}
                onCheck={this.check}
            />
        );
    }
}
CheckBox.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    checked: PropTypes.func,
};
function mapStateToProps(state, props) {
    return {
        value: state.form && state.form[props.name],
    };

}

const mapDispatchToProps = (dispatch) => {
    return {
        checked: (value, name) => dispatch({ type: 'FORM', value, name }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckBox);