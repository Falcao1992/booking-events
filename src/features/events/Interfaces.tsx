export type TMode = {
    type: 'default' | 'create' | 'edit'
    eventId?: number | string
}

export interface EventsState {
    list: IEvent[]
    selected: number | string
    alreadyRegistered: (number | string)[]
    mode: TMode
}

export interface IEvent {
    id: number | string
    name: string
    beginDate: string
    endDate: string
    nbReservations: number
    limitReservation: number
}

export interface IRegistration {
    firstname: string
    lastname: string
    email: string
    phoneNumber?: number | string
    eventId?: number | string
}
