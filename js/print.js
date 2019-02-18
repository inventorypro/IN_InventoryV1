$(document).ready(function () {
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductViewBarcode?RequisNumber=" + localStorage.logIDrequisViewPro,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            var numberRow = 1;
            // console.table(data);
            for (var i = 0; i < data.length; i++) {
                if (data[i].RequisStatus.toLowerCase() === "unapprove" || data[i].RequisStatus.toLowerCase() === "approve") {

                } else {
                    numberRow += 1;

                }


            }

            var datatable = $('#examplePrint').DataTable({

                dom: 'lBrtip',

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
                "order": [[2, 'asc']], //asc|desc
                "data": data,
                "bPaginate": false,
                "bFilter": false,
                "pageLength": -1,
                "columns": [
                    {
                        "data": "RequisID", render: function (data, type, row, meta) {
                            return type === 'display' ?
                                '' + numberRow++ + '' :
                                data;
                        }
                    },
                    { "data": "Barcode", },
                    { "data": "ProductName", },
                    { "data": "Price", },
                    { "data": "UnitType", },
                    { "data": "RequisAmount", },
                    {
                        "data": "RequisID", render: function (data, type, row, meta) {
                            return type === 'display' ?
                                '' + parseInt(row.Price) * parseInt(row.RequisAmount) + '' :
                                data;
                        }
                    }

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