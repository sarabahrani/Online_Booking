import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { onBlur } from '../../actions';
import TextField from 'material-ui/TextField';
import validate, { valRequired } from '../../validation';

class TextBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorText: "",
            value: "",
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value != this.props.value) {
            if (nextProps.value)
                this.setState({ value: nextProps.value });
            else
                this.setState({ value: '' });
        }
    }
    blur = (e) => {
        const t = e.target;
        const pv = this.props.validate ? this.props.validate : [];
        const v = this.props.required ? [valRequired, ...pv] : pv;
        const error = validate(t.value, v);
        this.setState({ errorText: error });
        this.props.onBlur(t.name, t.value);
    }
    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }
    render() {
        const p = this.props;
        return (
            <div>
                <TextField name={p.name}
                    floatingLabelText={p.name}
                    onBlur={this.blur}
                    errorText={this.state.errorText}
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}
TextBox.propTypes = {
    name: PropTypes.string,
    required: PropTypes.bool,
    onBlur: PropTypes.func,
    validate: PropTypes.array,
    value: PropTypes.string,
};
function mapStateToProps(state, props) {
    return {
        value: state.form[props.name],
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBlur: (name, value) => dispatch(onBlur(name, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TextBox);