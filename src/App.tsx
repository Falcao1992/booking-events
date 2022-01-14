import React, { FC } from 'react'
import { BrowserRouter, Switch, Route, RouteComponentProps } from 'react-router-dom'
import routes from './config/routes'
import NavBar from './views/components/navBar/NavBar'
import './App.css'

const App: FC = () => {
    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Switch>
                    {routes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                render={(props: RouteComponentProps) => <route.component {...props} {...route.props} />}
                            />
                        )
                    })}
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
