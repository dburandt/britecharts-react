import scatterPlotData from './scatterPlotChart.fixtures';
import scatterPlot from './scatterPlotChart';

describe('Scatter Plot Chart', () => {
    let anchor;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe('create', () => {

        describe('when incorrect arguments are used', () => {

            describe('when the DOM element is not passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                      scatterPlot.create(
                            undefined,
                            scatterPlotData.firstDataMethod(),
                            {}
                        );
                    }).toThrowError('A root container is required');
                });
            });

            describe('when a non-supported method is passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        scatterPlot.create(
                            anchor,
                            scatterPlotData.firstDataMethod(),
                            { test: 'test' }
                        );
                    }).toThrowError('Method not supported by Britechart: test');
                });
            });

            describe('when wrong event handlers are passed', () => {
                it('should throw ane error', () => {
                    const callback = jest.fn();

                    expect(() => {
                        scatterPlot.create(
                            anchor,
                            scatterPlotData.firstDataMethod(),
                            { customFakeEvent: callback }
                        );
                    }).toThrowError('Method not supported by Britechart: customFakeEvent');
                });
            });
        });

        describe('when proper arguments are passed', () => {

            it('should set data as a DOM property', () => {
                const expected = scatterPlotData.firstDataMethod().length;

                scatterPlot.create(anchor, scatterPlotData.firstDataMethod());

                const actual = anchor.__data__.length;

                expect(actual).toEqual(expected);
            });

            it('should set the width', () => {
                const expected = 500;

                const chart = scatterPlot.create(
                    anchor,
                    scatterPlotData.firstDataMethod(),
                    { width: expected }
                );

                const actual = chart.width();

                expect(actual).toEqual(expected);
            });

            it('should set the height', () => {
                const expected = 600;

                const chart = scatterPlot.create(
                    anchor,
                    scatterPlotData.firstDataMethod(),
                    { height: expected }
                );

                const actual = chart.height();

                expect(actual).toEqual(expected);
            });

            it('should set the margin', () => {
                const expected = {
                    top: 0,
                    bottom: 1,
                    left: 2,
                    right: 3,
                };

                const chart = scatterPlot.create(
                    anchor,
                    scatterPlotData.firstDataMethod(),
                    { margin: expected }
                );

                const actual = chart.margin();

                expect(actual).toEqual(expected);
            });

            /**
             * The grid is not supported by every chart, and this test should only be included if necessary
             */
            it('should set the grid', () => {
                const expected = 'vertical';

                const chart = scatterPlot.create(
                    anchor,
                    scatterPlotData.firstDataMethod(),
                    { grid: expected }
                );

                const actual = chart.grid();

                expect(actual).toEqual(expected);
            });

            describe('when event handlers are passed', () => {

                it('should set customMouseOver callback', () => {
                    const expected = jest.fn();

                    const chart = scatterPlot.create(
                        anchor,
                        scatterPlotData.firstDataMethod(),
                        { customMouseOver: expected }
                    );

                    const actual = chart.on('customMouseOver');

                    expect(actual).toEqual(expected);
                });

                it('should set customMouseMove callback', () => {
                    const expected = jest.fn();

                    const chart = scatterPlot.create(
                        anchor,
                        scatterPlotData.firstDataMethod(),
                        { customMouseMove: expected }
                    );

                    const actual = chart.on('customMouseMove');

                    expect(actual).toEqual(expected);
                });

                it('should set customMouseOut callback', () => {
                    const expected = jest.fn();

                    const chart = scatterPlot.create(
                        anchor,
                        scatterPlotData.firstDataMethod(),
                        { customMouseOut: expected }
                    );

                    const actual = chart.on('customMouseOut');

                    expect(actual).toEqual(expected);
                });
            });
        });
    });

    describe('update', () => {

        describe('when updating data', () => {

            describe('when new data is passed', () => {
                it('should update the data in the container', () => {
                    const firstDataSet = scatterPlotData.firstDataMethod();
                    const secondDataSet = scatterPlotData.secondDataMethod();
                    let chart = scatterPlot.create(anchor, firstDataSet, {});

                    scatterPlot.update(anchor, secondDataSet, {}, chart);

                    const expected = secondDataSet.length;
                    const actual = anchor.__data__.length;

                    expect(actual).toEqual(expected);
                });
            });

            describe('when new data is not passed', () => {
                it('should keep the data in the container', () => {
                    const dataSet = scatterPlotData.firstDataMethod();
                    let chart = scatterPlot.create(anchor, dataSet, {});

                    scatterPlot.update(anchor, [], {}, chart);

                    const expected = dataSet.length;
                    const actual = anchor.__data__.length;

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('when updating configuration', () => {

            describe('when new configuration is passed', () => {
                it('should update the configuration in the chart', () => {
                    const expected = 500;
                    const firstWidth = 200;
                    const chart = scatterPlot.create(
                        anchor,
                        scatterPlotData.firstDataMethod(),
                        { width: firstWidth }
                    );

                    scatterPlot.update(anchor, [], { width: expected }, chart);

                    const actual = chart.width();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
