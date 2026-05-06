import './HeaderLogo.scss'
//imagens
import ImgControl from '../../assets/control.svg'

function HeaderLogo() {
    return (
        <div className='head-logo'>
            <img
                className='aspect-square h-[80%]'
                src={ImgControl}
                alt="Imagem de um controle"
            />
            <h1>Setas Ritmo</h1>
        </div>
    )   
}

export default HeaderLogo