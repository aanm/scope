import React from 'react';
import d3 from 'd3';
import _ from 'lodash';
import { List as makeList } from 'immutable';
import { getNodeColor } from '../utils/color-utils';
import { isContrastMode } from '../utils/contrast-utils';


const h = 5;
const padding = 0.05;
const rx = 1;
const ry = rx;
const perRow = 4;

function NodeNetworksOverlay({size, orientation = 'down', stack, networks = makeList()}) {
  const offset = orientation === 'up' ? -size * 0.5 - h - 9 : size + 6;
  const x = d3.scale.ordinal()
    .domain(_.range(Math.min(perRow, networks.size)))
    .rangeBands([size * -0.5, size * 0.5], padding, 0);

  const bars = networks.map((n, i) => (
    <rect
      x={x(i % perRow)}
      y={offset + Math.floor(i / perRow) * (h + 2)}
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
