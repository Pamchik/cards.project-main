import React from 'react';
import { Route, Routes, Navigate  } from 'react-router-dom';
import LineDetail from "../Pages/LinesInfo/LineDetail"
import Test from "../Test/Test"
import GeneralTableProjects from '../Tables/GeneralTableProjects'

const AppRouter = () => {

    return (
        <Routes>
            <Route exact path='/projects' element={<GeneralTableProjects/>}/>
            <Route exact path='/projects/:selectedID' element={<LineDetail/>}/>
            <Route exact path='/test' element={<Test/>}/>
            <Route path='*' element={<Navigate to='/projects/'/>} />
        </Routes>                
    );
};

export default AppRouter;