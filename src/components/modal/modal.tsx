import React, { PropsWithChildren } from 'react';
import styles from './modal.scss';

type Props = PropsWithChildren<{}>;

export const Modal = (props: Props): JSX.Element => {
    return (
        <div className={styles.overlay}>
            <div className={styles.alert}> 
                { props.children }
            </div>
        </div>
    );
}
