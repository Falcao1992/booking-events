import React from 'react'
import IPage from '../interfaces/page'
import EventList from '../features/events/EventList'
import Subscribe from '../features/subscribe/Subscribe'
import EventForm from '../features/events/EventForm'

const Home: React.FunctionComponent<IPage> = () => {
    return (
        <main>
            <EventList />
            <Subscribe />
            <EventForm />
        </main>
    )
}

export default Home
