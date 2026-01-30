import  type {FormErrorsType,FormStateType} from './FormStateAndErrorType'


export type Action= {
            type : 'UPDATE_FIELD';
            field: keyof FormStateType;  // (type guarding) 'keyof' interface converted into "type FormStateType= 'userName'|'email'|'password' " limit the field value.
            value: string;
        }  | {
            type : 'VALIDATE';
            errors?: FormErrorsType;
        } | {
            type: 'RESET';
            errors?: FormErrorsType;
        };