$(document).ready(function () {
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductViewBarcode?RequisNumber="+ localStorage.logIDrequisViewPro,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {

            // console.table(data);


            var datatable = $('#example').DataTable({

                // dom: 'lBrtip',

                responsive: true,
                // dom: 'Bfrtip',
                autoWidth: false,
                buttons: [

                    // 'copy', 'csv', 'excel',
                    // {
                    //     extend: 'collection',
                    //     text: 'Table control',
                    //     autoClose: true,
                    //     buttons: [
                    //         'colvis'
                    //     ]
                    // }

                ],
                "order": [[ 0, 'desc' ]], //asc|desc
                "data": data,
                "columns": [
                    { "data": "RequisID", },
                    { "data": "ProductID", },
                    { "data": "Category", },
                    { "data": "ProductName", },
                    { "data": "Price", },
                    { "data": "UnitType", },
                    { "data": "Balance", },
                    { "data": "RequisAmount", },
                    { "data": "RequisNote", },
                    { "data": "Date", },
                    { "data": "ImgProduct", },
                    { "data": "UserID", },
                    { "data": "Barcode", },
                    { "data": "Location", },
                    { "data": "RequisStatus", },
                    { "data": "RequisNumber", },
                    { "data": "EMP_EngName", },
                    { "data": "Position", }
                ]




            });


            // for(var i = 0 ; i <= data.length ; i++){
            //     $( ".getMyProduct" ).append( "<p>"+data[i].ProductID +"</p>" );
            // }
        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            // alert('check !');

        }

    });
});

function viewNote(note){
    document.getElementById("getNoteView").innerHTML =  note;

}