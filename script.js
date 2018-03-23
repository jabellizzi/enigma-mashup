var config = {
  schema: schema,
  url: "ws://localhost:4848/app"
};

var session = enigma.create(config);

session.open().then(function(qlik) {

  qlik.openDoc('WBY Sales.qvf').then(function(app) {
    var myDef = {
      qInfo: {
        qType: 'myBarChart'
      },
      qHyperCubeDef: {
        qDimensions: [
          {
            qDef: {
              qFieldDefs: ['Country']
            }
          }
        ],
        qMeasures: [
          {
            qDef: {
              qDef: "=Sum(OrderLineAmount)"
            },
            qSortBy: {
              qSortByNumeric: -1
            }
          }
        ],
        qInterColumnSortOrder: [1, 0],
        qInitialDataFetch: [
          {
            qTop: 0,
            qLeft: 0,
            qWidth: 2,
            qHeight: 100
          }
        ]
      }
    };

    // Create Generic Object with HyperCube
    app.createSessionObject(myDef).then(function(model) {
      renderBar(model, 'chart1');

      model.addListener('changed', function() {
        renderBar(model, 'chart1');
      });
    })
  })
})


function renderBar(model, elementId) {
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

    // Define am chart configuration
    AmCharts.makeChart(elementId, {
      type: 'serial',
      dataProvider: amData,
      categoryField: 'dim',
      graphs: [{
        fillAlphas: 1,
        type: 'column',
        valueField: 'exp'
      }],
      listeners: [{
        event: 'clickGraphItem',
        method: function(vis) {
          var elemNumber = vis.item.dataContext.elemNumber;
          model.selectHyperCubeValues('/qHyperCubeDef', 0, [elemNumber], true)
        }
      }]
    });
  })
}