var timbre = new Audio('sonidos/Glass.wav');
$(document).ready(function()
{
    $.ajax({
        //url: "http://192.168.1.57:8080/turnomatic/public/comerciales/mostrar",
        url: "http://192.168.100.122/turnomatic/public/api/comerciales",
        data: "{}",
        dataType: "json",
        type: "GET",
        contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log(data);
                $.each(data, function(index, data)
                {
                	$("#myCarousel .carousel-inner .item:first").addClass("active");
					if (data.tipo=="video") 
                	{
                        $("#consumi").append("<li class='item video'> <video id='mi-video"+data.id+"' muted controls onerror='myScript'> <source src='C:/comercial/"+data.ruta+"'> </video> </li>");
                		//$("#consumi").append("<li class='item video'> <video id='mi-video"+data.id+"' muted> <source src='http://192.168.1.57:8080/turnomatic/public/comercial/"+data.ruta+"'> </video> </li>");
                		//$("#myCarousel").carousel('pause');
                	}
                	else if(data.tipo=="imagen")
                	{
                        $("#consumi").append("<li class='item imagen'> <img src='C:/comercial/"+data.ruta+"' height='200px'> </li>");
                		//$("#consumi").append("<li class='item imagen'> <img src='http://192.168.1.57:8080/turnomatic/public/comercial/"+data.ruta+"' height='200px'> </li>");
					}
				    $("#mi-video"+data.id).on('ended', function(e){
        				console.log('El video: mi-video'+data.id+' ha finalizado!!!');
        				$("#myCarousel").carousel('next');//slide de carusel cuando un video halla terminado
    				});

                })
            },
            error: function (response) {
                $("#consumi").append("<li class='item active'> <img src='comercial/AguaLogo.png' ></li>");
                //alert("error al cargar el carusel");
                //location.reload(); 
                console.log("Ha ocurrido un error al cargar el carusel");
            },
            failure: function (response) {
                alert("failure");
                //console.log(response);
            }
    });
});