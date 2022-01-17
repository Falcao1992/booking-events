import React, { useState, useRef, FC } from 'react'
import '../../../style/InputSplit.css'

type InputProps = {
    value: string
    isUppercase: boolean
}

const InputSplit: FC<InputProps> = ({ value, isUppercase }) => {
    const [valBank, setValBank] = useState<string>(value.slice(0, 4))
    const [valCountry, setValCountry] = useState<string>(value.slice(4, 6))
    const [valLocal, setValLocal] = useState<string>(value.slice(6, 8))
    const [valOptional, setValOptional] = useState<string>(value.slice(8, 11))

    const valBankRef = useRef<HTMLInputElement>(null)
    const valCountryRef = useRef<HTMLInputElement>(null)
    const valLocalRef = useRef<HTMLInputElement>(null)
    const valOptionalRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        switch (e.currentTarget.name) {
            case 'valBank': {
                if (e.currentTarget.value.length <= 4) setValBank(e.currentTarget.value)
                valCountryRef.current?.focus()
                setValCountry(e.currentTarget.value.slice(-1))

                break
            }
            case 'valCountry': {
                if (e.currentTarget.value.length <= 2) setValCountry(e.currentTarget.value)
                valLocalRef.current?.focus()
                setValLocal(e.currentTarget.value.slice(-1))
                break
            }
            case 'valLocal': {
                if (e.currentTarget.value.length <= 2) setValLocal(e.currentTarget.value)
                valOptionalRef.current?.focus()
                setValOptional(e.currentTarget.value.slice(-1))
                break
            }
            case 'valOptional': {
                if (e.currentTarget.value.length <= 3) setValOptional(e.currentTarget.value)
                break
            }
            default:
                return
        }
    }

    return (
        <div className="input--split">
            <div>
                <label htmlFor="valBank">code banque</label>
                <input
                    ref={valBankRef}
                    type="text"
                    id="valBank"
                    name="valBank"
                    value={!isUppercase ? valBank : valBank.toUpperCase()}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="valCountry">code pays</label>
                <input
                    ref={valCountryRef}
                    type="text"
                    id="valCountry"
                    name="valCountry"
                    value={!isUppercase ? valCountry : valCountry.toUpperCase()}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="valLocal">code localisation</label>
                <input
                    ref={valLocalRef}
                    type="text"
                    id="valLocal"
                    name="valLocal"
                    value={!isUppercase ? valLocal : valLocal.toUpperCase()}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="valOptional">code localisation</label>
                <input
                    ref={valOptionalRef}
                    type="text"
                    id="valOptional"
                    name="valOptional"
                    value={!isUppercase ? valOptional : valOptional.toUpperCase()}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default InputSplit
