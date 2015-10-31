Template.backOffice.helpers({
  sdvs: function () {
    return Sdvs.find({}, {sort:{order: 1}}).fetch();
  }
});

Template.backOffice.events({
  'change #csvFile': function (evt, tmpl) {
    var csvFile = tmpl.find('#csvFile').files[0];
    console.log(csvFile);
    if (csvFile && csvFile.type === 'text/csv') {
      $('#csvFileText').val(csvFile.name);
      readFile(csvFile, function (content) {
        Meteor.call('uploadCsv', content);
      });
    } else {
      swal('Oops...', 'Must be a CSV file!', 'error');
      $('#csvFileText').val('');
    }
    $('#csvFile').val('');
  },
  'change #sdv1': function (evt, tmpl) {
    var series = [];
    if (evt.currentTarget.value) {
      var sdv1 = Sdvs.findOne({_id: evt.currentTarget.value});
      series.push({name: sdv1.sdv + ' A-1', data: sdv1.previousPeriod});
      series.push({name: sdv1.sdv, data: sdv1.currentPeriod});
    }
    Session.set('sdv1', series);
    builtColumn();
  },
  'change #sdv2': function (evt, tmpl) {
    var series = [];
    if (evt.currentTarget.value) {
      var sdv2 = Sdvs.findOne({_id: evt.currentTarget.value});
      series.push({name: sdv2.sdv + ' A-1', data: sdv2.previousPeriod});
      series.push({name: sdv2.sdv, data: sdv2.currentPeriod});
    }
    Session.set('sdv2', series);
    builtColumn();
  }
});

readFile = function (f, onLoadCallback) {
  //When the file is loaded the callback is called with the contents as a string
  var reader = new FileReader();
  reader.onload = function (e){
    var contents=e.target.result;
    onLoadCallback(contents);
  };
  reader.readAsText(f);
};


Template.backOffice.onRendered(function () {
  Meteor.subscribe('Sdvs');
  Meteor.subscribe('Periods');
});

Template.backOffice.onDestroyed(function () {

});

/*
 * Function to draw the column chart
 */
function builtColumn () {
  var period = Periods.findOne({});
  var sdv1 = Session.get('sdv1') || [];
  var sdv2 = Session.get('sdv2') || [];
  var series = sdv1.concat(sdv2);
  console.log(series);

  $('#container-column').highcharts({
    chart: {
      type: 'column'
    },

    title: {
      text: 'Evolution part de marché'
    },

    subtitle: {
      text: 'Source: iri Worldwide'
    },

    credits: {
      enabled: false
    },

    xAxis: {
      categories: period.period
    },

    yAxis: {
      min: 0,
      title: {
        text: 'Part (pts)'
      }
    },

    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} pts</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },

    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },

    series: series
  });
}
