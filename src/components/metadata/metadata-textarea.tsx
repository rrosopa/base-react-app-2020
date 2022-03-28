
import React, { ChangeEvent } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import IMetadataControl from "./metadata-control";


export interface IMetadataTextArea extends IMetadataControl { 
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const MetadataTextArea = (props: IMetadataTextArea): JSX.Element => {
    return (
        <FloatingLabel label={props.label} controlId={props.id}>
            <Form.Control
                as="textarea"
                value={props.onChange ? props.value : undefined}
                defaultValue={props.onChange ? undefined : props.value}

                disabled={props.disabled}
                name={props.name}
                required={props.required}                    

                onChange={props.onChange}
                style={{display: props.hidden === true ? 'none' : 'inherit'}}

                className="metadata-input"
            />
        </FloatingLabel>
    );
}