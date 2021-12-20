import React from 'react'
import { IEvent } from './Interface'
import styled from 'styled-components'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

/* type EventType = {
    id: number
    name: string
    beginDate: string
    endDate: string
    nbReservations: number
    limitReservation: number
} */

interface Props {
    event: IEvent
}

const formatDate = (date: string) => {
    const formatDate = Date.parse(date)
    return format(formatDate, 'EEEE d MMMM', { locale: fr })
}

const EventCard = ({ event }: Props) => {
    return (
        <CardStyled>
            <h4>{event.name}</h4>
            <p>{`Du ${formatDate(event.beginDate)} au ${formatDate(event.beginDate)}`}</p>
            <div>
                <p>
                    Reservation: {event.nbReservations} / {event.limitReservation}
                </p>
                <button type="button">Participer</button>
            </div>
        </CardStyled>
    )
}

const CardStyled = styled.div`
    display: flex;
    width: 25%;
    padding: 14px;
    margin-right: 7px;
    flex-direction: column;
    color: #1b1a71;
    background-color: #dcdbf9;
    border-radius: 16px;
    h4 {
        margin: 7px 0;
        font-weight: 600;
        text-transform: capitalize;
    }
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        button {
            background-color: #5e5af7;
            color: #dcdbf9;
            border: 0;
            padding: 3px 7px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s linear;
            &:hover {
                background-color: #1b1a71;
            }
        }
    }
`

export default EventCard
