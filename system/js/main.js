
var timbre = new Audio('sonidos/Glass.wav');
// Creación del módulo
var rutas = angular.module('rutas', ['ngRoute','ngResource']);
// Configuración de las rutas
rutas.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'vistas/inicio.html',
            controller  : 'inicioController'
        })
        /*final*/  
        .otherwise({
            redirectTo: '/'
        });
});
rutas.factory('socket',['$rootScope', function($rootScope){
    var socket = io.connect('http://localhost:8080');
    return{
        on: function(eventName, callback){
            socket.on(eventName, callback);
        },
        emit:function(eventName,data){
            socket.emit(eventName,data);
        }
    };
}]);
rutas.controller('inicioController', function($scope, $http) 
{
    $scope.caja =  "0";
    $scope.turno = "0";
});
rutas.controller('cajasController', function($scope, $http, socket)
{
     socket.on('caja',function(data){
        console.log(data);
        $scope.$apply(function(){
            $scope.caja=data;
            timbre.play();
        });
    });
});
rutas.controller('turnoController',function($scope, $http, socket)
{
    socket.on('turno',function(data){
        console.log(data);
        $scope.$apply(function(){
            $scope.turno = data;
            timbre.play();
        });
    })
});