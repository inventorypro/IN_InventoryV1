var productLocation = [];

function viewLocationReport() {

    console.log(localStorage.logSite);

    var selectLocation = $('#setLocation').val();

    if ($('#setLocation').val() === "") {
        console.log(selectLocation);

    } else {

        $("#showDataLocation").empty();
        console.log($('#setLocation').val());

        $.ajax({

            type: "GET",
            url: "http://localhost:60443/api/IN_ProductLocation",
            dataType: 'json',
            headers: {
                'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
            },

            success: function (data) {
                productLocation = [];
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].LocationName === selectLocation.split(",")[1]) {
                        productLocation.push({ LocationName: data[i].LocationName, ProductName: data[i].ProductName, UnitType: data[i].UnitType, Price: data[i].Price, MaxValue: data[i].MaxValue, MinValue: data[i].MinValue, Amount: data[i].Amount, Adjust: parseInt(data[i].MaxValue) - parseInt(data[i].Amount) })
                    }
                }
                console.log(productLocation);

                var tagTable = "";

                tagTable += '<table class="table table-striped table-bordered text-center dtCheck" style="width:100%" id="LocationShowReport">'
                tagTable += " <thead> <tr>   <th>LocationName</th>  <th>ProductName</th> <th>UnitType</th>  <th>Price</th> <th>MaxValue</th> <th>MinValue</th> <th>Amount</th>  <th>AdjustMore</th> </tr></thead>"
                tagTable += "</table>"

                $("#showDataLocation").append(tagTable)


                // console.log(allProduct[0].split(",")[0]);

                var datatable = $('#LocationShowReport').DataTable({
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

                    "data": productLocation,
                    "columns": [
                        { "data": "LocationName" },
                        { "data": "ProductName" },
                        { "data": "UnitType" },
                        { "data": "Price" },
                        { "data": "MaxValue" },
                        { "data": "MinValue" },
                        { "data": "Amount" },
                        { "data": "Adjust" }
                    ]
                });

            },
            error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
                // alert('check !');
            }
        });
    }

}

$.ajax({

    type: "GET",
    url: "http://localhost:60443/api/IN_Location",
    dataType: 'json',
    headers: {
        'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
    },
    success: function (data) {

        //  console.log(data[0].UnitTypeName);
        //  location.reload();

        var setLocation = document.getElementById("setLocation");
        var option = document.createElement("option");
        for (var i = 0; i < data.length; i++) {


            var option = document.createElement("option");
            option.text = data[i].LocationID + "," + data[i].LocationName;


            setLocation.add(option, setLocation[i]);

        }




    },
    error: function (jqXHR, xhr, ajaxOptions, thrownError) {
        console.log(thrownError);
        //alert("Add new product failed, error is '" + thrownError + "'");
    }

});