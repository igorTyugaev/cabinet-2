import React, { useState } from "react";
import { Link } from "react-router-dom";
import constraints from "../../../../utils/constraints";
import TextField from "../../TextField";

const FormReset = () => {
  const [errors, setErrors] = useState(null);
  const [state, setState] = useState({});

  const handleChange = (e) => {
    const input = e.target;
    if (!input) return;

    const isValid = input.validity.valid;
    const { name, value } = input;
    if (!name) return;

    setState({ [name]: value });

    if (!isValid) {
      setErrors({ ...errors, [name]: constraints[name].msg });
      return;
    } else {
      setErrors(null);
      return;
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!(state.name && state.email)) return;
  };

  return (
    <form className="auth-form" onSubmit={handleForm}>
      <div className="auth-form__inner">
        <h3 className="auth-form__title text text_size_subtitle">
          Забыли свой пароль?
        </h3>
        <p className="auth-form__description text text_size_accent">
          Воспользуйтесь формой ниже, чтобы восстановить его.
        </p>

        <div className="auth-form__inputs">
          <div className="auth-form__input">
            <TextField
              label="Email"
              error={!!(errors && errors.email)}
              helperText={errors && errors.email}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={(e) => handleChange(e)}
                value={state.email}
                pattern={constraints.email.pattern}
              />
            </TextField>
          </div>
        </div>

        <i className="divider" />
        <div className="auth-form__other">
          <h6 className="">
            <Link className="link" to="/auth">
              Войти в личный кабинет
            </Link>
          </h6>
        </div>
        <div className="auth-form__actions">
          <div className="auth-form__action">
            <button className="button button_type_main" type="submit">
              Восстановить
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormReset;