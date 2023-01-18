import ReactDOM from "react-dom";
import React, {useEffect, useRef} from 'react';
import {XMarkIcon} from '@heroicons/react/24/outline'
import useEvent from "../hooks/useEvent";

const BaseModal = ({classes, onClose: handleClose, children}) => {

    const ref = useRef()
    const contentRef = useRef()

    const handleEsc = ({key}) => {
        if (key === 'Escape') close()
    }

    const close = () => {
        animate(true)

        setTimeout(handleClose, 500)
    }

    const animate = (isClosing = false) => {
        ref.current.classList.toggle('opacity-0', isClosing)
        contentRef.current.classList.toggle('-translate-y-10', isClosing)
    }

    useEffect(() => {
        setTimeout(animate, 500)
    })

    useEvent('keydown', handleEsc)


    return ReactDOM.createPortal(
        <div
            className='fixed inset-0 bg-black/70 z-30 flex justify-center items-center opacity-0 transition-opacity duration-500'
            role='dialog'
            ref={ref}
            onClick={close}
        >
            <div
                className={`flex flex-col relative text-white rounded-xl
                 -translate-y-10 transition-transform duration-500 ${classes}`}
                onClick={(event) => event.stopPropagation()}
                ref={contentRef}
            >
                <button
                    className='absolute right-0 p-3 text-neutral-500 hover:text-neutral-200'
                    onClick={close}
                >
                    <XMarkIcon className='h-8 w-8'/>
                </button>
                {children}
            </div>
        </div>,
        document.body
    )
};

export default BaseModal;