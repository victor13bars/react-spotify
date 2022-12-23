import React, {useEffect, useState} from 'react';

const PlayListContextMenuItem = ({
                                     children: originalLabel,
                                     onMouseEnter: closePreviousSubmenuIfOpen,
                                     alternateLabel,
                                     classes
                                 }) => {

    const [label, setLabel] = useState(originalLabel)

    useEffect(() => {

        if (!alternateLabel) return

        const handleAltKeydown = ({key}) => {

            if (key === 'Alt') setLabel(alternateLabel)
        }

        const handleAltKeyup = ({key}) => {
            if (key === 'Alt') setLabel(originalLabel)
        }

        document.addEventListener('keydown', handleAltKeydown)
        document.addEventListener('keyup', handleAltKeyup)

        return () => {

            document.removeEventListener('keydown', handleAltKeydown)
            document.removeEventListener('keyup', handleAltKeyup)
        }
    })

    return (
        <li onMouseEnter={() => closePreviousSubmenuIfOpen()}>
            <button
                className={`w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default ${classes}`}
            >
                {label}
            </button>
        </li>
    );
};

export default PlayListContextMenuItem;