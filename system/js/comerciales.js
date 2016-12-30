$(document).ready(function()
{
    $.ajax({
        url: "http://agua.dev/comerciales/mostrar",
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
                		$("#consumi").append("<li class='item video'> <video id='mi-video"+data.id+"'controls> <source src='http://agua.dev/comercial/"+data.ruta+"'> </video> </li>");
                		//$("#myCarousel").carousel('pause');
                	}
                	else if(data.tipo=="imagen")
                	{
                		$("#consumi").append("<li class='item imagen'> <img src='http://agua.dev/comercial/"+data.ruta+"'> </li>");
					}
				    
                    $('#mi-video'+data.id).on('play', function (e) {
                        //$("#myCarousel").carousel('pause');
                        console.log('El video: '+data.id+' ha empezado!!!');

                    });
                    $("#mi-video"+data.id).on('ended', function(e){
        				console.log('El video: '+data.id+' ha finalizado!!!');
        				$("#myCarousel").carousel('next');
    				});

                })
            },
            error: function (response) {
                alert("error al cargar el carusel");
                //console.log(response);
            },
            failure: function (response) {
                alert("failure");
                //console.log(response);
            }
    });
});