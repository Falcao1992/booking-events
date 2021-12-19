import React from 'react'
import { IEvent } from './Interface'

/* type EventType = {
    id: number
    name: string
    beginDate: string
    endDate: string
    nbReservations: number
    limitReservation: number
} */

interface Props {
    event?: IEvent
}

const EventCard = ({ event }: Props) => {
    return (
        <div>
            <h4>{event?.name}</h4>
        </div>
    )
}

export default EventCard
