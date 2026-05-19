import './Countdown.scss'
//store
import { countDownState } from '../../store/countDown.store'
//hook
import { useAudio } from '../../store/audioContext/useAudio'
import { useEffect } from 'react'
import useCountDown from '../../hook/useCountdown'

function CountDown() {
    const { playAudio } = useAudio()!
    const TimeOutCount = countDownState(state => state.TimeOutCount)
    //
    const {refWraperCount} = useCountDown()

    useEffect(() => {
        TimeOutCount(playAudio)
    }, [])
    return (
        <div className="count-down">
            <div className='conteiner-count'>
                <div
                    className="wraper-count"
                    ref={refWraperCount}
                >
                    <p>3</p>
                    <p>2</p>
                    <p>1</p>
                </div>
            </div>
        </div>
    )
}

export default CountDown