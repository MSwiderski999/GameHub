import { ReactNode } from "react";
import './formContainer.scss'

interface FormContainerProps{
    children: ReactNode
}

export default function FormContainer(props: FormContainerProps){
    return (
        <div className="form-container">{props.children}</div>
    )
}