var productLocation = [];

$(document).ready(function () {
    console.log(localStorage.logSite);

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductLocation",
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].Amount <= data[i].MinValue) {
                    productLocation.push({ LocationName: data[i].LocationName, ProductName: data[i].ProductName, UnitType: data[i].UnitType, Price: data[i].Price, MaxValue: data[i].MaxValue, MinValue: data[i].MinValue, Amount: data[i].Amount })
                }
            }
            console.log(productLocation);

            // console.log(allProduct[0].split(",")[0]);

            var datatable = $('#LocationReport').DataTable({
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
                    { "data": "Amount" }
                ]
            });

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            // alert('check !');
        }
    });
});