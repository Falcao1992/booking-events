import React, { FC, useEffect, useState } from 'react'
import { ButtonStyled } from '../../../style/styled-components/ButtonStyled'
import InputLabel from '@mui/material/InputLabel'
import { fetchRegionsAsync, fetchDetailsCountryAsync } from '../../../application/event/eventSlice'
import { useAppDispatch } from '../../../application/hooks'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { TRegion, TDepartment } from '../../../application/interfaces/Interfaces'
import SelectSearch from 'react-select-search'

const CountrySelect: FC = () => {
    const dispatch = useAppDispatch()
    const [StateRegions, setStateRegions] = useState<TRegion[] | null>(null)
    const [StateDepartments, setStateDepartments] = useState<TDepartment[] | null>(null)
    const [selectValue, setSelectValue] = useState<string>('')

    useEffect(() => {
        getRegions()
    }, [])

    const handleChange = (e: SelectChangeEvent): void => {
        console.log('e.target.value', e.target.value)
        setSelectValue(e.target.value)
        getDepartments(e.target.value)
    }

    const getDepartments = async (code: string) => {
        try {
            const departments = await dispatch(fetchDetailsCountryAsync(code))
            if (departments.payload) {
                setStateDepartments(departments.payload)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const getRegions = async () => {
        try {
            const regions = await dispatch(fetchRegionsAsync())
            if (regions.payload) {
                console.log('regions', regions)
                setStateRegions(regions.payload)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const options: any = [
        { name: 'Swedish', value: 'sv' },
        { name: 'English', value: 'en' },
        {
            type: 'group',
            name: 'Group name',
            items: [{ name: 'Spanish', value: 'es' }],
        },
    ]

    return (
        <div>
            {StateRegions && <SelectSearch options={options} value="sv" placeholder="Choose your language" />}
            {StateRegions && (
                <>
                    <InputLabel id="country-label">Regions</InputLabel>
                    <Select labelId="country-label" value={selectValue} label="country-list" onChange={handleChange}>
                        {StateRegions.map((region: { nom: string; code: string }) => {
                            return (
                                <MenuItem key={region.code} value={region.code}>
                                    {region.nom}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </>
            )}
            {StateDepartments && (
                <>
                    <InputLabel id="department-label">Departements</InputLabel>
                    <Select
                        labelId="department-label"
                        value={selectValue}
                        label="department-list"
                        onChange={handleChange}
                    >
                        {StateDepartments.map((department: { nom: string; code: string }) => {
                            return (
                                <MenuItem key={department.code} value={department.code}>
                                    {department.nom}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </>
            )}
            <ButtonStyled onClick={() => dispatch(fetchRegionsAsync())}>fetch regions</ButtonStyled>
        </div>
    )
}

export default CountrySelect
