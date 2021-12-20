export interface IEvent {
    id: number
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
    eventId?: number
}
