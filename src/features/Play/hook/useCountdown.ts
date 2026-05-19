import { useEffect, useRef } from "react"

function useCountDown() {
    function Update() { 
        let index = 1
        const timer = setInterval(() => {
            if (!refWraperCount.current) return
            refWraperCount.current.style.transform = `translateY(-${index * 250}px)`
            console.log(index * 250)
            index++
            if (index == current + 1) clearInterval(timer)
        }, 1000)
    }
    const refWraperCount = useRef<HTMLDivElement | null>(null)
    const current: number = 3

    useEffect(() => {
        Update()
    }, [])
    return {
        refWraperCount
    }
}

export default useCountDown