import React, {useEffect} from 'react';
import PlayListContextMenuItem from "./PlayListContextMenuItem";

const PlayListContextMenu = ({classes, menuItems, onClose: handleClose}, ref) => {

    useEffect(() => {
        if (!handleClose) return

        const handleClickAway = (event) => {
            if (!ref.current.contains(event.target)) {
                handleClose()
            }
        }

        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                handleClose()
            }
        }

        document.addEventListener('mousedown', handleClickAway)
        document.addEventListener('keydown', handleEsc)

        return () => {
            document.removeEventListener('mousedown', handleClickAway)
            document.removeEventListener('keydown', handleEsc)
        }
    })

    return (
        <ul ref={ref} className={classes}>
            {menuItems.map(({label, subMenuItems}) =>
                <PlayListContextMenuItem key={label} subMenuItems={subMenuItems}>
                    {label}
                </PlayListContextMenuItem>
            )}
        </ul>
    );
};

export default React.forwardRef(PlayListContextMenu);