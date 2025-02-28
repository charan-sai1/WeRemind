import React from 'react';
import PropTypes from 'prop-types';

export default function BorderInputBox(props) {
    return (
        <input
            className='borderInput'
            type={props.type}
            placeholder={props.placeholder}
            value={props.value} // bind input value to the value prop
            onChange={props.onChange} // use the passed onChange handler
        />
    );
}

BorderInputBox.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string, // value for input field
    onChange: PropTypes.func.isRequired, // handler for the change event
};
