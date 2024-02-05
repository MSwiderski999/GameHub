import React, { ReactElement } from "react";
import './errorMessage.scss'
interface ErrorMessageProps{
    content?: string
}
export default function ErrorMessage(props: ErrorMessageProps){
    return <p className="err-message">{props.content}</p>
}