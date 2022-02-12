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
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitDespesas = this.onSubmitDespesas.bind(this);
    this.sumPrices = this.sumPrices.bind(this);
    this.onDeleter = this.onDeleter.bind(this);
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

  onDeleter(id1) {
    // const { totalPrice } = this.state;
    const { deleter, getStateExpenses } = this.props;
    // const {value} = this.state
    // const newTotal = totalPrice - valorConvertido;
    const net = getStateExpenses.filter(({ id }) => id !== id1);
    deleter(net);
    this.setState({}, () => this.sumPrices());
  }

  handleChange({ target }) {
    // console.log(target.value);
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  sumPrices() {
    const { getStateExpenses } = this.props;
    // console.log(getStateExpenses);
    // console.log(e);
    const findNumber = getStateExpenses
      .map(({ currency, exchangeRates, value }) => value * exchangeRates[currency].ask);
    const total = findNumber
      .reduce((totalVet, currentElement) => totalVet + currentElement, 0);
    return total;
  }

  render() {
    const { email, coins, getStateExpenses } = this.props;
    const { currency, description, method, tag, value, moeda } = this.state;
    // const new1 = parseFloat(totalPrice).toFixed(2);
    // Não estava passando o requisito 8 mas com ajuda do meireles e petzinger
    // conseguir descobrir, o teste não estava pegando do meu state local,
    // e eu estava armazenando no local!
    // console.log(getStateExpenses);
    return (
      <div>
        <header>
          <span data-testid="email-field">{email}</span>
          <span data-testid="total-field">{ this.sumPrices().toFixed(2) }</span>
          <span data-testid="header-currency-field">BRL</span>
          <form>
            <label htmlFor="teste">
              Valor:
              <input
                onChange={ this.handleChange }
                type="number"
                name="value"
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
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          {getStateExpenses.length > 0 ? getStateExpenses.map((e) => (
            <tbody key={ e.id }>
              <tr>
                <td>{e.description}</td>
                <td>{e.tag}</td>
                <td>{e.method}</td>
                <td>{parseFloat(e.value).toFixed(2)}</td>
                <td>{e.exchangeRates[e.currency].name}</td>
                <td>{parseFloat(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
                <td>
                  {
                    parseFloat(e.exchangeRates[e.currency].ask * e.value).toFixed(2)
                  }
                </td>
                <td>{ moeda }</td>
                <td>
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
  // console.log(state.wallet.currencies);
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
