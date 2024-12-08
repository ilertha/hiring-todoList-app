import dayjs, { Dayjs } from 'dayjs';
export interface NewUser {
    username: string;
    email: string;
    password: string;
}

export interface User{
    email: string;
    password: string;
}

export interface Task {
    title: string,
    description: string,
    duedate: any,
    completed: boolean,
    important: boolean,
    uuid?: string,
    users?: any,
    userUuid?:string
}

export interface ModalPropsInfo {
    open: boolean,
    handleClose: () => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value: Task,
    onChangedate:(duedate: Dayjs | null) => void;
    handleSubmit: () => void,
    isEditing: boolean,
    selected: Dayjs | null; 
}