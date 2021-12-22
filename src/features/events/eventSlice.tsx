import { RootState } from '../../app/store'
import { fakeEvents } from '../../fakeData/fakeEvents'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventsState, IEvent, IRegistration, TMode } from '../../interfaces/Interfaces'

const initialState: EventsState = {
    list: fakeEvents,
    selected: 0,
    alreadyRegistered: [],
    mode: { type: 'default' },
}

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        registrationToEvent: (state, action: PayloadAction<number | string>) => {
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
        changeModeEvent: (state, action: PayloadAction<TMode>) => {
            state.mode = { ...state.mode, type: action.payload.type, eventId: action.payload.eventId }
        },
        editEvent: (state, action: PayloadAction<IEvent>) => {
            state.list = state.list.map((event) => {
                if (event.id === state.mode.eventId) {
                    return action.payload
                }
                return event
            })
        },
        createEvent: (state, action: PayloadAction<IEvent>) => {
            state.list = [action.payload, ...state.list]
        },
    },
})

export const { registrationToEvent, submitRegistration, changeModeEvent, editEvent, createEvent } = eventsSlice.actions

export const selectEvents = (state: RootState) => state.events.list
export const selectEventSelected = (state: RootState) => state.events.selected
export const selectEventAlreadyRegistered = (state: RootState) => state.events.alreadyRegistered
export const selectModeEvent = (state: RootState) => {
    return {
        event: state.events.list.filter((event) => event.id === state.events.mode.eventId),
        mode: state.events.mode,
    }
}

export default eventsSlice.reducer
