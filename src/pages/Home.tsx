import React from 'react'
import IPage from '../interfaces/page'
import EventList from '../features/events/EventList'
import Subscribe from '../features/subscribe/Subscribe'

const Home: React.FunctionComponent<IPage> = () => {
    return (
        <main>
            <EventList />
            <Subscribe />
        </main>
    )
}

export default Home
