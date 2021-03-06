import React, { useCallback, useEffect, useState } from 'react'
import { IEvent } from '../../../application/interfaces/Interfaces'
import styled from 'styled-components'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useAppDispatch, useAppSelector } from '../../../application/hooks'
import {
    changeModeEvent,
    deleteEvent,
    registrationToEvent,
    selectEventAlreadyRegistered,
    unSubscribedToEvent,
} from '../../../application/event/eventSlice'
import { Icon } from '@iconify/react'
import bxMessageSquareEdit from '@iconify/icons-bx/bx-message-square-edit'
import crossMark from '@iconify/icons-emojione-v1/cross-mark'

interface Props {
    event: IEvent
}

const EventCard = ({ event }: Props) => {
    const alreadyRegistered = useAppSelector(selectEventAlreadyRegistered)
    const [stateSubscription, setStateSubscription] = useState('')
    const dispatch = useAppDispatch()

    useEffect(() => {
        checkAlreadyRegister(event.id, event.nbReservations, event.limitReservation)
    }, [stateSubscription])

    const checkAlreadyRegister = useCallback(
        (eventId: number | string, nbReservation: number, limitReservation: number): void => {
            if (nbReservation >= limitReservation) {
                setStateSubscription('limitReached')
            } else if (eventId && alreadyRegistered.filter((ev) => ev.id === eventId).length) {
                setStateSubscription('alreadyRegistered')
            } else {
                setStateSubscription('available')
            }
        },
        [alreadyRegistered],
    )

    const openRegistration = () => {
        dispatch(registrationToEvent(event.id))
        dispatch(changeModeEvent({ type: 'subscribe', eventId: event.id }))
        checkAlreadyRegister(event.id, event.nbReservations, event.limitReservation)
    }

    const unSubscribed = () => {
        dispatch(unSubscribedToEvent(event.id))
        checkAlreadyRegister(event.id, event.nbReservations, event.limitReservation)
    }

    const formatDate = (date: string) => {
        const formatDate = Date.parse(date)
        return format(formatDate, "EEEE d MMMM '??' h'h' mm", { locale: fr })
    }

    const generateStatus = (): string => {
        if (stateSubscription === 'limitReached') {
            return 'inscriptions ferm??es'
        } else if (stateSubscription === 'alreadyRegistered') {
            return 'd??ja inscrit'
        }
        return 'inscriptions ouvertes'
    }

    const { id, name, description, beginDate, endDate, nbReservations, limitReservation } = event
    return (
        <CardStyled status={stateSubscription}>
            <BlockStatus>
                <p>{generateStatus()}</p>
            </BlockStatus>
            <div>
                <h4>{name}</h4>
                <div>
                    <button type="button" onClick={() => dispatch(changeModeEvent({ type: 'edit', eventId: id }))}>
                        <IconStyled icon={bxMessageSquareEdit} width="21" height="21" />
                    </button>
                    <button type="button" onClick={() => dispatch(deleteEvent(id))}>
                        <IconStyled icon={crossMark} width="21" height="21" />
                    </button>
                </div>
            </div>
            <BlockDate>
                <p>{`Du ${formatDate(beginDate)}`}</p>
                <p>{`Au ${formatDate(endDate)}`}</p>
            </BlockDate>
            <div>
                <p>{description}</p>
            </div>
            <div>
                <p>
                    Reservation: {nbReservations} / {limitReservation}
                </p>
                <button
                    type="button"
                    disabled={stateSubscription === 'limitReached'}
                    onClick={() => (stateSubscription === 'alreadyRegistered' ? unSubscribed() : openRegistration())}
                >
                    {stateSubscription === 'alreadyRegistered' ? 'se d??sinscrire' : 'participer'}
                </button>
            </div>
        </CardStyled>
    )
}

const BlockStatus = styled.div`
    width: 100%;
    color: #1b1a71;
    font-weight: 600;
    margin: 7px 0;
    padding: 3.5px;
    display: flex;
    justify-content: center !important;
    text-transform: uppercase;
    border-radius: 8px;

    p {
        margin: 2px 0;
        letter-spacing: 2px;
        text-transform: capitalize;
    }
`

interface CardProps {
    readonly status: string
}

const CardStyled = styled.article<CardProps>`
    display: flex;
    width: 25%;
    min-width: 25%;
    padding: 7px 14px;
    margin-right: 7px;
    flex-direction: column;
    color: #1b1a71;
    background-color: #dcdbf9;
    border-radius: 16px;

    ${BlockStatus} {
        background-color: ${(p) =>
            p.status === 'alreadyRegistered' ? '#0cf88036' : p.status === 'limitReached' ? '#e5062238' : 'aliceblue'};
    }

    @media screen and (max-width: 640px) {
        width: 50%;
        min-width: 50%;
    }

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
            margin-left: 7px;
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

    & div:last-child {
        margin-top: auto;
    }

    p {
        word-break: break-all;
    }
`

const IconStyled = styled(Icon)`
    cursor: pointer;
    transition: transform 0.3s linear;

    &:hover {
        transform: scale(1.2);
    }
`

const BlockDate = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start !important;

    p {
        font-size: 14px;
        margin: 2px 0;
    }
`

export default EventCard
