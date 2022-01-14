import React, { FC } from 'react'
import EventCard from './EventCard'
import { useAppSelector } from '../../../application/hooks'
import { selectEvents } from '../../../application/event/eventSlice'
import { IEvent } from '../../../application/interfaces/Interfaces'
import styled from 'styled-components'

const EventList: FC = () => {
    const events = useAppSelector(selectEvents)

    return (
        <ContainerStyled>
            {events.map((event: IEvent) => {
                return <EventCard key={event.id} event={event} />
            })}
        </ContainerStyled>
    )
}

const ContainerStyled = styled.section`
    display: flex;
    overflow-x: scroll;
    margin: 14px 0;
    padding-bottom: 7px;

    & article:last-child {
        margin-right: 0;
    }

    &::-webkit-scrollbar {
        width: 4px;
        height: 14px;
    }

    &::-webkit-scrollbar-thumb {
        border: 4px solid #dcdbf9;
        background-color: #1b1a71;
        border-radius: 21px;
        box-shadow: none;
    }
`

export default EventList
