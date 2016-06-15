//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.
app.factory('AdScreenService', ['$http', function($http) {
    var factory = {};

    factory.getAdScreens =  function () {
        console.log('in getAdScreens');
        return $http.post('/api/getAdScreens',[{}]).then(function(data)
        {
            console.log('the data is : ' + data.data.messages);
            return data.data;
        });
    };
    // factory function body that constructs shinyNewServiceInstance
    return factory;
}]);





/*app.service('AdScreenService', function () {

    return function ()
    {
        console.log('in getAdScreens');
        this.adScreens = function(){
            return Screens;

        };
    };

    // this.insertCustomer = function (firstName, lastName, city) {
    //     var topID = customers.length + 1;
    //     customers.push({
    //         id: topID,
    //         firstName: firstName,
    //         lastName: lastName,
    //         city: city
    //     });
    // };
    //
    // this.deleteCustomer = function (id) {
    //     for (var i = customers.length - 1; i >= 0; i--) {
    //         if (customers[i].id === id) {
    //             customers.splice(i, 1);
    //             break;
    //         }
    //     }
    // };
    //
    // this.getCustomer = function (id) {
    //     for (var i = 0; i < customers.length; i++) {
    //         if (customers[i].id === id) {
    //             return customers[i];
    //         }
    //     }
    //     return null;
    // };

  /*  var adScreens = [{
        "id" : 1,
        "Name" : "message1",
        "Texts" : [
            "text1",
            "text2",
            "text3",
            "text4"
        ],
        "Pictures" : [
            "pictures/pie.jpg",
            "pictures/flower.jpg"
        ],
        "TemplateLink" : "templates/templateA.html",
        "PresentationTime" : {
            "startAirDate" : "01/01/2016",
            "endAirDate" : "30/12/2016",
            "presentationDays" : [
                2,
                4
            ],
            "AirTime" : [
                {
                    "start" : "6:00:00",
                    "end" : "12:00:00"
                },
                {
                    "start" : "13:00:00",
                    "end" : "20:00:00"
                }
            ]
        },
        "Screens" : [
            1,
            2
        ]
    },
        {
            "id" : 3,
            "Name" : "message3",
            "Texts" : [],
            "Pictures" : [
                "pictures/turtle.jpg"
            ],
            "TemplateLink" : "templates/templateC.html",
            "PresentationTime" : {
                "startAirDate" : "01/02/2016",
                "endAirDate" : "15/06/2016",
                "presentationDays" : [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7
                ],
                "AirTime" : [
                    {
                        "start" : "8:00:00",
                        "end" : "24:00:00"
                    },
                    {
                        "start" : "8:00:00",
                        "end" : "24:00:00"
                    },
                    {
                        "start" : "8:00:00",
                        "end" : "24:00:00"
                    },
                    {
                        "start" : "8:00:00",
                        "end" : "24:00:00"
                    },
                    {
                        "start" : "8:00:00",
                        "end" : "24:00:00"
                    },
                    {
                        "start" : "8:00:00",
                        "end" : "24:00:00"
                    },
                    {
                        "start" : "8:00:00",
                        "end" : "24:00:00"
                    }
                ]
            },
            "Screens" : [
                2,
                3
            ]
        }
    ];

});*/


