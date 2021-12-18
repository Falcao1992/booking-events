import React, { useEffect } from 'react'
import IPage from '../interfaces/page'
import logging from '../config/logging'

const Home: React.FunctionComponent<IPage> = (props) => {
    useEffect(() => {
        logging.info(`Loading ${props.name}`)
    }, [])
    return <div>this is page home</div>
}

export default Home
