import React, {useRef} from 'react';

const NavItem = ({classes, icon, children: label, onClick}) => {

    const labelRef = useRef()
    const handleClick = (event) => {

        if (!onClick) return

        event.preventDefault()
        onClick(labelRef.current)

    }

    return (
        <a
            href="/"
            className={classes}
            onClick={handleClick}
        >
            {icon}
            <span ref={labelRef} className="ml-4 text-sm font-semibold">{label}</span>
        </a>
    );
};

export default NavItem;