import React from 'react';
import { connect } from 'react-redux';

import { selectNetwork, showNetworks } from '../actions/app-actions';
import NetworkSelectorItem from './network-selector-item';

class NetworkSelector extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onClick() {
    return this.props.showNetworks(!this.props.showingNetworks);
  }

  onMouseOut() {
    this.props.selectNetwork(this.props.pinnedNetwork);
  }

  render() {
    const {availableNetworks} = this.props;

    const items = availableNetworks.map(network => (
      <NetworkSelectorItem key={network.get('id')} network={network} />
    ));

    return (
      <div className="metric-selector">
        <div className="metric-selector-action" onClick={this.onClick}>
          Showing netz: {this.props.showingNetworks ? '1' : '0'}
        </div>

        <div className="metric-selector-wrapper" onMouseLeave={this.onMouseOut}>
          {items}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    availableNetworks: state.get('availableNetworks'),
    showingNetworks: state.get('showingNetworks'),
    pinnedNetwork: state.get('pinnedNetwork')
  };
}

export default connect(
  mapStateToProps,
  { selectNetwork, showNetworks }
)(NetworkSelector);
