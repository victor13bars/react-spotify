import React, {useEffect, useRef} from 'react';
import PlayListContextMenuItem from "./PlayListContextMenuItem";

const PlayListContextMenu = ({classes, menuItems, onClose: handleClose}) => {

    const menuRef = useRef(null)

    useEffect(() => {

        const handleClickAway = (event) => {
            if (!menuRef.current.contains(event.target)) {
                handleClose()
            }
        }

        document.addEventListener('mousedown', handleClickAway)

        return () => {
            document.removeEventListener('mousedown', handleClickAway)
        }
    })

    return (
        <ul ref={menuRef} className={classes}>
            {menuItems.map(({label, subMenuItems}) =>
                <PlayListContextMenuItem key={label} subMenuItems={subMenuItems}>
                    {label}
                </PlayListContextMenuItem>
            )}
        </ul>
    );
};

export default PlayListContextMenu;