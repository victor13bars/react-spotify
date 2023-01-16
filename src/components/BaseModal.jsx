import React, {useEffect, useRef} from 'react';
import {XMarkIcon} from '@heroicons/react/24/outline'
import useEvent from "../hooks/useEvent";

const BaseModal = ({onClose: handleClose}) => {

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


    return (
        <div
            className='fixed inset-0 bg-black/70 z-30 flex justify-center items-center opacity-0 transition-opacity duration-500'
            role='dialog'
            ref={ref}
            onClick={close}
        >
            <div
                className='flex flex-col relative bg-[#333] text-white h-80 w-[480px] rounded-xl -translate-y-10 transition-transform duration-500'
                onClick={(event) => event.stopPropagation()}
                ref={contentRef}
            >
                <button
                    className='absolute right-0 p-3 text-neutral-500 hover:text-neutral-200'
                    onClick={close}
                >
                    <XMarkIcon className='h-8 w-8'/>
                </button>
                <h1 className='text-3xl pt-8 pb-3 px-8 font-bold leading-relaxed border-b border-neutral-600'>
                    About recommendations
                </h1>
                <div className='py-6 px-8 overflow-y-auto'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Accusantium architecto aspernatur doloremque dolores error, facilis magnam rerum.
                    Accusantium adipisci aliquid animi assumenda atque aut commodi culpa cupiditate dicta dolorum
                    ducimus enim facere fugiat hic ipsam iste laboriosam libero magni molestias nisi nobis obcaecati
                    provident quam, quia quod rem saepe sed similique temporibus vel.
                    Distinctio dolorum et in necessitatibus temporibus vel voluptatum.
                    Ab accusamus autem deleniti dolor dolores dolorum earum excepturi facilis itaque, mollitia
                    necessitatibus nemo, nihil non quibusdam veniam voluptas voluptates.
                    Consequatur culpa delectus ea esse exercitationem id illo inventore ipsum iste libero maiores
                    molestiae obcaecati placeat veritatis vero, voluptates?
                </div>
            </div>
        </div>
    );
};

export default BaseModal;