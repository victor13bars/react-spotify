import React, {forwardRef, useEffect, useRef, useState} from 'react';
import BaseButton from "./BaseButton";
import {useImperativeHandle} from "react";

const HIDDEN_CLASSES = 'opacity-0 translate-x-1 pointer-events-none'

const BasePopover = (_, ref) => {

    const nodeRef = useRef()
    const [classes, setClasses] = useState(HIDDEN_CLASSES)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const show = (title, description, target) => {
        moveTo(target)
        setTitle(title)
        setDescription(description)
        setClasses('')
    }
    const hide = () => {
        setClasses(HIDDEN_CLASSES)
    }

    const moveTo = (target) => {
        const offset = target
        if (target instanceof Element) {
            const {top, right, height} = target.getBoundingClientRect()
            offset.top = top - (height / 3) * 2
            offset.left = right + 30
        }

        nodeRef.current.style.top = `${offset.top}px`
        nodeRef.current.style.left = `${offset.left}px`
    }

    useEffect(() => {

        const handleClickAway = ({target}) => {
            if (!nodeRef.current.contains(target)) hide()
        }

        document.addEventListener('mousedown', handleClickAway)

        return () => document.removeEventListener('mousedown', handleClickAway)

    })

    useImperativeHandle(ref, () => ({show}))

    return (
        <div
            ref={nodeRef}
            className={`fixed z-30 bg-[#0e72ea] text-white tracking-wide
             rounded-lg shadow-3xl p-4 w-[330px] transition duration-3000 select-none ${classes}`}>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-xs">{description}</p>
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

export default forwardRef(BasePopover);