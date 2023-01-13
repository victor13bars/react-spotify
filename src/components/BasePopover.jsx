import React, {forwardRef, useEffect, useRef, useState} from 'react';
import BaseButton from "./BaseButton";
import {useImperativeHandle} from "react";
import BasePopoverTriangle from "./BasePopoverTriangle";
import {debounce, MIN_DESKTOP_WIDTH} from '../utils'
import usePopoverPosition from "../hooks/usePopoverPosition";


const isCurrentWindowWidthSmall = () => {
    return window.innerWidth < MIN_DESKTOP_WIDTH
}

const isCurrentWindowWidthBig = () => {
    return window.innerWidth >= MIN_DESKTOP_WIDTH
}

const BasePopover = (_, ref) => {

    const [isSmallScreen, setIsSmallScreen] = useState(isCurrentWindowWidthSmall)
    const nodeRef = useRef()
    const [classes, setClasses] = useState(getHiddenClasses)
    const [title, setTitle] = useState('')
    const [target, setTarget] = useState()
    const [description, setDescription] = useState('')
    const changeWidthTimer = useRef()
    const move = usePopoverPosition(nodeRef, isSmallScreen)

    function getHiddenClasses() {
        const translateClass = isSmallScreen ? 'translate-y-1' : 'translate-x-1'

        return `opacity-0 ${translateClass} pointer-events-none`
    }

    const show = (title, description, nextTarget, offset) => {

        if (target === nextTarget) return

        move(nextTarget, offset)
        setTarget(nextTarget)
        setTitle(title)
        setDescription(description)
        setClasses('')
    }

    const hide = () => {
        setTarget(null)
        setClasses(getHiddenClasses)
    }

    const screenHasBecomeSmall = () => {
        return isCurrentWindowWidthSmall() && !isSmallScreen
    }

    const screenHasBecomeBig = () => {
        return isCurrentWindowWidthBig() && isSmallScreen
    }

    useEffect(() => {

        const handleResize = () => {
            if (!screenHasBecomeSmall() && !screenHasBecomeBig()) return

            hide()
            clearTimeout(changeWidthTimer.current)

            changeWidthTimer.current = setTimeout(
                () => setIsSmallScreen(isCurrentWindowWidthSmall),
                300
            )
        }

        const handleClickAway = (event) => {
            if (target && target.parentNode.contains(event.target)) return
            if (!nodeRef.current.contains(event.target)) hide()
        }

        const debounceResize = debounce.bind(null, handleResize, 300)

        window.addEventListener('resize', debounceResize)
        document.addEventListener('mousedown', handleClickAway)

        return () => {
            window.removeEventListener('resize', debounceResize)
            document.removeEventListener('mousedown', handleClickAway)
        }

    })

    useImperativeHandle(ref, () => ({show}))

    return (
        <div
            ref={nodeRef}
            className={`fixed z-30 bg-[#0e72ea] text-white tracking-wide
             rounded-lg shadow-3xl p-4 w-[330px] transition duration-300 select-none ${classes}`}>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-xs">{description}</p>
            <div className="mt-6 text-right">
                <BaseButton onClick={hide}>Not now</BaseButton>
                <BaseButton primary>Log in</BaseButton>
            </div>
            <BasePopoverTriangle side={isSmallScreen ? 'top' : 'left'}/>
        </div>
    );
};

export default forwardRef(BasePopover);