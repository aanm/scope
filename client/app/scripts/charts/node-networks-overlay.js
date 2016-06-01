import React from 'react';
import d3 from 'd3';
import { List as makeList } from 'immutable';
import { getNodeColor } from '../utils/color-utils';
import { isContrastMode } from '../utils/contrast-utils';


const h = 6;
const padding = 0.1;
const rx = 3;
const ry = rx;

function NodeNetworksOverlay({size, stack, networks = makeList()}) {
  const offset = -size * 0.5 - h - 9;
  const x = d3.scale.ordinal()
    .domain(networks.map((n, i) => i).toJS())
    .rangeBands([size * -0.5, size * 0.5], padding, 0);

  const bars = networks.map((n, i) => (
    <rect
      x={x(i)}
      y={offset}
      width={x.rangeBand()}
      height={h}
      rx={rx}
      ry={ry}
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
