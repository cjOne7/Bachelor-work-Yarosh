import React from 'react';
import {Form} from "react-bootstrap";

const TextArea = ({inputName, inputValue, setInputValue}) => {
    return (
        <Form.Group className="mb-3" controlId={`formBasic${inputName}`}>
            <Form.Label>{inputName}:</Form.Label>
            <Form.Control placeholder={`Enter ${inputName}`} as="textarea" style={{height: '100px'}}
                          value={inputValue}
                          onChange={e => setInputValue(e.target.value)}
            />
        </Form.Group>
    );
};

export default TextArea;