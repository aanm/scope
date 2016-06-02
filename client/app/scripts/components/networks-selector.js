import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

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
    const { availableNetworks, showingNetworks } = this.props;

    const items = availableNetworks.map(network => (
      <NetworkSelectorItem key={network.get('id')} network={network} />
    ));

    const className = classNames('metric-selector-action', {
      'metric-selector-action-selected': showingNetworks
    });

    return (
      <div className="metric-selector">
        <div className="metric-selector-wrapper" onMouseLeave={this.onMouseOut}>
          <div className={className} onClick={this.onClick}>
            Networks
          </div>
          {showingNetworks && items}
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
