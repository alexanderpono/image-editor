import React from 'react';
import styles from './AppUI.scss';
import { useSelector } from 'react-redux';
import { appSelect } from './appSelect';

interface AppUIProps {}

export const AppUI = React.forwardRef<HTMLCanvasElement, AppUIProps>(({}, canvasRef) => {
    const size = useSelector(appSelect.size);
    return (
        <>
            <div className={styles.appUI}>
                <div className={styles.canvas}>
                    <canvas height={size.y} width={size.x} ref={canvasRef}></canvas>
                </div>
            </div>
        </>
    );
});
