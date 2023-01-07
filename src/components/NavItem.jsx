import React from 'react';

const NavItem = ({classes, icon, children: label, onClick}) => {

    const handleClick = (event) => {

        if (!onClick) return

        event.preventDefault()
        onClick(event.currentTarget)

    }

    return (
        <a
            href="/"
            className={classes}
            onClick={handleClick}
        >
            {icon}
            <span className="ml-4 text-sm font-semibold">{label}</span>
        </a>
    );
};

export default NavItem;