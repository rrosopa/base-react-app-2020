
import React, { ChangeEvent, Component } from "react";
import IMetadataControl from "./metadataControl";
import MetadataInputContainer from "./metadataInputContainer";


export interface IMetadataInput extends IMetadataControl {    
    type?: string;
    
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

class MetadataInput extends Component<IMetadataInput> {
    render() {
		return (
			<MetadataInputContainer>
                <input 
                    id={this.props.id}
                    value={this.props.onChange ? this.props.value : undefined}
                    defaultValue={this.props.onChange ? undefined : this.props.value}

                    disabled={this.props.disabled}
                    name={this.props.name}
                    required={this.props.required}
                    type={this.props.type}


                    onChange={this.props.onChange}
                    style={{display: this.props.hidden === true ? 'none' : 'inherit'}}

                    className="metadata-input"
                />              
            </MetadataInputContainer>
		);
	}
}

export default MetadataInput;