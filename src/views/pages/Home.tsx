import React from 'react'
import IPage from '../../application/interfaces/page'
import EventList from '../components/events/EventList'
import Subscribe from '../components/subscribe/Subscribe'
import EventForm from '../components/events/EventForm'
import { useAppDispatch, useAppSelector } from '../../application/hooks'
import { changeModeEvent, selectModeEvent } from '../../application/event/eventSlice'
import styled from 'styled-components'
import { ButtonStyled } from '../../style/styled-components/ButtonStyled'
import { Icon } from '@iconify/react'
import circlePlus from '@iconify/icons-akar-icons/circle-plus'
import ResumeEventSubscribe from '../components/ResumeEventSubscribe/ResumeEventSubscribe'
import CountrySelect from '../components/events/CountrySelect'
import InputSplit from '../components/InputSplit/InputSplit'

const Home: React.FunctionComponent<IPage> = () => {
    const modeEvent = useAppSelector(selectModeEvent)

    const dispatch = useAppDispatch()

    return (
        <MainStyled>
            <div>
                <ButtonStyled fontSize={20} onClick={() => dispatch(changeModeEvent({ type: 'create' }))}>
                    Creer évenement
                    <span>
                        <Icon icon={circlePlus} />
                    </span>
                </ButtonStyled>
            </div>
            <EventList />
            {modeEvent.mode.type === 'subscribe' && <Subscribe />}
            {(modeEvent.mode.type === 'edit' || modeEvent.mode.type === 'create') && <EventForm />}
            <ResumeEventSubscribe />
            <CountrySelect />
            <h2>Input Split</h2>
            <InputSplit value="saluedjfgf" isUppercase />
        </MainStyled>
    )
}

const MainStyled = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 14px 28px;
`

export default Home
