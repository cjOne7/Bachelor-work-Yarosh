import React from 'react';
import {Form} from "react-bootstrap";
import './inputStyle.css';

const DatePicker = ({inputName, inputLabel, inputValue, setInputValue, inputType}) => {
    return (
        <Form.Group className="mb-3 date-time-picker" controlId={`formBasic${inputName}`}>
            <Form.Label>{inputLabel}</Form.Label>
            <Form.Control type={inputType} value={inputValue}
                          onChange={e => setInputValue(e.target.value)}
            />
        </Form.Group>
    );
};

export default DatePicker;