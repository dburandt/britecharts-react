/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import scatterPlot from './scatterPlotChart';
import { loadingContainerWrapper } from '../loading/LoadingContainer';

class ScatterPlot extends React.Component {

    static propTypes = {
        /**
         * Internally used, do not overwrite.
         */
        data: PropTypes.arrayOf(PropTypes.any),

        /**
         * Gets or Sets the aspect ratio of the chart
         */
        aspectRatio: PropTypes.number,

        /**
         * Gets or Sets the circles opacity value of the chart. 
         * Use this to set opacity of a circle for each data 
         * point of the chart. It makes the area of each data 
         * point more transparent if it's less than 1.
         */
        circleOpacity: PropTypes.number,

        /**
         * Gets or Sets the colorSchema of the chart
         */
        colorSchema: PropTypes.arrayOf(PropTypes.string),

        /**
         * Chart exported to png and a download action is fired
         */
        exportChart: PropTypes.func,

        /**
         * Gets or Sets the grid mode
         */
        grid: PropTypes.string,

        /**
         * Gets or Sets the hasCrossHairs status. If true, the hovered data 
         * point will be highlighted with lines and legend from both x and y 
         * axis. The user will see values for x under x axis line and y under 
         * y axis. Lines will be drawn with respect to highlighted data point
         */
        hasCrossHairs: PropTypes.bool,

        /**
         * Gets or Sets the hasHollowCircles value of the chart area
         */
        hasHollowCircles: PropTypes.bool,

        /**
         * Gets or Sets the hasTrendline value of the chart area If true, the 
         * trendline calculated based off linear regression formula will be drawn
         */
        hasTrendline: PropTypes.bool,

        /**
         * Gets or Sets the height of the chart
         */
        height: PropTypes.number,

        /**
         * Sets a custom distance between legend values with respect to both 
         * axises. The legends show up when hasCrossHairs is true.
         */
        highlightTextLegendOffset: PropTypes.number,

        /**
         * Gets or Sets isAnimated value. If set to true, the chart 
         * will be initialized or updated with animation.
         */
        isAnimated: PropTypes.bool,

        /**
         * Gets or Sets the margin object of the chart
         */
        margin: PropTypes.shape({
            top: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
            right: PropTypes.number,
        }),

        /**
         * Gets or Sets the maximum value of the chart area
         */
        maxCircleArea: PropTypes.number,

        /**
         * Gets or Sets the width of the chart
         */
        width: PropTypes.number,

        /**
         * Exposes ability to set the format of x-axis values
         */
        xAxisFormat: PropTypes.string,

        /**
         * Gets or Sets the xAxisLabel of the chart. Adds a label 
         * bellow x-axis for better clarify of data representation
         */
        xAxisLabel: PropTypes.string,

        /**
         * Gets or Sets the offset of the xAxisLabel of the chart. 
         * The method accepts both positive and negative values
         */
        xAxisLabelOffset: PropTypes.number,

        /**
         * Gets or Sets the xTicks of the chart 
         */
        xTicks: PropTypes.number,

        /**
         * Exposes ability to set the format of y-axis values 
         */
        yAxisFormat: PropTypes.string,

        /**
         * Gets or Sets the y-axis label of the chart 
         */
        yAxisLabel: PropTypes.string,

        /**
         * Gets or Sets the offset of the yAxisLabel of the chart. 
         * The method accepts both positive and negative values
         */
        yAxisLabelOffset: PropTypes.number,

        /**
         * Gets or Sets the xTicks of the chart 
         */
        yTicks: PropTypes.number,

        customMouseOver: PropTypes.func,
        customMouseMove: PropTypes.func,
        customMouseOut: PropTypes.func,

        /**
         * Internally used, do not overwrite.
         *
         * @ignore
         */
        chart: PropTypes.object,
    }

    static defaultProps = {
        chart: scatterPlot,
        createTooltip: () => null,
        shouldShowLoadingState: false,
    }

    constructor(props) {
        super(props);

        this._setRef = this._setRef.bind(this);
    }

    componentDidMount() {
        if (!this.props.shouldShowLoadingState) {
            if (this.props.data !== null) {
                this._createChart();
            }
        }
    }

    componentDidUpdate() {
        if (!this.props.shouldShowLoadingState) {
            if (!this._chart) {
                this._createChart();
            } else {
                this._updateChart();
                this.props.createTooltip();
            }
        }
    }

    componentWillUnmount() {
        this.props.chart.destroy(this._rootNode);
    }

    _createChart() {
        this._chart = this.props.chart.create(
            this._rootNode,
            this.props.data,
            this._getChartConfiguration()
        );
    }

    _updateChart() {
        this.props.chart.update(
            this._rootNode,
            this.props.data,
            this._getChartConfiguration(),
            this._chart
        );
    }

    /**
     * We want to remove the chart and data from the props in order to have a configuration object
     * @return {Object} Configuration object for the chart
     */
    _getChartConfiguration() {
        let configuration = { ...this.props };

        delete configuration.data;
        delete configuration.chart;
        delete configuration.createTooltip;
        delete configuration.shouldShowLoadingState;

        return configuration;
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }

    render() {
        return loadingContainerWrapper(
            this.props,
            this.props.chart.loading(),
            <div className="scatter-plot-container" ref={this._setRef} />
        );
    }
}

export default ScatterPlot;
