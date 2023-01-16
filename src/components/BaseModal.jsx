import React, {useEffect, useRef} from 'react';
import {XMarkIcon} from '@heroicons/react/24/outline'

const BaseModal = ({onClose: handleClose}) => {

    const ref = useRef()
    const contentRef = useRef()

    useEffect(() => {

        setTimeout(animate, 500)

        const handleEsc = ({key}) => {
            if (key === 'Escape') close()
        }

        document.addEventListener('keydown', handleEsc)

        return () => document.removeEventListener('keydown', handleEsc)
    })

    const close = () => {
        animate(true)

        setTimeout(handleClose, 500)
    }

    const animate = (isClosing = false) => {
        ref.current.classList.toggle('opacity-0',isClosing)
        contentRef.current.classList.toggle('-translate-y-10',isClosing)
    }

    return (
        <div
            className='fixed inset-0 bg-black/70 z-30 flex justify-center items-center opacity-0 transition-opacity duration-500'
            role='dialog'
            ref={ref}
            onClick={close}
        >
            <div
                className='relative bg-[#333] h-1/3 w-2/5 rounded-xl -translate-y-10 transition-transform duration-500'
                onClick={(event) => event.stopPropagation()}
                ref={contentRef}
            >
                <button
                    className='absolute right-0 p-3 text-neutral-500 hover:text-neutral-200'
                    onClick={close}
                >
                    <XMarkIcon className='h-8 w-8'/>
                </button>
            </div>
        </div>
    );
};

export default BaseModal;