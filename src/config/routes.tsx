import Home from '../views/pages/Home'
import IRoute from '../application/interfaces/route'
import { Counter } from '../views/components/counter/Counter'

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
