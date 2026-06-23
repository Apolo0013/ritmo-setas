import './HitZone.scss'
//Hook
import useHitZone from '../../hook/useHitZone'
import { useEffect, useRef } from 'react'
//services
import { addCallBackKeyDown } from '../../../../shared/services/keydownManager'
import useGame from '../../hook/useGame'
import { useAudio } from '../../store/audioContext/useAudio'
import KeyPlayer from './KeyPlayer'
import useGameResult from '../../hook/useGameResult'

function HitZone() {
    //ref
    const refDetector = useRef<HTMLDivElement | null>(null)
    const refParent = useRef<HTMLDivElement | null>(null)
    //hook principal, onde ele vai move as keys/setas
    const {
        notes,
        refNotesEl
    } = useGame({
        refDetector,
        refParent
    })
    //hook
    const {
        handlerKeyDown,
        registerKeyLost,
        registerRefKey
    } = useHitZone({
        refDetector, 
        refParent,
        refNotesEl
    })
    //Registrado o evento do GameResult.tsx
    useGameResult()
    //use Effect
    useEffect(() => {
        addCallBackKeyDown((e) => handlerKeyDown({
            e
        }))
    }, [])
    return (
        <div className='play-hitzone'>
            <div
                className="detector"
                ref={refDetector}
            ></div>
            <div
                className="wraper-keys-move"
                ref={refParent}
            >
                {
                    notes ?
                        notes.map(({ direction, angle, lane, order, time}, k) => (
                            <KeyPlayer
                                angle={angle}
                                direction={direction}
                                lane={lane}
                                k={k}
                                order={order}
                                refNotesEl={refNotesEl}
                                time={time}
                                key={k}
                                //registradoras
                                registerRefKey={registerRefKey}
                                registerKeyLost={registerKeyLost}
                            />
                    ))
                        : null
                }
            </div>
        </div>
    )
}

export default HitZone