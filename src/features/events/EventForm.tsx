import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { changeModeEvent, createEvent, editEvent, selectModeEvent } from './eventSlice'
import { IEvent } from '../../interfaces/Interfaces'
import { nanoid } from 'nanoid'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { SectionForm } from '../../style/styled-components/SectionForm'
import { ButtonStyled } from '../../style/styled-components/ButtonStyled'

const initialState: IEvent = {
    id: nanoid(),
    name: '',
    description: '',
    beginDate: '',
    endDate: '',
    nbReservations: 0,
    limitReservation: 50,
}

const EventForm: FC = () => {
    const modeEvent = useAppSelector(selectModeEvent)
    const dispatch = useAppDispatch()
    const [dateForm, setDataForm] = useState<IEvent>(initialState)

    useEffect(() => {
        getDataEvent()
    }, [modeEvent])

    const getDataEvent = (): void => {
        if (modeEvent.event[0] && modeEvent.mode.type === 'edit') {
            const { id, name, description, beginDate, endDate, nbReservations, limitReservation } = modeEvent.event[0]
            const dateBeginFormat = formatDate(beginDate)
            const dateEndFormat = formatDate(endDate)
            console.log('dateEndFormat', dateEndFormat)
            setDataForm({
                ...dateForm,
                id,
                name,
                description,
                beginDate: dateBeginFormat,
                endDate: dateEndFormat,
                nbReservations,
                limitReservation,
            })
        } else {
            setDataForm({ ...initialState })
        }
    }

    const formatDate = (date: string) => {
        const formatDate = Date.parse(date)
        return format(formatDate, "yyyy-MM-dd'T'hh:mm", { locale: fr })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        let value: string | number = e.target.value
        if (e.target.name === 'nbReservations' || e.target.name === 'limitReservation') {
            value = parseInt(e.target.value)
        }
        setDataForm({ ...dateForm, [e.target.name]: value })
    }

    const onSubmit = (e: FormEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        if (modeEvent.mode.type === 'edit') {
            dispatch(editEvent(dateForm))
        } else {
            dispatch(createEvent(dateForm))
        }

        dispatch(changeModeEvent({ type: 'default' }))
        console.log('handle submit')
    }

    const { name, description, beginDate, endDate, nbReservations, limitReservation } = dateForm

    return (
        <SectionForm>
            <h2>{modeEvent.mode.type === 'create' ? "Création d'événement" : `Modification de l'événement ${name}`}</h2>
            <form autoComplete="off">
                <div>
                    <label htmlFor="name">Nom : </label>
                    <input type="text" name="name" value={name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Description : </label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        rows={3}
                        maxLength={100}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="beginDate">Date de début : </label>
                    <input
                        type="datetime-local"
                        id="beginDate"
                        name="beginDate"
                        value={beginDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="endDate">Date de fin : </label>
                    <input type="datetime-local" id="endDate" name="endDate" value={endDate} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="nbReservations">Nombre d&apos;inscrits : </label>
                    <input type="number" name="nbReservations" value={nbReservations} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="limitReservation">Limite de places : </label>
                    <input type="number" name="limitReservation" value={limitReservation} onChange={handleChange} />
                </div>
                <div>
                    <ButtonStyled
                        type="submit"
                        disabled={!name || !beginDate || !endDate || !limitReservation}
                        onClick={(e) => onSubmit(e)}
                    >
                        {modeEvent.mode.type === 'subscribe'
                            ? "M'inscrire"
                            : modeEvent.mode.type === 'create'
                            ? 'Création'
                            : 'Modifier'}
                    </ButtonStyled>
                </div>
            </form>
        </SectionForm>
    )
}

export default EventForm
