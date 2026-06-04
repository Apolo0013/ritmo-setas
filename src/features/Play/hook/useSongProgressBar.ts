import { useEffect, useState } from "react";
import { useAudio } from "../store/audioContext/useAudio";

function useSongProgressBar() {
    function SetPercentageAudio() {
        if (!refAudio.current) return
        const timeCurrent: number = refAudio.current.currentTime
        const durationTime: number = refAudio.current.duration
        const porcentage: number = (timeCurrent / durationTime) * 100
        setPercentage(porcentage)
    }   


    function SetTimeUpdate() {
        const timeString: string | undefined = GetTime('current')
        if (!timeString) return
        setCurrentTime(timeString)
    }

    //Essa funcao é a responsavel por transforma, segundos em minutos restantes e segundos.
    //current: retorna o tempo que esta ocorrendo.
    //total: retorna o tempo/duracao da musica/audio.
    function GetTime(option: "current" | 'total'): string {
        if (!refAudio.current) return '--:--'
        const secordCurrent: number =
            option == 'current'
                ? refAudio.current.currentTime // segundos atual da musica
                : refAudio.current.duration // duracao total
        //caso o secordCurrnet seja NaN
        if (!secordCurrent) return '--:--'
        const minutes: number = Math.floor(secordCurrent / 60)
        const secords: number = Math.floor(secordCurrent % 60)
        return `${minutes > 9 ? minutes : '0'+minutes}:${secords > 9 ? secords : '0'+secords}`
    }

    function CallBackAll() {
        SetPercentageAudio() // progresso em porcetagem
        SetTimeUpdate() // atualizando o tempo atual da musica
    }

    const { setListCbTimeUpdate, refAudio } = useAudio()!
    
    const [percentage, setPercentage] = useState<number>(0)
    const [currentTime, setCurrentTime] = useState<string>('--:--')
    const durationSong = GetTime('total')

    useEffect(() => {
        setListCbTimeUpdate(CallBackAll)
    }, [])
    return {
        percentage,
        currentTime,
        durationSong
    }
}

export default useSongProgressBar