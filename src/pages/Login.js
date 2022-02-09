import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
  }

  onSubmitEmail() {
    const { history, handleSendEmail } = this.props;
    const { email } = this.state;
    // console.log(history);
    handleSendEmail(email);
    history.push('/carteira');
  }

  validInputs = () => {
    const { email, password } = this.state;
    const re = /\S+@\S+\.\S+/; // usei regex para validar meu email
    const emailcheck = re.test(email);
    const LIMIT_NUMBER = 6;
    // console.log(emailcheck)
    if (emailcheck && password.length >= LIMIT_NUMBER) {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  }

  handleChange({ target }) {
    // console.log(target.value);
    const { name, value } = target;
    this.setState({ [name]: value }, this.validInputs);
  }

  render() {
    const { email, password, disable } = this.state;
    //  console.log(disable);
    return (
      <div>
        <label htmlFor={ email }>
          Email:
          <input
            name="email"
            value={ email }
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor={ password }>
          Senha:
          <input
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <button disabled={ disable } type="button" onClick={ this.onSubmitEmail }>
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleSendEmail: (email) => dispatch(addEmail(email)),
});

Login.propTypes = {
  handleSendEmail: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
