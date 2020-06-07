import React from "react"
import {Redirect, Route} from "react-router-dom"

 const ProtectedRoute=({ component: Component, ...rest })=> {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("role") === "Admin" ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

export default ProtectedRoute;