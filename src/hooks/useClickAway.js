import {useEffect} from "react";

const useClickAway = (ref, handle, shouldHandle = () => false) => {

    useEffect(() => {

        const handleMousedown = (event) => {
            if (shouldHandle(event) && !ref.current.contains(event.target)) handle()
        }

        document.addEventListener('mousedown', handleMousedown)

        return () => document.removeEventListener('mousedown', handleMousedown)

    })

}

export default useClickAway