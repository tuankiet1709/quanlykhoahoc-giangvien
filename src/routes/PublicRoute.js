import React, { Suspense } from "react";
import { Route } from "react-router-dom";

import InLineLoader from "../components/InlineLoader";
import Layout from "src/containers/Layout";
import Sidebar from "../containers/Sidebar/index";
import { CssBaseline, Grid } from "@mui/material";
import Header from "../containers/Header/Header";

export default function PublicRoute({ children, ...rest }) {
    return (
        <Route {...rest}>
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
        </Route>
    );
}