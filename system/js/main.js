
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
rutas.controller('cajasController', function($scope, $http, socket)
{
     socket.on('caja',function(data){
        console.log(data);
        $scope.$apply(function(){
            $scope.caja=data;
            timbre.play();
        });
    });

     socket.on('tipo',function(data){
        console.log(data);
        $scope.$apply(function(){
            $scope.tipo=data;
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
rutas.controller('asuntoController', function($scope, $http, socket)
{
     socket.on('asunto',function(data){
        console.log(data);
        $scope.$apply(function(){
            $scope.asunto=data;
            timbre.play();
        });
    });
});
rutas.controller('comercialController', function($scope, $route, $timeout, socket)
{
    socket.on('comercial',function(data){
        console.log(data);
        $scope.$apply(function(){
            $route.reload();
            //timbre.play();
        });
    });
});