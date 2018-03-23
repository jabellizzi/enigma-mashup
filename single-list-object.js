var config = {
  schema: schema,
  url: "ws://localhost:4848/app"
};

var session = enigma.create(config);

session.open().then(function(qlik) {

  qlik.openDoc('WBY Sales.qvf').then(function(app) {
    var myCustomListObject = {
      qInfo: {
        qType: "myListObject"
      },
      qListObjectDef: {
        qDef: {
          qFieldDefs: ["Country"]
        },
        qInitialDataFetch: [
          {
            qTop: 0,
            qLeft: 0,
            qWidth: 1,
            qHeight: 100
          }
        ]
      }
    };

    app.createSessionObject(myCustomListObject).then(function(model) {
      model.getLayout().then(function(layout) {
        console.log(layout);

        model.selectListObjectValues('/qListObjectDef', [21, 17], true).then(function(response) {
          model.getLayout().then(function(layout) {
            console.log(layout);
          });
        });
      });
    });

  })
})

