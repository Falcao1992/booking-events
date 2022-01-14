import React, { FC } from 'react'
import { selectEventAlreadyRegistered } from '../../../application/event/eventSlice'
import { useAppSelector } from '../../../application/hooks'
import styled from 'styled-components'

const ResumeEventSubscribe: FC = () => {
    const eventSubscribed = useAppSelector(selectEventAlreadyRegistered)
    return (
        <FloatContainer>
            <h3>list des evenement enregistrer</h3>
            <ul>
                {eventSubscribed.map((event) => {
                    return <li key={event.id}>{event.name}</li>
                })}
            </ul>
        </FloatContainer>
    )
}

const FloatContainer = styled.div`
    background-color: lightcoral;
    width: 30%;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 14px 28px;
    padding: 7px 14px;
`

export default ResumeEventSubscribe
