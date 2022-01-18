import React, { useState, useRef, FC, FormEvent, KeyboardEvent } from 'react'
import '../../../style/InputSplit.css'

type InputProps = {
    value: string
    isUppercase?: boolean
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

    const fullValue: string = valBank + valCountry + valLocal + valOptional

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        switch (e.currentTarget.name) {
            case 'valBank': {
                if (e.currentTarget.value.length <= 4) {
                    setValBank(e.currentTarget.value)
                    break
                }
                valCountryRef.current?.focus()
                setValCountry(e.currentTarget.value.slice(-1))
                break
            }
            case 'valCountry': {
                if (e.currentTarget.value.length <= 2) {
                    setValCountry(e.currentTarget.value)
                    break
                }
                valLocalRef.current?.focus()
                setValLocal(e.currentTarget.value.slice(-1))
                break
            }
            case 'valLocal': {
                if (e.currentTarget.value.length <= 2) {
                    setValLocal(e.currentTarget.value)
                    break
                }
                valOptionalRef.current?.focus()
                setValOptional(e.currentTarget.value.slice(-1))
                break
            }
            case 'valOptional': {
                if (e.currentTarget.value.length <= 3) {
                    setValOptional(e.currentTarget.value)
                    break
                }
                break
            }
            default:
                return
        }
    }

    const keyDownHandler = (e: KeyboardEvent) => {
        const target = e.target as HTMLInputElement
        if (e.key === 'Backspace') {
            switch (target.id) {
                case 'valCountry': {
                    if (!target.value.length) valBankRef.current?.focus()
                    break
                }
                case 'valLocal': {
                    if (!target.value.length) valCountryRef.current?.focus()
                    break
                }
                case 'valOptional': {
                    if (!target.value.length) valLocalRef.current?.focus()
                    break
                }
                default:
                    return
            }
        }
    }

    return (
        <div className="input--split">
            <label className="">bic code</label>
            <div>
                <label htmlFor="valBank" className="label--top">
                    code banque
                </label>
                <input
                    ref={valBankRef}
                    value={!isUppercase ? valBank : valBank.toUpperCase()}
                    onChange={handleChange}
                    onKeyDown={keyDownHandler}
                    type="text"
                    id="valBank"
                    name="valBank"
                />
            </div>
            <div>
                <label htmlFor="valCountry" className="label--bottom">
                    code pays
                </label>
                <input
                    ref={valCountryRef}
                    value={!isUppercase ? valCountry : valCountry.toUpperCase()}
                    onChange={handleChange}
                    onKeyDown={keyDownHandler}
                    type="text"
                    id="valCountry"
                    name="valCountry"
                />
            </div>
            <div>
                <label htmlFor="valLocal" className="label--top">
                    code localisation
                </label>
                <input
                    ref={valLocalRef}
                    value={!isUppercase ? valLocal : valLocal.toUpperCase()}
                    onChange={handleChange}
                    onKeyDown={keyDownHandler}
                    type="text"
                    id="valLocal"
                    name="valLocal"
                />
            </div>
            <div>
                <label htmlFor="valOptional" className="label--bottom">
                    code localisation
                </label>
                <input
                    ref={valOptionalRef}
                    value={!isUppercase ? valOptional : valOptional.toUpperCase()}
                    onChange={handleChange}
                    onKeyDown={keyDownHandler}
                    type="text"
                    id="valOptional"
                    name="valOptional"
                />
            </div>
            <input id="bic-code" type="text" value={fullValue} readOnly />
        </div>
    )
}

export default InputSplit
