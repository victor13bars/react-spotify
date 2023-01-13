import {debounce, MIN_DESKTOP_WIDTH} from "../utils";
import {useRef, useState, useEffect} from "react";

const usePopoverPosition = (ref, screenChangeCallback) => {

    const isCurrentWindowWidthSmall = () => {
        return window.innerWidth < MIN_DESKTOP_WIDTH
    }

    const isCurrentWindowWidthBig = () => {
        return window.innerWidth >= MIN_DESKTOP_WIDTH
    }

    const [isSmallScreen, setIsSmallScreen] = useState(isCurrentWindowWidthSmall)
    const [target, setTarget] = useState()
    const changeWidthTimer = useRef()

    const move = (target, offset) => {
        offset = offset || calculateTargetOffset(target)

        ref.current.style.top = `${offset.top}px`
        ref.current.style.left = `${offset.left}px`

        setTarget(target)
    }

    const calculateTargetOffset = (target) => {
        const {top, right, left, height} = target.getBoundingClientRect()

        return {
            top: isSmallScreen ? top + height * 2 : top - (height / 3) * 2,
            left: isSmallScreen ? left : right + 30
        }
    }

    const screenHasBecomeSmall = () => {
        return isCurrentWindowWidthSmall() && !isSmallScreen
    }

    const screenHasBecomeBig = () => {
        return isCurrentWindowWidthBig() && isSmallScreen
    }

    useEffect(() => {

        const handleResize = () => {
            if (!screenHasBecomeSmall() && !screenHasBecomeBig()) return

            screenChangeCallback()
            clearTimeout(changeWidthTimer.current)

            changeWidthTimer.current = setTimeout(
                () => setIsSmallScreen(isCurrentWindowWidthSmall),
                300
            )
        }

        const debounceResize = debounce.bind(null, handleResize, 300)

        window.addEventListener('resize', debounceResize)

        return () => window.removeEventListener('resize', debounceResize)
    })

    return {
        move, target, setTarget, isSmallScreen
    }
}

export default usePopoverPosition