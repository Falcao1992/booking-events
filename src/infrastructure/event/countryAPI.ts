import axios from 'axios'

export async function fetchRegions() {
    const response = await axios.get('https://geo.api.gouv.fr/regions')
    console.log('fetch regions API')
    return response.data
}
export async function fetchDepartments(code: string) {
    const response = await axios.get(`https://geo.api.gouv.fr/regions/${code}/departements`)
    console.log('fetch departments API')
    return response.data
}
