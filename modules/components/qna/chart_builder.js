import $        from 'jquery';
import               'jqplot';
import _        from '_';

let ChartBuilder = function(settings) {
  this.settings = { config: {} };
  this.settings = _.extend(this.settings, settings);
  if ($.isEmptyObject(this.settings.config)) {
    this.settings.config = {
      animate: true,
      showAxisTicks: false,
      colors: ['orange', 'pink'],
      showPointLabels: true,
      showDataShadow: false,
      showLegend: false,
      showGridLines: false,
      'background-color': 'rgba(0,0,0,0)',
      chartBorderColor:'rgba(0,0,0,0)',
      gridShadow: false,
      showToolTip: false,
      barWidth: null,
      barPadding: 8,
      barMargin: 10,
      varyBarColor: true,
      formatString: '%d%%',
      fillColor: 'false',
      legendLocation: 'ne',
      legendPlacement: 'outsideGrid',
      titleFontSize: 16,
      pieShowChartPercentages: true,
      legendBorder: 'none',
      pieSliceMargin: '3',
      pieFill: true,
      pieDataLabelNudge: 4,
    };
  }
  return this;
};

/* Gets config file for the QnA, once config file is loaded, renders chart */
ChartBuilder.prototype.plot = function(chartType, questionObject, configUrl, target, selectedAnswers) {
  let self = this,
      metadata = {};
  metadata.height = target.height();
  metadata.width = target.width();
  metadata.target = target;
  metadata.questionObject = questionObject;
  metadata.chartType = chartType;
  metadata.selectedAnswers = selectedAnswers;
  // Kick off chart rendering now that config is loaded
  self.createChart(self.settings.config, metadata);
};

