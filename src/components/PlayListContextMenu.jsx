import React, {useEffect} from 'react';
import PlayListContextMenuItem from "./PlayListContextMenuItem";

const PlayListContextMenu = ({classes, menuItems, onClose}) => {

    useEffect(() => {

        document.addEventListener('mousedown', onClose)

        return () => {
            document.removeEventListener('mousedown',onClose)
        }
    })

    return (
        <ul className={classes}>
            {menuItems.map(({label, subMenuItems}) =>
                <PlayListContextMenuItem key={label} subMenuItems={subMenuItems}>
                    {label}
                </PlayListContextMenuItem>
            )}
        </ul>
    );
};

export default PlayListContextMenu;