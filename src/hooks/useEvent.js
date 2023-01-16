import {useEffect} from "react";

const useEvent = (name, handler, shouldHandler = () => true, target = document) => {

    useEffect(() => {

        if (!shouldHandler()) return

        target = target instanceof Function ? target() : target

        target.addEventListener(name, handler)

        return () => target.removeEventListener(name, handler)
    })

}

export default useEvent