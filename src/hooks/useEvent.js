import {useEffect} from "react";

const useEvent = (name, handler, shouldHandler = () => true, target = document) => {

    useEffect(() => {

        if (!shouldHandler()) return

        target.addEventListener(name, handler)

        return () => target.removeEventListener(name, handler)
    })

}

export default useEvent