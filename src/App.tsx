import React from 'react'
import { BrowserRouter, Switch, Route, RouteComponentProps } from 'react-router-dom'
import './App.css'
import routes from './config/routes'
import NavBar from './features/NavBar/NavBar'

function App() {
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
