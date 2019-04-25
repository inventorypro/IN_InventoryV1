// function callAPI(){


//     $.ajax({

//         type: "GET",
//         url: "http://localhost:60443/api/IN_ProductRequis?userID=all&RequisStatus=all",
//         dataType: 'json',
//         headers: {
//             'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
//         },

//         success: function (data) {
//             console.log(data);

//         },
//         error: function (jqXHR, xhr, ajaxOptions, thrownError) {
//             console.log("Your can't View, error is '" + thrownError + "'");
//             //window.location.href = "index.html";
//         }
//     });
// }



//Balance Report
$(document).ready(function () {
    console.log(localStorage.logSite);
    // var pageLength = 10;
    // function pageLength() {
    //     pageLength = $('#addProductName').val();
    // }
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Product?sites=" + localStorage.logSite,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                // productBalance.push({ ProductName: data[i].ProductName, Amount: data[i].Amount })
                // if (data[i].Amount <= data[i].MinValue && data[i].Amount != 0) {
                // }
            }
            console.log(data);

            // console.log(allProduct[0].split(",")[0]);

            var datatable = $('#balanceShow').DataTable({
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

                "data": data,
                "columns": [
                    { "data": "ProductID" },
                    { "data": "ProductName" },
                    { "data": "UnitType" },
                    { "data": "Price" },
                    { "data": "Amount" },
                    { "data": "Category" },
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

//Requis Report
var requisProductAll = [];
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
                    requisProductAll.push({ RequisName: data[i].EMP_EngName, Position: data[i].Position, Location: data[i].Location, ProductID: data[i].ProductID, ProductName: data[i].ProductName, Category: data[i].Category, UnitType: data[i].UnitType, Price: data[i].Price, RequisAmount: data[i].RequisAmount, Date: data[i].Date })
                }
            }
            console.log(requisProductAll)


            // console.log(productRequisAll.reverse());
            // console.table(data);

            // console.log(allProduct[0].split(",")[0]);

            var datatable = $('#requisShow').DataTable({
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

                "data": requisProductAll,
                "columns": [
                    { "data": "RequisName" },
                    { "data": "Position" },
                    { "data": "Location" },
                    { "data": "ProductName" },
                    { "data": "UnitType" },
                    { "data": "Price" },
                    { "data": "RequisAmount" },
                    { "data": "Date" }
                ]
            });
            // for (var i = 0; i <= data.length; i++) {
            //     $(".getMyProduct").append("<p>" + data[i].ProductID + "</p>");
            // }
        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            // alert('check !');
        }
    });
});

//Low product Report

var lowProductAll = [];

$(document).ready(function () {
    //console.log(localStorage.logSite);
    // var pageLength = 10;
    // function pageLength() {
    //     pageLength = $('#addProductName').val();
    // }
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Product?sites=" + localStorage.logSite,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            for (var i = 0; i < data.length; i++) {

                if (data[i].Amount <= data[i].MinValue && data[i].Amount != 0) {
                    lowProductAll.push({ ProductID: data[i].ProductID, ProductName: data[i].ProductName, UnitType: data[i].UnitType, Price: data[i].Price, MinValue: data[i].MinValue, Amount: data[i].Amount, Category: data[i].Category })
                }
            }
            console.log(lowProductAll);

            // console.log(allProduct[0].split(",")[0]);

            var datatable = $('#lowProductShow').DataTable({
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

                "data": lowProductAll,
                "columns": [
                    { "data": "ProductID" },
                    { "data": "ProductName" },
                    { "data": "UnitType" },
                    { "data": "Price" },
                    { "data": "MinValue" },
                    { "data": "Amount" },
                    { "data": "Category" },
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

//Out stock Report

var outStockProduct = [];

$(document).ready(function () {
    console.log(localStorage.logSite);
    // var pageLength = 10;
    // function pageLength() {
    //     pageLength = $('#addProductName').val();
    // }
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Product?sites=" + localStorage.logSite,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            for (var i = 0; i < data.length; i++) {

                if (data[i].Amount === 0) {
                    outStockProduct.push({ ProductID: data[i].ProductID, ProductName: data[i].ProductName, UnitType: data[i].UnitType, Price: data[i].Price, Amount: data[i].Amount, Category: data[i].Category })
                }
            }
            console.log(outStockProduct);

            // console.log(allProduct[0].split(",")[0]);

            var datatable = $('#outStockShow').DataTable({
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

                "data": outStockProduct,
                "columns": [
                    { "data": "ProductID" },
                    { "data": "ProductName" },
                    { "data": "UnitType" },
                    { "data": "Price" },
                    { "data": "Amount" },
                    { "data": "Category" },
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

