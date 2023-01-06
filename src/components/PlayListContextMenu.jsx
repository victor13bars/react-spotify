import {useRef, forwardRef} from 'react';
import PlayListContextMenuItem from "./PlayListContextMenuItem";
import PlayListContextMenuItemWithSubmenu from "./PlayListContextMenuItemWithSubmenu";

const PlayListContextMenu = ({classes, menuItems}, ref) => {

    let closePreviousSubmenu = useRef(null)

    const closePreviousSubmenuIfOpen = (closeSubmenu = null) => {
        if (closePreviousSubmenu.current) {
            closePreviousSubmenu.current()
        }

        closePreviousSubmenu.current = closeSubmenu
    }

    return (
        <ul
            ref={ref}
            className={`bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-3xl cursor-default whitespace-nowrap z-10 ${classes}`}
        >
            {menuItems.map(({label, action, subMenuItems, classes: menuItemClasses}) => {
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
                        onClick={action}
                        onMouseEnter={closePreviousSubmenuIfOpen}
                        classes={menuItemClasses}
                    >
                        {label}
                    </PlayListContextMenuItem>
                )
            })}
        </ul>
    );
};

export default forwardRef(PlayListContextMenu);