import React, {useEffect, useRef, useState} from 'react';
import TheSidebar from "./components/TheSidebar";
import TheSidebarOverlay from "./components/TheSidebarOverlay";
import TheHeader from "./components/TheHeader";
import TheMain from "./components/TheMain";
import TheRegistration from "./components/TheRegistration";
import BaseToast from "./components/BaseToast";

const App = () => {

    const [toastMessage, setToastMessage] = useState('')
    const toastRef = useRef()
    const closeToastTimer = useRef()
    const contentWrapperRef = useRef(null)
    let isScrollingEnabled = true

    const handleScrolling = (event) => {
        if (isScrollingEnabled) return

        event.stopPropagation()
        event.preventDefault()
    }

    const toggleScrolling = (isEnabled) => {
        isScrollingEnabled = isEnabled
    }

    const showToast = (message) => {
        clearTimeout(closeToastTimer.current)
        setToastMessage(message)
        toastRef.current.show()
        closeToastTimer.current = setTimeout(toastRef.current.hide, 3000)
    }

    useEffect(() => {
        const contentWrapper = contentWrapperRef.current
        contentWrapper.addEventListener('wheel', handleScrolling)

        return () => contentWrapper.removeEventListener('wheel', handleScrolling)
    })

    return (
        <>
            <div className="flex grow overflow-auto">
                <TheSidebar/>
                <TheSidebarOverlay/>
                <div className="flex-1 overflow-auto" ref={contentWrapperRef}>
                    <TheHeader/>
                    <TheMain
                        toggleScrolling={toggleScrolling}
                        showToast={showToast}
                    />
                </div>
            </div>
            <TheRegistration/>
            <BaseToast ref={toastRef}>
                {toastMessage}
            </BaseToast>
        </>
    )
}

export default App;
