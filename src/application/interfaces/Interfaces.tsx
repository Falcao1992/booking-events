export type TMode = {
    type: 'default' | 'create' | 'edit' | 'subscribe'
    eventId?: number | string
}

export type TRegion = {
    nom: string
    code: string
}
export type TDepartment = {
    nom: string
    code: string
    codeRegion: string
}

export interface EventsState {
    list: IEvent[]
    selected: number | string
    alreadyRegistered: IEvent[]
    mode: TMode
    status: 'idle' | 'loading' | 'failed' | 'fetched'
    listRegions: TRegion[]
    departments?: string
}

export interface IEvent {
    id: number | string
    name: string
    description: string
    beginDate: string
    endDate: string
    nbReservations: number
    limitReservation: number
    isSubscribed: boolean
    country?: string
    department?: string
}

export interface IRegistration {
    firstname: string
    lastname: string
    email: string
    phoneNumber?: number | string
    eventId?: number | string
}
