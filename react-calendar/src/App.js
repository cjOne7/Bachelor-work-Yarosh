import React from 'react';
import RNavbar from "./components/navbar/RNavbar";
import Jumbotron from "./components/jumbotron/Jumbotron";
import {Routes, Route} from 'react-router-dom';
import Calendar from "./components/calendar/Calendar";
import PageNotFound from "./components/notfoundpage/PageNotFound";
import RequireAuth from "./components/RequireAuth";

const App = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<RNavbar/>}>
                    <Route index element={<Jumbotron/>}/>
                    <Route path={'/calendar'} element={
                        <RequireAuth>
                            <Calendar/>
                        </RequireAuth>
                    }/>
                    <Route path={'*'} element={<PageNotFound/>}/>
                </Route>
            </Routes>
        </>
    );
};

export default App;