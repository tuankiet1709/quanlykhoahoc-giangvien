import React, { Suspense, useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";

import {LOGIN} from "../constants/pages";
import Sidebar from "../containers/Sidebar/index";
import { CssBaseline, Grid } from "@mui/material";
import Header from "../containers/Header/Header";
import InLineLoader from "../components/InlineLoader";

import { 
    getAuth,
    onAuthStateChanged
} from 'firebase/auth';
import { db } from "../services/requests";

export default function PrivateRoute({ children, ...rest }) {
    const [isLoading, setLoading] = useState(false);
    const [isAuth, setAuth] = useState("");

    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, function(user) {
            console.log("this is in route",user);
            setAuth(user);
            setLoading(true);
        })
    },[]);
    
    
    if(isLoading)
    {
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    isAuth ?
                        (
                            <Suspense fallback={<InLineLoader />}>
                                <Header />
                                <Grid container spacing={0} sx={{ marginTop: 8, paddingLeft:5 }}>
                                {/* <Grid item md={1} lg={1}></Grid> */}
                                <Grid item xs={12} md={3} lg={3} xl={3}>
                                    <Sidebar />
                                </Grid>
                                <Grid item xs={12} md={8} lg={8} xl={8} sx={{ marginTop: 4, marginLeft:10 }}>
                                    {children}
                                </Grid>
                                </Grid>
                            </Suspense>
                        )
                        : <Redirect to={LOGIN} />}
            />
        );
    }
        
}