
interface FormStateType{
    email: string;
    password: string;
    userName?: string;
}

interface FormErrorsType{
    email?:string;
    password?: string;
    userName?: string;
}

export type {
    FormErrorsType,
    FormStateType
}