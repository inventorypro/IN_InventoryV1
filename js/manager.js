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
                console.table(data);
                // console.log(data[0].Permission.toLowerCase());
                //console.log(localStorage.logUsername);


                try {
                    if (data[0].Permission.toLowerCase() === "manager") {
                        document.getElementById("myUsername").innerHTML = data[0].EMP_EngName;
                        localStorage.setItem("getMyUsername", data[0].EMP_EngName);
                        localStorage.setItem("getMyPosition", data[0].Position);
                    } else {
                        window.location.href = "index.html";
                    }

                }
                catch (err) {

                    window.location.href = "index.html";
                    alert(err.message);
                }


            },
            error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
                //  alert('check !');
                window.location.href = "index.html";
            }
        });


    } else {
        console.log("localStorage error");
    }

});

function goBack() {
    window.history.back();
} 
