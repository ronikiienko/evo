import {Time} from "./utils/Time";

export const wrappedRAF = (callback: Function) => {
    let lastTime =  new Time(performance.now())
    let stoppedFlag = false
    const localCb = (timestamp: DOMHighResTimeStamp) => {
        if (stoppedFlag) return
        let newTime = new Time(timestamp)
        const dt = newTime.subtract(lastTime)
        lastTime = newTime
        callback(dt)
        requestAnimationFrame(localCb)
    }
    requestAnimationFrame(localCb)

    return () => {
        stoppedFlag = true
    }
}
