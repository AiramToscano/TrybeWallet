import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addDespesas, getCoinThunk, deleterDepesas } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: '',
      description: '',
      method: '',
      tag: '',
      value: '',
      id: 0,
      moeda: 'Real',
      status: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitDespesas = this.onSubmitDespesas.bind(this);
    this.sumPrices = this.sumPrices.bind(this);
    this.onDeleter = this.onDeleter.bind(this);
    this.handleChangeButtom = this.handleChangeButtom.bind(this);
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
    this.setState({ value: '' }, () => this.sumPrices());
  }

  onDeleter(id1) {
    const { deleter, getStateExpenses } = this.props;
    const net = getStateExpenses.filter(({ id }) => id !== id1);
    deleter(net);
    this.setState({}, () => this.sumPrices());
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleChangeButtom() {
    this.setState({ status: false });
  }

  sumPrices() {
    const { getStateExpenses } = this.props;
    const findNumber = getStateExpenses
      .map(({ currency, exchangeRates, value }) => value * exchangeRates[currency].ask);
    const total = findNumber
      .reduce((totalVet, currentElement) => totalVet + currentElement, 0);
    return total;
  }

  render() {
    const { email, coins, getStateExpenses } = this.props;
    const { currency, description, method, tag, value, moeda, status } = this.state;
    return (
      <div>
        <header>
          <div className="flex justify-around text-white text-sm m-">
            <span data-testid="email-field">{email}</span>
            <span
              data-testid="total-field"
            >
              { this.sumPrices().toFixed(2) }
              BRL
            </span>
          </div>
          <form className="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <label
              htmlFor="teste"
              className="inline text-white text-sm font-bold mb-2"
            >
              Valor:
              <input
                onChange={ this.handleChange }
                type="number"
                className="text-black m-2"
                name="value"
                id="teste"
                value={ value }
                data-testid="value-input"
              />
            </label>
            <label
              htmlFor="teste2"
              className="inline text-white text-sm font-bold mb-5"
            >
              Descrição:
              <input
                className="text-black m-2"
                value={ description }
                name="description"
                data-testid="description-input"
                onChange={ this.handleChange }
                id="teste2"
              />
              Metodo de Pagamento:
            </label>
            <select
              className="text-black m-2"
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
            <p className="inline text-white text-sm font-bold mb-5 m-3">
              Tag:
            </p>
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
            <p className="inline text-white text-sm font-bold mb-5 m-3">
              Moeda:
            </p>
            <select
              onChange={ this.handleChange }
              onClick={ this.handleChangeButtom }
              value={ currency }
              data-testid="currency-input"
              name="currency"
              id="currency"
            >
              <option>Escolha</option>
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
          </form>
          <button
            className="
            bg-purple-900
           text-white font-bold py-2 px-4 rounded
           focus:outline-none focus:shadow-outline"
            type="button"
            onClick={ this.onSubmitDespesas }
            disabled={ status }
          >
            Adicionar Despesas
          </button>
        </header>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-white">Descrição</th>
              <th className="px-4 py-2 text-white">Tag</th>
              <th className="px-4 py-2 text-white">Método de pagamento</th>
              <th className="px-4 py-2 text-white">Valor</th>
              <th className="px-4 py-2 text-white">Moeda</th>
              <th className="px-4 py-2 text-white">Câmbio utilizado</th>
              <th className="px-4 py-2 text-white">Valor convertido</th>
              <th className="px-4 py-2 text-white">Moeda de conversão</th>
              <th className="px-4 py-2 text-white">Editar/Excluir</th>
            </tr>
          </thead>
          {getStateExpenses.length > 0 ? getStateExpenses.map((e) => (
            <tbody key={ e.id }>
              <tr className="bg-white">
                <td className="border px-4 py-2">{e.description}</td>
                <td className="border px-4 py-2">{e.tag}</td>
                <td className="border px-4 py-2">{e.method}</td>
                <td className="border px-4 py-2">{parseFloat(e.value).toFixed(2)}</td>
                <td className="border px-4 py-2">{e.exchangeRates[e.currency].name}</td>
                <td className="border px-4 py-2">{parseFloat(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
                <td className="border px-4 py-2">
                  {
                    parseFloat(e.exchangeRates[e.currency].ask * e.value).toFixed(2)
                  }
                </td>
                <td className="border px-4 py-2">{ moeda }</td>
                <td className="border px-4 py-2">
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.onDeleter(e.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          )) : null}
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  coins: state.wallet.currencies,
  getStateExpenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  handleSendForm: (obj) => dispatch(addDespesas(obj)),
  getApiCoin: () => dispatch(getCoinThunk()),
  deleter: (obj) => dispatch(deleterDepesas(obj)),
});
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getApiCoin: PropTypes.func.isRequired,
  handleSendForm: PropTypes.func.isRequired,
  coins: PropTypes.objectOf(PropTypes.any).isRequired,
  getStateExpenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleter: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
