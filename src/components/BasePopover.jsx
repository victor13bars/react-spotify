import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import BaseButton from "./BaseButton";
import BasePopoverTriangle from "./BasePopoverTriangle";
import usePopoverPosition from "../hooks/usePopoverPosition";
import useClickAway from "../hooks/useClickAway";

const BasePopover = (_, ref) => {

    const nodeRef = useRef()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const {move, target, setTarget, isSmallScreen} = usePopoverPosition(nodeRef, hide)
    useClickAway(nodeRef, hide, shouldHide)
    const [classes, setClasses] = useState(getHiddenClasses)

    function getHiddenClasses() {
        const translateClass = isSmallScreen ? 'translate-y-1' : 'translate-x-1'

        return `opacity-0 ${translateClass} pointer-events-none`
    }

    const show = (title, description, nextTarget, offset) => {

        if (target === nextTarget) return

        move(nextTarget, offset)
        setTitle(title)
        setDescription(description)
        setClasses('')
    }

    function hide() {
        setTarget(null)
        setClasses(getHiddenClasses)
    }

    function shouldHide(event) {
        return !target?.parentNode.contains(event.target)
    }

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