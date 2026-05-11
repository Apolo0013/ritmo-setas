import './Content.scss'
//imagem
import ImgPlay from '../../../../shared/assets/play.svg'
import {imagens} from '../../../../shared/assets/index'
//Funcao utils
import { useEffect, useRef } from 'react'
import useContent from '../../hook/useContent'

function Content() {
    //referencia
    const refKeys = useRef<HTMLDivElement | null>(null)
    //hook
    const {TradeRotate} = useContent()
    useEffect(() => {
        if (!refKeys.current) return
        TradeRotate(refKeys.current)
    }, [])
    return (
        <section className='home-content'>
            <div className='flex flex-col gap-2 items-center'>
                <h1 className='title-main'>Cetas Ritmo</h1>
                <p className='title-seg'>Jogue de ritmo com teclado</p>
            </div>
            <button className='button-play'>
                <img
                    className='aspect-square h-[32px]'
                    src={ImgPlay}
                    alt="Imagem de play"
                />
                <h2>Play</h2>
            </button>
            <div
                className='w-auto h-[50px] flex gap-2'
                ref={refKeys}
            >
                {
                    [1, 2, 3, 4, 5, 6].map((k) => (
                        <img
                            key={k}
                            className='h-full aspect-square transition duration-500'
                            src={imagens.arrow}
                            alt="Imagem de um ceta"
                        />
                    ))
                }
            </div>
            <p>Pressione no tempo certo</p>
        </section>
    )
}

export default Content