import React from 'react';
import { connect } from 'react-redux';

import { selectNetwork } from '../actions/app-actions';
import NetworkSelectorItem from './network-selector-item';

class NetworkSelector extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onMouseOut = this.onMouseOut.bind(this);
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
    pinnedNetwork: state.get('pinnedNetwork')
  };
}

export default connect(
  mapStateToProps,
  { selectNetwork }
)(NetworkSelector);
