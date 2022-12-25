import {useEffect, useRef, useState} from "react";

const useContextSubmenu = (items, closePreviousIfOpen, menuItemRef) => {

    const [state, setState] = useState({
        isOpen: false,
        positionClasses: ''
    })
    const closeTimer = useRef(null)

    const open = () => {

        closePreviousIfOpen(startCloseTimer)

        setState({
            isOpen: true,
            positionClasses: getPositionClasses()
        })
    }

    const close = () => {
        setState({
            isOpen: false,
            positionClasses: ''
        })
    }

    const startCloseTimer = () => {
        closeTimer.current = setTimeout(close, 100)
    }

    const stopCloseTimer = () => {
        clearTimeout(closeTimer.current)
    }

    useEffect(() => {
        return () => stopCloseTimer()
    })

    const getPositionClasses = (items, menuItemRef) => {
        return `${getPositionYClass()} ${getPositionXClass()}`
    }

    const getPositionXClass = () => {
        const menuItem = menuItemRef.current
        const menuItemWidth = menuItem.offsetWidth
        const windowWidth = window.innerWidth
        const menuItemRightCoordX = menuItem.getBoundingClientRect().right
        const shouldMoveLeft = menuItemWidth > windowWidth - menuItemRightCoordX

        return shouldMoveLeft ? 'right-full' : 'left-full'
    }

    const getPositionYClass = () => {
        const windowHeight = window.innerHeight
        const menuItem = menuItemRef.current
        const menuHeight = menuItem.offsetHeight * items.length
        const menuItemBottomCoordY = menuItem.getBoundingClientRect().bottom
        const shouldMoveUp = menuHeight > windowHeight - menuItemBottomCoordY

        return shouldMoveUp ? 'bottom-0' : 'top-0'
    }

    return {
        open,
        items,
        ...state
    }
}

export default useContextSubmenu