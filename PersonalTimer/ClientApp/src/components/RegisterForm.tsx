import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../services/UserAPI";
import { Container, Form, Button } from "reactstrap";

type Props = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegisterForm(props: Props) {
  const history = useHistory();
  const { register, handleSubmit, formState: { dirtyFields }, errors } = useForm();
  const [authenticationErrors, setAuthenticationErrors] = useState<string[]>([]);

  const canSubmit = !!dirtyFields.email && !!dirtyFields.password;

  async function onSubmit(userData: any) {
    const registerResult = await registerUser(userData);
    if (registerResult.success) {
      props.setLoggedIn(true);
      history.push("/personal-timer");
    } else {
      setAuthenticationErrors(registerResult.errors);
    }
  }

  return (
    <Container className="centered-component-content w-50">
      <div className="d-flex flex-column flex-grow-1 text-center">
        <h1>Create a new account</h1>

        <Form onSubmit={handleSubmit(onSubmit)} className="mt-3 w-50 mx-auto">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="example@example.com"
              ref={register({ required: "Please provide a valid email." })}
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
              ref={register({ required: true, minLength: 4 })}
              className="form-control"
            />
            {(errors.password?.type === "required" || errors.password?.type === "minLength") &&
              <p className="account-error">Please provide a password that is at least 4 characters long.</p>
            }

            {authenticationErrors.length > 0 && 
              authenticationErrors.map((ae, key) => (
                <p key={key} className="account-error">
                  {ae}
                </p>
              ))
            }
          </div>

          <Button type="submit" color="primary" disabled={!canSubmit}>Create</Button>
        </Form>
      </div>
    </Container>
  );
}
