import React, { FC } from 'react'
import '../../../style/Array.css'
import { fakeArrayDismemberment } from '../../../infrastructure/fakeData/fakeArray'

const Array: FC = () => {
    const { labelsTop, labelArray, products, valueUnits } = fakeArrayDismemberment

    return (
        <table>
            <colgroup>
                {labelsTop.map((product, i) => {
                    return <col key={i} className="col--active" />
                })}
            </colgroup>
            <thead>
                <tr>
                    <th>{labelArray.toUpperCase()}</th>
                    {labelsTop.map((lab, i) => {
                        return <th key={i}>{lab}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {products.map((product, i) => {
                    return (
                        <tr key={i}>
                            <th>{product.name}</th>
                            {product.values.map((val, i) => {
                                return <td key={i}>{`${val} ${valueUnits}`}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Array
