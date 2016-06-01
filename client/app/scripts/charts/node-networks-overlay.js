import React from 'react';
import d3 from 'd3';
import { List as makeList } from 'immutable';
import { getNodeColor } from '../utils/color-utils';
import { isContrastMode } from '../utils/contrast-utils';


const width = 20;
const gap = Math.PI * 0;
const offset = Math.PI * 0.5;
const arc = d3.svg.arc().
      cornerRadius(width * 0);
const arcScale = d3.scale.linear()
  .range([gap * 0.5 + offset, (Math.PI * 2 - gap * 0.5) + offset]);


function NodeNetworksOverlay({id, size, stack, networks = makeList()}) {
  arcScale.domain([0, networks.size]);
  const radius = size * 0.4;
  const filterId = `dropshadow-${id}`;

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
      style={{
        fill: getNodeColor(n.get('colorKey'))
        // filter: `url(#${filterId})`
      }}
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
      <filter id={filterId} height="130%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="2" dy="2" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      {paths.toJS()}
    </g>
  );
}

export default NodeNetworksOverlay;
