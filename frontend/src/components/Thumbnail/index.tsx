import { useNavigate } from 'react-router-dom'
import './thumbnail.scss'

interface ThumbnailProps{
    name: string,
    imgsrc?: string,
    description?: string,
    url?: string
}

export default function Thumbnail(props: ThumbnailProps){
    const navigate = useNavigate()
    return (
        <div className='thumbnail-container'>
            <h1>{props.name}</h1>
            <div className='img-container'><img src={props.imgsrc} alt={props.name}/></div>
            <div className='on-hover'>
                <p>{props.description}</p>
                <button className='play-button' onClick={() => { if(props.url)navigate(props.url)}}>Play</button>
            </div>
        </div>
    )
}