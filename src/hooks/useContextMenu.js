import {useEffect, useRef, useState} from "react";
import useContextMenuPosition from "./useContextMenuPosition";


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

    useEffect(() => {

        if (!isOpen) return

        const handleClickAway = ({target}) => {
            if (!ref.current.contains(target)) {
                close()
            }
        }

        const handleEsc = ({key}) => {
            if (key === 'Escape') {
                close()
            }
        }

        document.addEventListener('mousedown', handleClickAway)
        document.addEventListener('keydown', handleEsc)

        return () => {
            document.removeEventListener('mousedown', handleClickAway)
            document.removeEventListener('keydown', handleEsc)
        }
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