import { useEffect, useRef, useState} from "react"
import {
    directions,
    validKey,
    type ParamuseGame,
    type ParamgetX,
    type GradeInformation,
    type GradeInformationEl,
    type Validkeys
} from "./type"
import { useAudio } from "../store/audioContext/useAudio"


function useGame({ 
    refDetector,
    refParent,
}: ParamuseGame) {
    function randint(min: number, max: number): number {
       return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getX({ currentTime, noteTime }: ParamgetX): number {
        //caso distance seja 0
        if (distance.current == 0) return 0
        const spawnTime: number = noteTime - travelTime
        const progress: number = (currentTime - spawnTime) / travelTime
        return spawnX + progress * distance.current
    }

    function render() {
        if (!refAudio || !refAudio.current) return
        const currentTime: number = refAudio.current.currentTime * 1000
        refNotesEl.current.forEach(({ el, time, angle}) => {
            const X: number = getX({ // calculo o eixo X dele
                currentTime,
                noteTime: time
            })
            el.style.transform = ` 
                translateX(${X}px)
                /*rotate(${angle})*/
            ` // colocando as posicao
            // - posicao X
            // - ir manter o angulo/angle !- nao sera mais necessario.
        })
    }

    function update() {
        render()
        requestAnimationFrame(update)
    }

    function GenerateNotes(): GradeInformation[]  | null{
        if (!refAudio.current) return null
        let order: number = 0 // indice da order
        const gradeInfoTemp: GradeInformation[] = [] // lista temporaria
        let timeCount: number = randint(3000, 5000)

        while (true) {
            //direcao sorteanda
            const direction: Validkeys = validKey[randint(0, 3)]
            gradeInfoTemp.push({
                lane: 0,
                time: timeCount,
                order: order,
                direction: direction,
                angle: directions[direction]
            })
            order++
            timeCount += randint(2000, 5000)
            //parar quando o time Count ultrapassa a duracao do audio
            if ((timeCount / 1000) >= refAudio.current.duration) 
                return gradeInfoTemp // retornando a lista ja gerada
        }
    }

    function Main(audio: HTMLAudioElement) {
        console.log(!notes || refNotesEl.current.length == 0)
        if (!notes || refNotesEl.current.length == 0) return
        update()
        return () => audio.removeEventListener('loadedmetadata', GenerateNotes)
    }
    //context
    const { refAudio  } = useAudio()!

    const travelTime: number = 2000
    const spawnX: number = -100
    const distance = useRef<number>(0)
    //notas geradas
    const [notes, setnotes] = useState<GradeInformation[] | null>([])
    const refNotesEl = useRef<GradeInformationEl[]>([])
    
    useEffect(() => {
        if (!refParent.current || !refDetector.current) return
        //informacao
        const detectorX: number = refDetector.current.getBoundingClientRect().x
        distance.current = detectorX - spawnX
    }, [refAudio, refDetector, refParent])

    useEffect(() => {
        if (!refAudio || !refAudio.current) return
        const audio: HTMLAudioElement = refAudio.current
        audio.addEventListener('loadedmetadata', () => {
            setnotes(GenerateNotes())
        })
        Main(audio) 
    }, [refNotesEl, notes])

    return {
        notes,
        refNotesEl
    }
}

export default useGame