import React from 'react'
import IPage from '../interfaces/page'
import EventList from '../features/events/EventList'
import Subscribe from '../features/subscribe/Subscribe'
import EventForm from '../features/events/EventForm'
import { useAppSelector } from '../app/hooks'
import { selectModeEvent } from '../features/events/eventSlice'

const Home: React.FunctionComponent<IPage> = () => {
    const modeEvent = useAppSelector(selectModeEvent)
    return (
        <main>
            <EventList />
            {modeEvent.mode.type === 'subscribe' && <Subscribe />}
            {(modeEvent.mode.type === 'edit' || modeEvent.mode.type === 'create') && <EventForm />}
        </main>
    )
}

export default Home
