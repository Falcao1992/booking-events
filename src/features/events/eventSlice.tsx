import { RootState } from '../../app/store'
import { fakeEvents } from '../../fakeData/fakeEvents'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEvent, IRegistration } from './Interface'

export interface EventsState {
    list: IEvent[]
    selected: number
    alreadyRegistered: number[]
}

const initialState: EventsState = {
    list: fakeEvents,
    selected: 0,
    alreadyRegistered: [],
}

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        registrationToEvent: (state, action: PayloadAction<number>) => {
            state.selected = action.payload
        },
        submitRegistration: (state, action: PayloadAction<IRegistration>) => {
            const addParticipantToEvent = state.list

            addParticipantToEvent.map((event) => {
                if (event.id === action.payload.eventId) {
                    event.nbReservations += 1
                }
            })
            if (action.payload.eventId) {
                state.alreadyRegistered = [...state.alreadyRegistered, action.payload.eventId]
            }
        },
    },
})

export const { registrationToEvent, submitRegistration } = eventsSlice.actions

export const selectEvents = (state: RootState) => state.events.list
export const selectEventSelected = (state: RootState) => state.events.selected
export const selectEventAlreadyRegistered = (state: RootState) => state.events.alreadyRegistered

export default eventsSlice.reducer
