import React, { useEffect, useState } from "react";

const UnmountTest = () => {
    useEffect(() => {
        console.log("mount");

        return () => {
            //unmount시점에 실행.
            console.log("unmount")
        }
    }, [])

    return (
        <div>UnmountTest Testing Component</div>
    )
}

const LifeCycle = () => {

    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => setIsVisible(!isVisible);

    return <div style={{ padding: 20 }}>
        <button onClick={toggle}>ON/OFF</button>
        {isVisible && <UnmountTest />}
    </div>
}

export default LifeCycle;