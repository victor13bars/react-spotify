import React, {forwardRef, useEffect, useRef, useState} from 'react';
import BaseButton from "./BaseButton";
import {useImperativeHandle} from "react";
import BasePopoverTriangle from "./BasePopoverTriangle";

const MIN_DESKTOP_WIDTH = 900

const BasePopover = (_, ref) => {

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < MIN_DESKTOP_WIDTH)
    const nodeRef = useRef()
    const [classes, setClasses] = useState(getHiddenClasses)
    const [title, setTitle] = useState('')
    const [target, setTarget] = useState()
    const [description, setDescription] = useState('')
    const changeWidthTimer = useRef()
    const resizeTimer = useRef()

    function getHiddenClasses() {
        const translateClass = isSmallScreen ? 'translate-y-1' : 'translate-x-1'

        return `opacity-0 ${translateClass} pointer-events-none`
    }

    const show = (title, description, nextTarget, offset) => {

        if (target === nextTarget) return

        moveTo(offset ? offset : calculateTargetOffset(nextTarget))
        setTarget(nextTarget)
        setTitle(title)
        setDescription(description)
        setClasses('')
    }

    const hide = () => {
        setTarget(null)
        setClasses(getHiddenClasses)
    }

    const moveTo = (offset) => {
        nodeRef.current.style.top = `${offset.top}px`
        nodeRef.current.style.left = `${offset.left}px`
    }

    const calculateTargetOffset = (target) => {
        const {top, right, left, height} = target.getBoundingClientRect()


        return {
            top: isSmallScreen ? top + height * 2 : top - (height / 3) * 2,
            left: isSmallScreen ? left : right + 30
        }
    }

    const screenHasBecomeSmall = () => {
        return window.innerWidth < MIN_DESKTOP_WIDTH && !isSmallScreen
    }

    const screenHasBecomeWide = () => {
        return window.innerWidth >= MIN_DESKTOP_WIDTH && isSmallScreen
    }

    useEffect(() => {

        const handleResize = () => {
            if (screenHasBecomeSmall() || screenHasBecomeWide()) {
                hide()

                clearTimeout(changeWidthTimer.current)
                changeWidthTimer.current = setTimeout(
                    () => setIsSmallScreen(window.innerWidth < MIN_DESKTOP_WIDTH),
                    300
                )
            }
        }

        const handleClickAway = (event) => {
            if (target && target.parentNode.contains(event.target)) return
            if (!nodeRef.current.contains(event.target)) hide()
        }

        const debounce = (callback) => {
            clearTimeout(resizeTimer.current)
            resizeTimer.current = setTimeout(callback, 300)
        }

        const debounceResize = debounce.bind(null, handleResize)

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