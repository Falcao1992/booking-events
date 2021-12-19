import { RootState } from '../../app/store'
import { fakeEvents } from '../../fakeData/fakeData'
import { createSlice } from '@reduxjs/toolkit'
import { IEvent } from './Interface'

export interface EventsState {
    list: IEvent[]
}

const initialState: EventsState = {
    list: fakeEvents,
}

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        getEvents: (state) => {
            state.list
        },
    },
})

export const { getEvents } = eventsSlice.actions

export const selectEvents = (state: RootState) => state.events.list

export default eventsSlice.reducer
