import React, { useCallback } from 'react'
import { IEvent } from './Interface'
import styled from 'styled-components'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { registrationToEvent, selectEventAlreadyRegistered } from './eventSlice'

interface Props {
    event: IEvent
}

const EventCard = ({ event }: Props) => {
    const alreadyRegistered = useAppSelector(selectEventAlreadyRegistered)
    const dispatch = useAppDispatch()

    const checkAlreadyRegister = useCallback(
        (eventId: number): boolean => {
            return !!(eventId && alreadyRegistered.find((ev) => ev === eventId))
        },
        [alreadyRegistered],
    )

    const openRegistration = () => {
        dispatch(registrationToEvent(event.id))
    }

    const formatDate = (date: string) => {
        const formatDate = Date.parse(date)
        return format(formatDate, 'EEEE d MMMM', { locale: fr })
    }

    return (
        <CardStyled isAlreadyRegister={checkAlreadyRegister(event.id)}>
            <h4>{event.name}</h4>
            <p>{`Du ${formatDate(event.beginDate)} au ${formatDate(event.beginDate)}`}</p>
            <div>
                <p>
                    Reservation: {event.nbReservations} / {event.limitReservation}
                </p>
                <button type="button" disabled={checkAlreadyRegister(event.id)} onClick={() => openRegistration()}>
                    Participer
                </button>
            </div>
        </CardStyled>
    )
}

interface CardProps {
    readonly isAlreadyRegister: boolean
}

const CardStyled = styled.div<CardProps>`
    display: flex;
    width: 25%;
    min-width: 25%;
    padding: 14px;
    margin-right: 7px;
    flex-direction: column;
    color: #1b1a71;
    background-color: ${(p) => (p.isAlreadyRegister ? '#0cf88036' : '#dcdbf9')};
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
        button[disabled] {
            background-color: #5e5af7;
            opacity: 0.2;
        }
    }
`

export default EventCard
