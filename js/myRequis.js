$(document).ready(function () {
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Requisition?userID=" + localStorage.logUsername,
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
                "order": [[ 6, 'desc' ]], //asc|desc
                "data": data,
                "columns": [
                    { "data": "RequisID", visible: false  },
                    { "data": "RequisNumber",  },
                    { "data": "RequisPosition" },
                    { "data": "RequisDept",  },
                    { "data": "RequisLocation", },
                    { "data": "RequisNote",  },
                    { "data": "RequisDate",  },
                    { "data": "RequisStatus",  },

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