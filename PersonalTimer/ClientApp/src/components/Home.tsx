import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../services/UserAPI";
import { Container, Form, Button } from "reactstrap";

type Props = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Home(props: Props) {
  const { register, handleSubmit, formState: { dirtyFields }, errors } = useForm();
  const [authenticationErrors, setAuthenticationErrors] = useState<string[]>([]);

  const canSubmit = !!dirtyFields.email && !!dirtyFields.password;

  async function onSubmit(userData: any) {
    const loginResult = await loginUser(userData);
    if (loginResult.success) {
      props.setLoggedIn(true);
    } else {
      setAuthenticationErrors(loginResult.errors);
    }
  }

  return (
    (!props.loggedIn) ?
      (<Container className="centered-component-content w-50">
        <div className="d-flex flex-column flex-grow-1 text-center">
          <h1>Start creating Time Logs!</h1>

          <Form onSubmit={handleSubmit(onSubmit)} className="mt-3 w-50 mx-auto">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="example@example.com"
                ref={register({ required: "Please provide a valid email address." })}
                className="form-control"
              />
              {errors.email &&
                <p className="account-error">{errors.email.message}</p>
              }
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password123"
                ref={register({ required: "Please provide a valid password." })}
                className="form-control"
              />
              {errors.password &&
                <p className="account-error">{errors.password.message}</p>
              }

              {authenticationErrors.length > 0 && 
                authenticationErrors.map((ae, key) => (
                  <p key={key} className="account-error">
                    {ae}
                  </p>
                ))
              }
            </div>

            <Button type="submit" color="primary" disabled={!canSubmit}>Log In</Button>
          </Form>
          
          <Link to="/register" className="mt-3">Create an account.</Link>
        </div>
      </Container>)
      :
      (<Redirect to="/personal-timer" />)
  );
}
