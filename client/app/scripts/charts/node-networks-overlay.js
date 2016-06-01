import React from 'react';
import d3 from 'd3';
import { List as makeList } from 'immutable';
import { getNodeColor } from '../utils/color-utils';
import { isContrastMode } from '../utils/contrast-utils';


const h = 3;
const padding = 3;

function NodeNetworksOverlay({size, stack, networks = makeList()}) {
  const offset = size + 6;
  const y = d3.scale.linear()
    .domain([0, networks.size])
    .range([offset, offset + (h * networks.size) + (padding * networks.size - 1)]);

  const bars = networks.map((n, i) => (
    <rect x={-size * 0.5} y={y(i)} width={size} height={h}
      className="node-network"
      style={{
        fill: getNodeColor(n.get('colorKey'))
      }}
      key={n.get('id')}
    />
  ));

  let transform = '';
  if (stack) {
    const contrastMode = isContrastMode();
    const [dx, dy] = contrastMode ? [0, 8] : [0, 8];
    transform = `translate(${dx}, ${dy * -1.5})`;
  }

  return (
    <g transform={transform}>
      {bars.toJS()}
    </g>
  );
}

export default NodeNetworksOverlay;
