import Home from '../pages/Home'
import IRoute from '../interfaces/route'
import { Counter } from '../features/counter/Counter'

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home Page',
        component: Home,
        exact: true,
    },
    {
        path: '/counter',
        name: 'Counter',
        component: Counter,
        exact: false,
    },
]

export default routes
