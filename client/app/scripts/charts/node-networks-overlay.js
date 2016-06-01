import React from 'react';
import d3 from 'd3';
import { List as makeList } from 'immutable';
import { getNodeColor } from '../utils/color-utils';
import { isContrastMode } from '../utils/contrast-utils';


const padding = 0.05;
const width = 8;
const gap = Math.PI * 0.5;
const offset = Math.PI;
const arc = d3.svg.arc();
const arcScale = d3.scale.linear()
  .range([gap * 0.5 + padding + offset, (Math.PI * 2 - gap * 0.5) - padding + offset]);


function NodeNetworksOverlay({size, stack, networks = makeList()}) {
  arcScale.domain([0, networks.size]);
  const radius = size * 0.8;

  const paths = networks.map((n, i) => {
    const d = arc({
      padAngle: 0.05,
      innerRadius: radius,
      outerRadius: radius + width,
      startAngle: arcScale(i),
      endAngle: arcScale(i + 1)
    });

    return (<path
      className="node-network"
      d={d}
      style={{fill: getNodeColor(n.get('colorKey'))}}
      key={n.get('id')}
    />);
  });

  let transform = '';
  if (stack) {
    const contrastMode = isContrastMode();
    const [dx, dy] = contrastMode ? [0, 8] : [0, 5];
    transform = `translate(${dx}, ${dy * -1.5})`;
  }

  return (
    <g transform={transform}>
      {paths.toJS()}
    </g>
  );
}

export default NodeNetworksOverlay;
