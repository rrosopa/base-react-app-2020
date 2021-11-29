
import React, { ChangeEvent, Component } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import IMetadataControl from "./metadataControl";


export interface IMetadataInput extends IMetadataControl {    
    type?: string;
    
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

class MetadataInput extends Component<IMetadataInput> {
    render() {
		return (
            <FloatingLabel label={this.props.label} controlId={this.props.id}>
                <Form.Control
                    value={this.props.onChange ? this.props.value : undefined}                    

                    disabled={this.props.disabled}
                    name={this.props.name}
                    required={this.props.required}
                    type={this.props.type}    

                    onChange={this.props.onChange}
                    style={{display: this.props.hidden === true ? 'none' : 'inherit'}}
                    placeholder={this.props.label}
                    tabIndex={this.props.tabIndex}

                    className="metadata-input"
                />
                <Form.Control.Feedback type="invalid">{this.props.errorMessage}</Form.Control.Feedback>
            </FloatingLabel>
		);
	}
}

export default MetadataInput;