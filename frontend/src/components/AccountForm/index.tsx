import { ReactNode } from "react";
import './formContainer.scss'
import React from "react";

interface FormContainerProps{
    children: ReactNode
}

export default function FormContainer(props: FormContainerProps){
    return (
        <div className="form-container">{props.children}</div>
    )
}