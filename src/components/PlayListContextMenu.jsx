import React from 'react';
import PlayListContextMenuItem from "./PlayListContextMenuItem";
import PlayListContextMenuItemWithSubmenu from "./PlayListContextMenuItemWithSubmenu";

const PlayListContextMenu = ({classes, menuItems}, ref) => {

    let closePreviousSubmenu = null

    const closePreviousSubmenuIfOpen = (closeSubmenu = null) => {
        if (closePreviousSubmenu) {
            closePreviousSubmenu()
        }

        closePreviousSubmenu = closeSubmenu
    }

    return (
        <ul ref={ref} className={classes}>
            {menuItems.map(({label, subMenuItems, classes}) => {
                if (subMenuItems) {
                    return (
                        <PlayListContextMenuItemWithSubmenu
                            key={label}
                            subMenuItems={subMenuItems}
                            onMouseEnter={closePreviousSubmenuIfOpen}
                        >
                            {label}
                        </PlayListContextMenuItemWithSubmenu>
                    )
                }

                return (
                    <PlayListContextMenuItem
                        key={label}
                        onMouseEnter={closePreviousSubmenuIfOpen}
                        classes={classes}
                    >
                        {label}
                    </PlayListContextMenuItem>
                )
            })}
        </ul>
    );
};

export default React.forwardRef(PlayListContextMenu);