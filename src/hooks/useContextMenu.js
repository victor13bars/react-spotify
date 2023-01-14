import {useEffect, useRef, useState} from "react";
import useContextMenuPosition from "./useContextMenuPosition";
import useClickAway from "./useClickAway";


const useContextMenu = (items) => {

    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef(null)
    const move = useContextMenuPosition(ref, isOpen)

    const open = (event) => {
        event.preventDefault()

        move(event.clientX, event.clientY)
        setIsOpen(true)
    }

    const close = () => {
        setIsOpen(false)
    }

    useClickAway(ref, close, () => isOpen)

    useEffect(() => {

        if (!isOpen) return


        const handleEsc = ({key}) => {
            if (key === 'Escape') {
                close()
            }
        }

        document.addEventListener('keydown', handleEsc)

        return () => document.removeEventListener('keydown', handleEsc)
    })

    return {
        open,
        close,
        isOpen,
        ref,
        items
    }
}

export default useContextMenu