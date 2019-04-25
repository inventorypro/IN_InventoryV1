
// window.onload = function () {

//     var options = {
//         animationEnabled: true,
//         title: {
//             text: "GDP Growth Rate - 2016"
//         },
//         axisY: {
//             title: "Growth Rate (in %)",
//             suffix: "%",
//             includeZero: false
//         },
//         axisX: {
//             title: "Countries"
//         },
//         data: [{
//             type: "column",
//             yValueFormatString: "#,##0.0#" % "",
//             dataPoints: [
//                 { label: "Iraq", y: 10.09 },
//                 { label: "Turks & Caicos Islands", y: 9.40 },
//                 { label: "Nauru", y: 8.50 },
//                 { label: "Ethiopia", y: 7.96 },
//                 { label: "Uzbekistan", y: 7.80 },
//                 { label: "Nepal", y: 7.56 },
//                 { label: "Iceland", y: 7.20 },
//                 { label: "India", y: 7.1 }

//             ]
//         }]
//     };
//     $("#chartContainer").CanvasJSChart(options);

// }

var productAll = [];
var totalCostProduct = [];
var countLocation = 0;
$(document).ready(function () {

    // var pageLength = 10;
    // function pageLength() {
    //     pageLength = $('#addProductName').val();
    // }

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductRequis?userID=all&RequisStatus=all",
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            //console.log(data)
            for (var i = 0; i < data.length; i++) {
                if (data[i].RequisStatus === "finish") {
                    productAll.push({ Location: data[i].Location, ProductName: data[i].ProductName, UnitType: data[i].UnitType, Price: data[i].Price, RequisAmount: data[i].RequisAmount, Total: parseInt(data[i].Price) * parseInt(data[i].RequisAmount), Date: data[i].Date })
                }
            }
            console.log(productAll);

            for (var i = 0; i < productAll.length; i++) {

                if (productAll[i].Location === "2,hexagon") {
                    countLocation += productAll[i].Total;

                }
            }
            console.log(countLocation);
            // console.table(data);

            // console.log(allProduct[0].split(",")[0]);

            var datatable = $('#totalCostShow').DataTable({
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

                "data": productAll,
                "columns": [
                    { "data": "Location" },
                    { "data": "ProductName" },
                    { "data": "UnitType" },
                    { "data": "Price" },
                    { "data": "RequisAmount" },
                    { "data": "Total" },
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
});