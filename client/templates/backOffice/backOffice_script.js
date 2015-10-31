Template.backOffice.helpers({
  sdvs: function () {
    return Sdvs.find({}, {sort:{order: 1}}).fetch();
  }
});

Template.backOffice.events({
  'change #csvFileMs': function (evt, tmpl) {
    var csvFileMs = tmpl.find('#csvFileMs').files[0];
    if (csvFileMs && csvFileMs.type === 'text/csv') {
      $('#csvFileMsText').val(csvFileMs.name);
      readFile(csvFileMs, function (content) {
        Meteor.call('uploadCsv', content, 'ms');
      });
    } else {
      swal('Oops...', 'Must be a CSV file!', 'error');
      $('#csvFileMsText').val('');
    }
    $('#csvFileMs').val('');
  },
  'change #csvFileCa': function (evt, tmpl) {
    var csvFileCa = tmpl.find('#csvFileCa').files[0];
    if (csvFileCa && csvFileCa.type === 'text/csv') {
      $('#csvFileCaText').val(csvFileCa.name);
      readFile(csvFileCa, function (content) {
        Meteor.call('uploadCsv', content, 'ca');
      });
    } else {
      swal('Oops...', 'Must be a CSV file!', 'error');
      $('#csvFileCaText').val('');
    }
    $('#csvFileMs').val('');
  },
  'change #sdv1': function (evt, tmpl) {
    var series = [];
    var seriesCa = [];
    if (evt.currentTarget.value) {
      var sdv1 = Sdvs.findOne({_id: evt.currentTarget.value});
      if (sdv1) {
        series.push({name: sdv1.sdv + ' A-1', data: sdv1.previousPeriod});
        series.push({name: sdv1.sdv, data: sdv1.currentPeriod});
        var sdv1ca = SdvCas.findOne({geogKey: sdv1.geogKey});
        if (sdv1ca) {
          seriesCa.push({name: sdv1ca.sdv + ' Conc', data: sdv1ca.conc});
          seriesCa.push({name: sdv1ca.sdv, data: sdv1ca.ca});
        }
      }
    }
    Session.set('sdv1', series);
    Session.set('sdv1ca', seriesCa);
    builtColumnMs();
    builtColumnCa();
  },
  'change #sdv2': function (evt, tmpl) {
    var series = [];
    var seriesCa = [];
    if (evt.currentTarget.value) {
      var sdv2 = Sdvs.findOne({_id: evt.currentTarget.value});
      if (sdv2) {
        series.push({name: sdv2.sdv + ' A-1', data: sdv2.previousPeriod});
        series.push({name: sdv2.sdv, data: sdv2.currentPeriod});
        var sdv2ca = SdvCas.findOne({geogKey: sdv2.geogKey});
        if (sdv2ca) {
          seriesCa.push({name: sdv2ca.sdv + ' Conc', data: sdv2ca.conc});
          seriesCa.push({name: sdv2ca.sdv, data: sdv2ca.ca});
        }
      }
    }
    Session.set('sdv2', series);
    Session.set('sdv2ca', seriesCa);
    builtColumnMs();
    builtColumnCa();
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
  Meteor.subscribe('SdvCas');
  Meteor.subscribe('Periods');
});

Template.backOffice.onDestroyed(function () {

});

function builtColumnMs () {
  var period = Periods.findOne({});
  var sdv1 = Session.get('sdv1') || [];
  var sdv2 = Session.get('sdv2') || [];
  var series = sdv1.concat(sdv2);
  $('#container-column-ms').highcharts({
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

function builtColumnCa () {
  var period = Periods.findOne({});
  var sdv1ca = Session.get('sdv1ca') || [];
  var sdv2ca = Session.get('sdv2ca') || [];
  var series = sdv1ca.concat(sdv2ca);
  $('#container-column-ca').highcharts({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Evolution chiffre d\'affaire'
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
      title: {
        text: 'CA (%)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
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
