import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { selectEventSelected, submitRegistration, registrationToEvent } from '../events/eventSlice'
import { IRegistration } from '../events/Interface'

const initialState: IRegistration = {
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
}

const Subscribe: FC = () => {
    const eventId = useAppSelector(selectEventSelected)
    const dispatch = useAppDispatch()
    const [dateForm, setDataForm] = useState<IRegistration>(initialState)

    useEffect(() => {
        setDataForm({ ...dateForm, eventId })
    }, [eventId])

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        let value: string | number = e.target.value
        if (e.target.name === 'phoneNumber') {
            value = parseInt(e.target.value)
        }
        setDataForm({ ...dateForm, [e.target.name]: value })
    }

    const onSubmit = (e: FormEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        dispatch(submitRegistration(dateForm))
        dispatch(registrationToEvent(0))
        setDataForm({ ...initialState, eventId })
    }

    const { firstname, lastname, email, phoneNumber } = dateForm

    return (
        <div>
            {eventId !== 0 ? (
                <>
                    <h2>Inscription pour l&apos;evenement: {eventId}</h2>
                    <form autoComplete="off">
                        <div>
                            <label htmlFor="firstname">Prénom: </label>
                            <input type="text" name="firstname" value={firstname} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="lastname">Nom: </label>
                            <input type="text" name="lastname" value={lastname} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="email">Email: </label>
                            <input type="text" name="email" value={email} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber">Numéro de téléphone: </label>
                            <input type="number" name="phoneNumber" value={phoneNumber} onChange={handleChange} />
                        </div>
                        <button
                            type="submit"
                            disabled={!firstname || !lastname || !email || !phoneNumber}
                            onClick={(e) => onSubmit(e)}
                        >
                            M&apos;inscrire
                        </button>
                    </form>
                </>
            ) : (
                <h2>Veuillez choisir un evenement</h2>
            )}
        </div>
    )
}

export default Subscribe
