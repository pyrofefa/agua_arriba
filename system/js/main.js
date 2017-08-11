
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
    $scope.tipo = "VENTANILLA";
});
rutas.controller('turnoController',function($scope, $http, socket)
{
    socket.on('turno',function(data){
        console.log(data);
        $scope.$apply(function(){
        	$scope.turno = data.turno;
            $scope.caja = data.caja;
            $scope.letra = data.letra;
            $scope.tipo = data.tipo;
            timbre.play();
        });
    })
});
rutas.controller('comercialController', function($scope, $route, socket, $timeout)
{
    socket.on('comercial',function(data){
        console.log(data);
        $scope.$apply(function(){
            $route.reload();
            //timbre.play();
        });
    });

    $timeout(function() {
        $route.reload();
        console.log("reset");
    },32400000);

});