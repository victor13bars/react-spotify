import React, {useEffect, useRef, useState} from 'react';
import BaseButton from "./BaseButton";

const BasePopover = () => {

    const ref = useRef()
    const [classes, setClasses] = useState()

    const hide = () => {
        setClasses('opacity-0 pointer-events-none')
    }

    useEffect(() => {

        const handleClickAway = ({target}) => {
            if (!ref.current.contains(target)) hide()
        }

        document.addEventListener('mousedown', handleClickAway)

        return () => document.removeEventListener('mousedown', handleClickAway)

    })

    return (
        <div
            ref={ref}
            className={`fixed top-[227px] left-[200px] z-30 bg-[#0e72ea] text-white tracking-wide
             rounded-lg shadow-3xl p-4 min-w-[330px] transition duration-300 select-none ${classes}`}>
            <h3 className="text-lg font-bold mb-2">Create a playlist</h3>
            <p className="text-xs">Log in to create and share playlist</p>
            <div className="mt-6 text-right">
                <BaseButton onClick={hide}>Not now</BaseButton>
                <BaseButton primary>Log in</BaseButton>
            </div>
            <div
                className="w-20 h-20 absolute -top-4 -left-20 flex justify-end items-center overflow-hidden pointer-events-none">
                <div className="w-3 h-3 bg-[#0e72ea] shadow-3xl translate-x-1/2 rotate-45 pointer-events-auto"></div>
            </div>
        </div>
    );
};

export default BasePopover;