import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectModeEvent } from './eventSlice'
import { IEvent } from '../../interfaces/Interfaces'
import { nanoid } from 'nanoid'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { SectionForm } from '../../style/styled-components/SectionForm'

const initialState: IEvent = {
    id: nanoid(),
    name: '',
    beginDate: '',
    endDate: '',
    nbReservations: 0,
    limitReservation: 50,
}

const EventForm: FC = () => {
    const modeEvent = useAppSelector(selectModeEvent)
    const [dateForm, setDataForm] = useState<IEvent>(initialState)

    useEffect(() => {
        getDataEvent()
    }, [modeEvent])

    const getDataEvent = (): void => {
        if (modeEvent.event[0]) {
            const { name, beginDate, endDate, nbReservations, limitReservation } = modeEvent.event[0]
            const dateBeginFormat = formatDate(beginDate)
            const dateEndFormat = formatDate(endDate)
            console.log('dateEndFormat', dateEndFormat)
            setDataForm({
                ...dateForm,
                name,
                beginDate: dateBeginFormat,
                endDate: dateEndFormat,
                nbReservations,
                limitReservation,
            })
        }
    }

    const formatDate = (date: string) => {
        const formatDate = Date.parse(date)
        return format(formatDate, "yyyy-MM-dd'T'hh:mm", { locale: fr })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        let value: string | number = e.target.value
        if (e.target.name === 'nbReservations' || e.target.name === 'limitReservation') {
            value = parseInt(e.target.value)
        }
        console.log('typeof', typeof e.target.value)
        setDataForm({ ...dateForm, [e.target.name]: value })
    }

    const onSubmit = (e: FormEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        console.log('handle submit')
    }

    const { name, beginDate, endDate, nbReservations, limitReservation } = dateForm

    return (
        <SectionForm>
            <form autoComplete="off">
                <div>
                    <label htmlFor="name">Nom: </label>
                    <input type="text" name="name" value={name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="beginDate">Date de début: </label>
                    <input
                        type="datetime-local"
                        id="beginDate"
                        name="beginDate"
                        value={beginDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="endDate">Date de fin: </label>
                    <input type="datetime-local" id="endDate" name="endDate" value={endDate} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="nbReservations">Nombre de place: </label>
                    <input type="number" name="nbReservations" value={nbReservations} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="limitReservation">Limite de place: </label>
                    <input type="number" name="limitReservation" value={limitReservation} onChange={handleChange} />
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={!name || !beginDate || !endDate || !nbReservations || !limitReservation}
                        onClick={(e) => onSubmit(e)}
                    >
                        M&apos;inscrire
                    </button>
                </div>
            </form>
        </SectionForm>
    )
}

export default EventForm
