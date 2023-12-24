import React from 'react';
import styles from './AppUI.scss';

interface AppUIProps {}

export const AppUI = React.forwardRef<HTMLCanvasElement, AppUIProps>(({}, canvasRef) => {
    return (
        <>
            <div className={styles.appUI}>AppUI</div>
        </>
    );
});
