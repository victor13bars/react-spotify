import useEvent from "./useEvent";

const useClickAway = (ref, handle, shouldHandle = () => true) => {

    const handleMousedown = (event) => {
        if (shouldHandle(event) && !ref.current.contains(event.target)) handle()
    }

    useEvent('mousedown', handleMousedown)

}

export default useClickAway