import { RootState } from '../store'
import { fakeEvents } from '../../infrastructure/fakeData/fakeEvents'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventsState, IEvent, IRegistration, TMode, TRegion } from '../interfaces/Interfaces'
import { fetchRegions, fetchDepartments } from '../../infrastructure/event/countryAPI'

const log = (obj: object): void => {
    return console.log(JSON.parse(JSON.stringify(obj)))
}

const initialState: EventsState = {
    list: fakeEvents,
    selected: 0,
    alreadyRegistered: [],
    mode: { type: 'default' },
    status: 'idle',
    listRegions: [],
}

export const fetchRegionsAsync = createAsyncThunk('events/fetchRegions', async () => {
    // The value we return becomes the `fulfilled` action payload
    return await fetchRegions()
})
export const fetchDetailsCountryAsync = createAsyncThunk('events/fetchDetailsCountry', async (code: string) => {
    // The value we return becomes the `fulfilled` action payload
    return await fetchDepartments(code)
})

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        registrationToEvent: (state, action: PayloadAction<number | string>) => {
            state.selected = action.payload
        },
        submitRegistration: (state, action: PayloadAction<IRegistration>) => {
            const listEvents = state.list

            listEvents.map((event) => {
                if (event.id === action.payload.eventId) {
                    event.nbReservations += 1
                    event.isSubscribed = true
                }
            })
        },
        unSubscribedToEvent: (state, action: PayloadAction<number | string>) => {
            const listEvents = state.list

            listEvents.map((event) => {
                if (event.id === action.payload) {
                    event.nbReservations -= 1
                    event.isSubscribed = false
                }
            })
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
        deleteEvent: (state, action: PayloadAction<number | string>) => {
            state.list = state.list.filter((event) => event.id !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegionsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchRegionsAsync.fulfilled, (state, action) => {
                state.status = 'fetched'
                state.listRegions = action.payload.map((val: TRegion) => ({
                    nom: val.nom,
                    code: val.code,
                }))
            })
            .addCase(fetchDetailsCountryAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchDetailsCountryAsync.fulfilled, (state, action) => {
                state.status = 'fetched'
                state.departments = action.payload
            })
    },
})

export const {
    registrationToEvent,
    submitRegistration,
    changeModeEvent,
    editEvent,
    createEvent,
    deleteEvent,
    unSubscribedToEvent,
} = eventsSlice.actions

export const selectEvents = (state: RootState) => state.events.list
export const selectEventSelected = (state: RootState) => state.events.selected
export const selectEventAlreadyRegistered = (state: RootState) =>
    state.events.list.filter((event) => event.isSubscribed)
export const selectModeEvent = (state: RootState) => {
    return {
        event: state.events.list.filter((event) => event.id === state.events.mode.eventId),
        mode: state.events.mode,
    }
}
export const selectDepartments = (state: RootState) => state.events.departments

export default eventsSlice.reducer
