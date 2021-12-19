import React from 'react'
import IPage from '../interfaces/page'
import EventList from '../features/events/EventList'

const Home: React.FunctionComponent<IPage> = () => {
    return (
        <main>
            <EventList />
        </main>
    )
}

export default Home
