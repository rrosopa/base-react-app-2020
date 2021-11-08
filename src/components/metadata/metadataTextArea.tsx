
import React, { ChangeEvent, Component } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import IMetadataControl from "./metadataControl";


export interface IMetadataTextArea extends IMetadataControl { 
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

class MetadataTextArea extends Component<IMetadataTextArea> {
    render() {
		return (
            <FloatingLabel label={this.props.label} controlId={this.props.id}>
                <Form.Control
                    as="textarea"
                    value={this.props.onChange ? this.props.value : undefined}
                    defaultValue={this.props.onChange ? undefined : this.props.value}

                    disabled={this.props.disabled}
                    name={this.props.name}
                    required={this.props.required}                    

                    onChange={this.props.onChange}
                    style={{display: this.props.hidden === true ? 'none' : 'inherit'}}

                    className="metadata-input"
                />
            </FloatingLabel>
		);
	}
}

export default MetadataTextArea;