$(document).ready(function()
{
    $.ajax({
        url: "http://10.10.10.11/admin_agua/public/comerciales/mostrar",
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
                		$("#consumi").append("<div class='item'> <video id='mi-video"+data.id+"' controls> <source src='http://10.10.10.11/admin_agua/public/comercial/"+data.ruta+"'> </video> </div>");
                		//$("#myCarousel").carousel('pause');
                	}
                	else if(data.tipo=="imagen")
                	{
                		$("#consumi").append("<div class='item'> <img src='http://10.10.10.11/admin_agua/public/comercial/"+data.ruta+"'> </div>");
					}
				    
                    $('#myCarousel').on('slide.bs.carousel', function () 
                    {
                        //setTimeout(function(){$('#myCarousel').carousel('pause');}, 1)
                        console.log('slide');
                       
                    });	
                    $("#mi-video"+data.id).on('ended', function(){
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