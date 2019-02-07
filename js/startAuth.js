$(document).ready(function () {

    if (typeof (Storage) !== "undefined") {

        $.ajax({

            type: "GET",
            url: "http://localhost:60443/api/UserPermission",
            dataType: 'json',
            headers: {
                'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
            },

            success: function (data) {
                //  console.table(data);
                console.log(data[0].Permission.toLowerCase());
                if (data[0].Permission.toLowerCase() === "admin") {
                    window.location.href = "Dashboard.html";
                }else if(data[0].Permission.toLowerCase() === "manager"){
                    window.location.href = "manager.html";
                }else{
                    window.location.href = "user.html";
                }
              

            },
            error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
                // alert('check !');

            }
        });


    } else {
        console.log("localStorage error");
    }

});