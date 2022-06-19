import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../index.css';
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
      <div className=" flex flex-col justify-center items-center ">
        <img
          width="250"
          className="mt-12"
          height="40"
          src="https://portaldobitcoin.com/wp-content/uploads/2018/03/wallet-1024x758.png"
          alt="bit"
        />
        <div className="w-90 max-w-xs mt-19">
          <form className="bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor={ email }
            >
              Email:
              <input
                className="shadow
            appearance-none border rounded w-full py-2
            px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                value={ email }
                data-testid="email-input"
                onChange={ this.handleChange }
              />
            </label>
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor={ password }
            >
              Senha:
              <input
                className="shadow
              appearance-none border rounded w-full py-2
              px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                value={ password }
                onChange={ this.handleChange }
                data-testid="password-input"
              />
            </label>
            <button
              className="
              bg-black hover:bg-purple-900
               text-white font-bold py-2 px-4 rounded
               focus:outline-none focus:shadow-outline"
              disabled={ disable }
              type="button"
              onClick={ this.onSubmitEmail }
            >
              Entrar
            </button>
          </form>
        </div>
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
