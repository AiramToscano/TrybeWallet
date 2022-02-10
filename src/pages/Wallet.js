import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addDespesas, getCoinThunk } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      totalPrice: 0,
      currency: '',
      description: '',
      method: '',
      tag: '',
      value: '',
      id: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitDespesas = this.onSubmitDespesas.bind(this);
    // this.sumPrices = this.sumPrices.bind(this);
  }

  componentDidMount() {
    const { getApiCoin } = this.props;
    getApiCoin();
  }

  onSubmitDespesas() {
    const { handleSendForm, coins, getApiCoin } = this.props;
    const { currency, description, method, tag, value, id } = this.state;
    getApiCoin();
    const exchangeRates = coins;
    // console.log(teste);
    this.setState({ id: id + 1 });
    const obj = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };

    handleSendForm(obj);
    // console.log(obj);
    this.setState({ value: '' }, () => this.sumPrices());
  }

  sumPrices() {
    const { getStateExpenses } = this.props;
    let result;
    console.log(getStateExpenses);
    const findNumber = getStateExpenses.map(({ currency, exchangeRates, value }) => {
      result = value * exchangeRates[currency].ask;
      return result;
    });
    const total = findNumber
      .reduce((totalVet, currentElement) => totalVet + currentElement);
    this.setState({ totalPrice: total });
    // console.log(findNumber);
    // console.log(total);
  }

  handleChange({ target }) {
    // console.log(target.value);
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, coins } = this.props;
    const { totalPrice, currency,
      description, method, tag, value } = this.state;
    // console.log(coins);
    return (
      <div>
        <header>
          <span data-testid="email-field">{email}</span>
          <div>
            <span data-testid="total-field">{totalPrice}</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
          <form>
            <label htmlFor="teste">
              Valor:
              <input
                onChange={ this.handleChange }
                type="number"
                name="value"
                min="0"
                id="teste"
                value={ value }
                data-testid="value-input"
              />
            </label>
            Descrição:
            <input
              value={ description }
              name="description"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
            Metodo de Pagamento:
            <select
              onChange={ this.handleChange }
              value={ method }
              name="method"
              data-testid="method-input"
            >
              <option value="">Escolha</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
            Tag:
            <select
              onChange={ this.handleChange }
              value={ tag }
              name="tag"
              data-testid="tag-input"
            >
              <option value="">Escolha</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
            <label htmlFor="currency">
              moeda
              <select
                onChange={ this.handleChange }
                value={ currency }
                data-testid="currency-input"
                name="currency"
                id="currency"
              >
                {Object.values(coins).filter((e) => e.codein !== 'BRLT')
                  .map((e, index) => (
                    <option
                      key={ index }
                      data-testid={ e.code }
                    >
                      {e.code}
                    </option>
                  ))}
              </select>
            </label>
          </form>
          <button type="button" onClick={ this.onSubmitDespesas }>
            Adicionar Despesas
          </button>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // console.log(state.wallet.currencies);
  email: state.user.email,
  coins: state.wallet.currencies,
  getStateExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  handleSendForm: (obj) => dispatch(addDespesas(obj)),
  getApiCoin: () => dispatch(getCoinThunk()),
});
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getApiCoin: PropTypes.func.isRequired,
  handleSendForm: PropTypes.func.isRequired,
  coins: PropTypes.objectOf(PropTypes.any).isRequired,
  getStateExpenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
