function callAPI(){
   

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductRequis?userID=all&RequisStatus=all",
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            console.log(data);

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Your can't View, error is '" + thrownError + "'");
            //window.location.href = "index.html";
        }
    });
}