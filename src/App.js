import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Spinner from "./components/Spinner";

const Home = lazy(() => import("./pages/Home"));
const HomeDetails = lazy(() => import("./pages/HomeDetails"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const EventRegister = lazy(() => import("./pages/EventRegister"));
const Myevents = lazy(() => import("./pages/Myevents"));
const MyeventsDetails = lazy(() => import("./pages/MyeventsDetails"));
const UserDetails = lazy(() => import("./pages/UserDetails"));
const Events = lazy(() => import("./pages/Events"));
const EventsDetails = lazy(() => import("./pages/EventsDetails"));
const MyRequests = lazy(() => import("./pages/MyRequests"));
const MyRequestsDetails = lazy(() => import("./pages/MyRequestsDetails"));
const RequestList = lazy(() => import("./pages/RequestList"));
const RequestsListDetails = lazy(() => import("./pages/RequestsListDetails"));
const Inscription = lazy(() => import("./pages/Inscription"));
const NotFound = lazy(() => import("./pages/NotFound"));
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/details/:id" component={HomeDetails} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          <Layout>
            <Route exact path="/dashboard/profile" component={UserDetails} />
            <Route
              exact
              path="/dashboard/eventregister"
              component={EventRegister}
            />
            <Route exact path="/dashboard/events" component={Events} />
            <Route
              exact
              path="/dashboard/events/details/:id"
              component={EventsDetails}
            />
            <Route
              exact
              path="/dashboard/events/inscription/:id"
              component={Inscription}
            />
            <Route exact path="/dashboard/myrequests" component={MyRequests} />
            <Route
              exact
              path="/dashboard/myrequests/details/:id"
              component={MyRequestsDetails}
            />
            <Route exact path="/dashboard/myevents" component={Myevents} />
            <Route
              exact
              path="/dashboard/myevents/details/:id"
              component={MyeventsDetails}
            />
            <Route
              exact
              path="/dashboard/requestslist"
              component={RequestList}
            />
            <Route
              exact
              path="/dashboard/requestslist/details/:id"
              component={RequestsListDetails}
            />
            {/* <Route component={NotFound} /> */}
          </Layout>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
