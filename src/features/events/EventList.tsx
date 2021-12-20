import React, { FC } from 'react'
import EventCard from './EventCard'
import { useAppSelector } from '../../app/hooks'
import { selectEvents } from './eventSlice'
import { IEvent } from './Interface'
import styled from 'styled-components'

const EventList: FC = () => {
    const events = useAppSelector(selectEvents)

    return (
        <ContainerStyled>
            {events.map((event: IEvent, key: number) => {
                return <EventCard key={key} event={event} />
            })}
        </ContainerStyled>
    )
}

const ContainerStyled = styled.section`
    display: flex;
    margin: 14px;
`

export default EventList
