export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
  yScale.ticks().map(tickValue => (
    <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
      <line x2={innerWidth} stroke = "black" />
      <text
        key={tickValue}
        style={{ textAnchor: 'end' }}
        x={-tickOffset}
        dy=".320em"
      >
        {tickValue}
      </text>
    </g>
  ));
