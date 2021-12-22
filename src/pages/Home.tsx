import React from 'react'
import IPage from '../interfaces/page'
import EventList from '../features/events/EventList'
import Subscribe from '../features/subscribe/Subscribe'
import EventForm from '../features/events/EventForm'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { changeModeEvent, selectModeEvent } from '../features/events/eventSlice'
import styled from 'styled-components'
import { ButtonStyled } from '../style/styled-components/ButtonStyled'

const Home: React.FunctionComponent<IPage> = () => {
    const modeEvent = useAppSelector(selectModeEvent)
    const dispatch = useAppDispatch()

    return (
        <MainStyled>
            <div>
                <ButtonStyled onClick={() => dispatch(changeModeEvent({ type: 'create' }))}>
                    Creer évenement
                </ButtonStyled>
            </div>
            <EventList />
            {modeEvent.mode.type === 'subscribe' && <Subscribe />}
            {(modeEvent.mode.type === 'edit' || modeEvent.mode.type === 'create') && <EventForm />}
        </MainStyled>
    )
}

const MainStyled = styled.main`
    display: flex;
    flex-direction: column;
    padding: 14px 21px;
`

export default Home
