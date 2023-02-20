export enum EventTypes {
    success,
    warning,
    error
}

export interface ToastEvent {
    title: string,
    message: string,
    type: EventTypes
}