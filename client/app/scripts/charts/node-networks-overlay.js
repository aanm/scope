import React from 'react';
import d3 from 'd3';
import { List as makeList } from 'immutable';
import { getNodeColor } from '../utils/color-utils';
import { isContrastMode } from '../utils/contrast-utils';


const r = 8;
const padding = 8;

function NodeNetworksOverlay({size, stack, networks = makeList()}) {
  const width = (networks.size - 1) * (r * 2 + padding);
  const reCenter = width * -0.5;
  const x = d3.scale.linear()
    .domain([0, networks.size])
    .range([reCenter, reCenter + networks.size * (r * 2 + padding)]);

  const circles = networks.map((n, i) => (
    <circle cx={x(i)} cy={size * -0.75} r={r}
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
      {circles.toJS()}
    </g>
  );
}

export default NodeNetworksOverlay;