/* MAIN RENDER METHOD: Sets up the jqPlot object and renders the chart */
ChartBuilder.prototype.createChart = function(config, metadata) {
  let xRenderer, yRenderer, chartType, questionObject, target, chartRenderer,
      legendLabels, legendConfig, selectedAnswers, questionAnswered;
  chartType = metadata.chartType;
  questionObject = metadata.questionObject;
  target = metadata.target;
  chartRenderer = '';
  legendLabels = [];
  legendConfig = '';
  selectedAnswers = metadata.selectedAnswers;
  questionAnswered = false;
  // Setup renderer based on the chart type
  switch (chartType) {
    case 'vbar':
      chartType = 'vertical';
      xRenderer = {
        renderer: $.jqplot.CategoryAxisRenderer
      };
      chartRenderer = $.jqplot.BarRenderer;
      break;
    case 'hbar':
      chartType = 'horizontal';
      yRenderer = {
        renderer: $.jqplot.CategoryAxisRenderer,
      };
      chartRenderer = $.jqplot.BarRenderer;
      break;
    case 'pie':
      chartType = 'pie';
      chartRenderer = $.jqplot.PieRenderer;
      break;
    case 'line':
      chartRenderer = $.jqplot.BarRenderer;
      break;
    default:
  }

  // Data for chart
  let data = [];

  // Setup a legend if the user has switched it on
  if (config.showLegend) {
    legendConfig = {
      show: true,
      renderer: $.jqplot.EnhancedLegendRenderer,
      rendererOptions: {
        numberRows: 0,
        numberColumns: 0,
        showLabels: true,
        border: '0px'
      },
      location: config.legendLocation,
      placement: config.legendPlacement,
    };
  }
  // If response returned as a question mark (this happens when unanswered), set to 0.
  $.each(questionObject.question.choice, function(index, value) {
    if(value.totalResponse === '?' || value.totalResponse === undefined || value.totalResponse === '�' || value.totalResponse === 0) {
      value.totalResponse = 0;
      // Else activate this flag to trigger the 100% user response, used below
    } else {
      questionAnswered = true;
    }
  });

  // Structure the data according to the chart type, to be passed to jqPlot
  $.each(questionObject.question.choice, function(index, value) {
    let answerChoiceOnNewQuestion = false;
    $(selectedAnswers).each(function() {
      if(value._id === $(this).attr('choiceid')) {
        answerChoiceOnNewQuestion = true;
      }
    });
    // If the user selected this answer AND there are no POSTed answers for this question, set the users selection to 100%
    if (answerChoiceOnNewQuestion && !!questionAnswered) {
      value.totalResponse = 100 / metadata.selectedAnswers.length;
    }
    // Setup array depending on chart type
    if (chartType === 'vertical' || chartType === 'pie') {
      let temparray = [value.choiceText, parseInt(value.totalResponse, 10)];
      data.push(temparray);
    } else if (chartType === 'horizontal') {
      let temparray = [parseInt(value.totalResponse, 10), value.choiceText];
      data.push(temparray);
    }
  });

  // So data renders in the same order as the form inputs, for horizontal charts.
  if (chartType === 'horizontal') {
    data.reverse();
  }
  target.empty();
  target.html('<div id="jq_plot_chart"></div>');

  // Create chart container
  let targetDiv = $('#jq_plot_chart');

  // Set height if availabile from original element else set it to 85% of the parents container
  if (metadata.height !== undefined && metadata.height !== 0) {
    targetDiv.height(metadata.height);
  } else {
    targetDiv.height = (target.parents('div[class*=panel_BR]').height() * 0.95);
  }

  // Set width if availabile from original element else set it to 85% of the parents container
  if (metadata.width !== undefined && metadata.width !== 0) {
    targetDiv.width(metadata.width);
  } else {
    targetDiv.width(target.parents('div[class*=panel_BR]').width() * 0.95);
  }

  targetDiv.css('margin', 'auto');
  targetDiv.addClass('answer');


  // Assemble the pie charts label
  $(data).each(function(index, datapoint) {
    // Find the string in the data set, that's the proper label
    if(typeof (datapoint[0]) === 'string') {
      if(config.pieShowSliceLabels) {
        legendLabels.push(datapoint[0] + ' ' + datapoint[1] + '%');
      } else {
        legendLabels.push(datapoint[1] + '%');
      }
    } else {
      if (config.pieShowSliceLabels) {
        legendLabels.push(datapoint[1] + ' ' + datapoint[0] + '%');
      } else {
        legendLabels.push(datapoint[0] + '%');
      }
    }
  });


  // Convert font size of title to a number, else jqplot doesnt display it proper
  let titleSize = Number(config.titleFontSize);
  // Draw the chart into the target, based on the data gathered above.
  $.jqplot('jq_plot_chart', [data], {
    // Animates the chart
    animate: config.animate,
    // The question
    title: {
      fontSize: titleSize,
      text: questionObject.question.questionText,
    },
    axesDefaults: {
      showTicks: config.showAxisTicks
    },
    seriesColors: config.colors,
    seriesDefaults: {
      renderer: chartRenderer,
      rendererOptions: {
        barDirection: chartType,
        barWidth: config.barWidth,
        barPadding: config.barPadding,
        barMargin: config.barMargin,
        varyBarColor: true,
        showDataLabels: config.pieShowPercentages,
        groups: 1,
        sliceMargin: config.pieSliceMargin,
        fill: config.pieFill,
        dataLabels: legendLabels,
      },
      pointLabels: {
        show: config.showPointLabels,
        formatString: config.formatString,
        edgeTolerance: -100,
      },
      shadow: config.showDataShadow
    },
    // the legend to overflow the container.
    legend: legendConfig,
    axes: {
      xaxis: xRenderer,
      yaxis: yRenderer,
    },
    grid: {
      drawGridlines: config.showGridLines,
      background: config['background-color'],
      borderColor: config.chartBorderColor,
      shadow: config.gridShadow,
      gridLineColor: config.chartBorderColor,
    },
    cursor: {
      showTooltip: config.showToolTip
    }
  });
};
export default ChartBuilder;
