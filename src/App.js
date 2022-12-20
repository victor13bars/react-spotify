import React, {useEffect, useRef, useState} from 'react';
import TheSidebar from "./components/TheSidebar";
import TheSidebarOverlay from "./components/TheSidebarOverlay";
import TheHeader from "./components/TheHeader";
import TheMain from "./components/TheMain";
import TheRegistration from "./components/TheRegistration";


const App = () => {
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

    useEffect(() => {
        const contentWrapper = contentWrapperRef.current
        contentWrapper.addEventListener('wheel', handleScrolling)

        return () => contentWrapper.removeEventListener('wheel', handleScrolling)
    })
    return (
        <>
            <div className="flex flex-grow overflow-auto">
                <TheSidebar/>
                <TheSidebarOverlay/>
                <div className="flex-1 overflow-auto" ref={contentWrapperRef}>
                    <TheHeader/>
                    <TheMain toggleScrolling={toggleScrolling}/>
                </div>
            </div>
            <TheRegistration/>
        </>
    )
}

export default App;
