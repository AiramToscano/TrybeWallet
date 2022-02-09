import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      totalPrice: 0,
    };
  }

  render() {
    const { email } = this.props;
    const { totalPrice } = this.state;
    return (
      <div>
        <header>
          <span data-testid="email-field">{email}</span>
          <div>
            <span data-testid="total-field">{totalPrice}</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <h1>teste</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
