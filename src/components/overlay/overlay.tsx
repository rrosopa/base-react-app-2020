import React, { PropsWithChildren } from 'react';
import './overlay.scss';

type Props = PropsWithChildren<{}>;

export const Overlay = (props: Props): JSX.Element => {
	return (
		<div className="overlay">
			<div></div>
			<div className="content">
				{ props.children }
			</div>
		</div>
	);
}