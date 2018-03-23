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

    })
  })
})

// PIE
function renderPie(model, elementId) {

}


// BAR
function renderBar(model, elementId) {
  
}


// LINE
function renderLine(model, elementId) {
  
}