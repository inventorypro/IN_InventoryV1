var productLocationHis = [];

function viewLocationHisReport() {

    var selectLocation = $('#addLocation').val();

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_LocationHistory?siteName=all",
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].LocationName === selectLocation.split(",")[1]) {
                    productLocationHis.push({ LocationName: data[i].LocationName, ProductName: data[i].ProductName, Price: data[i].Price, Amount: data[i].Amount, Balance: data[i].Balance, Date: data[i].Date })
                }
            }
            console.log(productLocationHis);

            var tagTable = "";
            
            tagTable += '<table class="table table-striped table-bordered text-center dtCheck" style="width:100%" id="LocationHistory">'
            tagTable += " <thead> <tr>   <th>LocationName</th>  <th>ProductName</th>  <th>Price</th>  <th>Amount</th>  <th>Balance</th> <th>Date</th> </tr></thead>"
            tagTable += "</table>"
            
            $("#showDataLocationHis").append(tagTable)

            // console.log(allProduct[0].split(",")[0]);

            var datatable = $('#LocationHistory').DataTable({
                // dom: 'lBrtip,Bfrtip,CBlrtip',

                fixedHeader: true,

                dom: 'Bfrtip',
                responsive: true,
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],

                autoWidth: false,
                buttons: [
                    // 'copy', 'csv', 'excel',
                    // {
                    //     extend:    'csvHtml5',
                    //     text:      '<i class="material-icons" style="font-size: 1em;"> file_copy </i>',
                    //     titleAttr: 'CSV'
                    // },

                    {
                        extend: 'pageLength',
                        text: 'Page Length',
                        className: "",
                        titleAttr: 'Page Length'
                    },
                    {
                        extend: 'collection',
                        text: 'Table control',
                        autoClose: true,
                        buttons: [
                            'colvis'
                        ]
                    },


                ],

                "data": productLocationHis,
                "columns": [
                    { "data": "LocationName" },
                    { "data": "ProductName" },
                    { "data": "Price" },
                    { "data": "Amount" },
                    { "data": "Balance" },
                    { "data": "Date" }
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
}


$.ajax({

    type: "GET",
    url: "http://localhost:60443/api/IN_LocationHistory?siteName=all",
    dataType: 'json',
    headers: {
        'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
    },
    success: function (data) {

        //  console.log(data[0].UnitTypeName);
        //  location.reload();

        var addLocation = document.getElementById("addLocation");
        var option = document.createElement("option");
        for (var i = 0; i < data.length; i++) {


            var option = document.createElement("option");
            option.text = data[i].LocationID + "," + data[i].LocationName;


            addLocation.add(option, addLocation[i]);

        }




    },
    error: function (jqXHR, xhr, ajaxOptions, thrownError) {
        console.log(thrownError);
        //alert("Add new product failed, error is '" + thrownError + "'");
    }

});