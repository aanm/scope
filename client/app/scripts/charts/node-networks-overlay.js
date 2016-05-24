import React from 'react';
import d3 from 'd3';
import { List as makeList } from 'immutable';
import { getNodeColor } from '../utils/color-utils';


const padding = 0.05;
const arc = d3.svg.arc()
  .startAngle(d => d.startAngle + padding)
  .endAngle(d => d.endAngle - padding);


function NodeNetworksOverlay({size, networks = makeList()}) {
  const arcScale = d3.scale.linear()
    .domain([0, networks.size])
    .range([0, Math.PI * 2]);

  const paths = networks.map((n, i) => {
    const d = arc({
      innerRadius: size,
      outerRadius: size + 4,
      startAngle: arcScale(i),
      endAngle: arcScale(i + 1)
    });

    return <path d={d} style={{fill: getNodeColor(n)}} />;
  });

  return (
    <g>
      {paths.toJS()}
    </g>
  );
}

export default NodeNetworksOverlay;

