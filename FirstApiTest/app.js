angular.module("ApiTestApp", ["ui.router"])



        .config(function config($stateProvider){
            $stateProvider.state("index", {
              url: "",
              controller: "AppCtrl as app",
              templateUrl: "templates/first.html"
            })
        })

        .controller('AppCtrl', ['$http', function ($http) {
              var app = this;
              $http.get("http://localhost:3000/people").success(function(result){
                app.people  = result;
              })
        }])
