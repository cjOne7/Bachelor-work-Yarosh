import React from 'react';
import {Form} from "react-bootstrap";

const InputField = (props) => {
    return (
        <div className={props.className}>
            <Form.Group className="mb-3" controlId={`${props.inputName}ControlId`}>
                <Form.Label style={{textTransform: "capitalize"}}>
                    {props.inputName}
                </Form.Label>
                <Form.Control {...props} placeholder={`Enter ${props.inputName}`}/>
                {props.inputBottomText && <Form.Text className="text-muted">
                    {props.inputBottomText}
                </Form.Text>}
            </Form.Group>
        </div>
    );
};

export default InputField;