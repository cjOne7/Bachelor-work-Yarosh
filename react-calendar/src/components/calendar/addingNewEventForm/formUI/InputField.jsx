import React from 'react';
import {Form} from "react-bootstrap";

const InputField = ({inputName, inputValue, setInputValue}) => {
    return (
        <Form.Group className="mb-3" controlId={`${inputName}ControlId`}>
            <Form.Label style={{textTransform: "capitalize"}}>
                {inputName}:
            </Form.Label>
            <Form.Control placeholder={`Enter ${inputName}`} value={inputValue}
                          onChange={e => setInputValue(e.target.value)}/>
        </Form.Group>
    );
};

export default InputField;