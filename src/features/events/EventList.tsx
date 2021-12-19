import React, { FC } from 'react'
import EventCard from './EventCard'
import { useAppSelector } from '../../app/hooks'
import { selectEvents } from './eventSlice'
import { IEvent } from './Interface'

const EventList: FC = () => {
    const events = useAppSelector(selectEvents)

    return (
        <section>
            {events.map((event: IEvent, key: number) => {
                return <EventCard key={key} event={event} />
            })}
        </section>
    )
}

export default EventList
