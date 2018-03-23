var config = {
  schema: schema,
  url: "ws://localhost:4848/app"
};

var session = enigma.create(config);

session.open().then(function(qlik) {

  qlik.openDoc('WBY Sales.qvf').then(function(app) {
    var pieDef = {
      qInfo: {
        qType: 'myPieChart'
      },
      qHyperCubeDef: {
        qDimensions: [
          {
            qDef: {
              qFieldDefs: ['CategoryName']
            }
          }
        ],
        qMeasures: [
          {
            qDef: {
              qDef: "=Sum(OrderLineAmount)"
            }
          }
        ],
        qInitialDataFetch: [
          {
            qTop: 0,
            qLeft: 0,
            qWidth: 2,
            qHeight: 50
          }
        ]
      }
    };

    // Create Generic Object with HyperCube
    app.createSessionObject(pieDef).then(function(model) {
      // Render PIE every time the model changes
      model.addListener('changed', function() {
        renderPie(model, 'PIE');
      });
      // Render PIE when the object initizalizes
      renderPie(model, 'PIE');
    })
  })
})

// PIE
function renderPie(model, elementId) {
  model.getLayout().then(function(layout) {
    var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
    // Reformatting qMatrix data into amChart format
    var amData = qMatrix.map(function(qMatrixRow) {
      return {
        dim: qMatrixRow[0].qText,
        exp: qMatrixRow[1].qNum,
        elemNumber: qMatrixRow[0].qElemNumber
      }
    });

    // Render Pie Chart
    AmCharts.makeChart(elementId, {
      type: 'pie',
      valueAxes: [{
        axisAlpha: 1
      }],
      radius: '42%',
      innerRadius: '60%',
      dataProvider: amData,
      titleField: 'dim',
      valueField: 'exp',
      labelText: '[[dim]]'
    })
  })
}


// BAR
function renderBar(model, elementId) {
  
}


// LINE
function renderLine(model, elementId) {
  
}