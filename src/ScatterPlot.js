import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear,  max, format, extent, scaleLinear as d3_scaleLinear, select as d3_select, scaleOrdinal } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import Marks from './Marks';
import Filter from './Filter'

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

const ScatterPlot = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = d => d.ShareWomen;
  // console.log(data);
  const xAxisLabel = 'Percent of Women';

  const yValue = d => d.Median;
  const yAxisLabel = 'Median Income';

  const colorValue = d => d.Major_category;

  const siFormat = format(",.0%");
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  // console.log(scaleLinear().domain(extent(data, xValue)));
  // var formatPercent = d3.format(".0%");

  // var xScale = d3.svg.axis()
  //     .scale(y)
  //     .orient("left")
  //     .tickFormat(formatPercent);

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0]);

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#5E4FA2", "#3288BD", "#66C2A5", "#ABDDA4", "#E6F598", 
    "#FFFFBF", "#FEE08B", "#FDAE61", "#F46D43", "#D53E4F", "#9E0142"]) ;

  return (
    <div>
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={15}
        />

        <text
          className="axis-label"
          textAnchor="middle"
          y={innerHeight - xAxisLabelOffset - 395}
          transform={`translate(${-yAxisLabelOffset},${innerHeight /
            2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>

        <AxisLeft 
          yScale={yScale} 
          innerWidth={innerWidth} 
          tickOffset={15} 
        />

        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>

        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          
          colorScale={colorScale}
          colorValue={colorValue}

          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={7}
        />
      </g>
    </svg>
    <Filter
      data = {data}/>
    </div>

  );
};

export default ScatterPlot;
