import {useEffect, useLayoutEffect, useRef, useState} from "react";

const clickPosition = {x: null, y: null}

const useContextMenu = () => {
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false)
    const contextMenuRef = useRef(null)
    const openContextMenu = (event) => {
        event.preventDefault()
        clickPosition.x = event.clientX
        clickPosition.y = event.clientY
        setIsContextMenuOpen(true)
    }
    const closeContextMenu = () => {
        setIsContextMenuOpen(false)
    }

    const updateContextMenuHorizontalPosition = () => {

        const menuWidth = contextMenuRef.current.offsetWidth
        const shouldMoveLeft = menuWidth > window.innerWidth - clickPosition.x

        contextMenuRef.current.style.left = shouldMoveLeft
            ? `${clickPosition.x - menuWidth}px`
            : `${clickPosition.x}px`
    }

    const updateContextMenuVerticalPosition = () => {

        const menuHeight = contextMenuRef.current.offsetHeight
        const shouldMoveUp = menuHeight > window.innerHeight - clickPosition.y

        contextMenuRef.current.style.top = shouldMoveUp
            ? `${clickPosition.y - menuHeight}px`
            : `${clickPosition.y}px`
    }

    const updateContextMenuPosition = () => {
        updateContextMenuHorizontalPosition()
        updateContextMenuVerticalPosition()
    }

    useLayoutEffect(() => {
        if (isContextMenuOpen) {
            updateContextMenuPosition()
        }
    })

    useEffect(() => {

        if (!isContextMenuOpen) return

        const handleClickAway = ({target}) => {
            if (!contextMenuRef.current.contains(target)) {
                closeContextMenu()
            }
        }

        const handleEsc = ({key}) => {
            if (key === 'Escape') {
                closeContextMenu()
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
        openContextMenu,
        isContextMenuOpen,
        contextMenuRef
    }
}

export default useContextMenu