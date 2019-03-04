var allDataApprove = [];
var totalCost = 0;
var countArryAllDataApprove = 0;
$(document).ready(function () {

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductViewBarcode?RequisNumber=" + localStorage.logIDrequisViewPro,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {

            // console.table(data);
            // var countArryAllDataApprove = 0;
            // for (var i = 0; i < data.length; i++) {
            //     if (data[i].RequisStatus.toLowerCase() === "unapprove" || data[i].RequisStatus.toLowerCase() === "approve" || data[i].RequisStatus.toLowerCase() === "finish") {
            //         console.table(data[i]);
            //     } else {
            //         allDataApprove[countArryAllDataApprove] = data[i];
            //         totalCost += data[i].Price;
            //         countArryAllDataApprove++;
            //     }


            // }


            // console.table(allDataApprove);
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
                "order": [[0, 'desc']], //asc|desc
                "data": data,
                "columns": [
                    { "data": "RequisID", visible: false },
                    { "data": "ProductID", },
                    { "data": "Category", },
                    { "data": "ProductName", },
                    { "data": "Price", },
                    { "data": "UnitType", },
                    { "data": "Balance", },
                    { "data": "RequisAmount", },
                    { "data": "RequisNote", },
                    { "data": "Date", visible: false },
                    { "data": "ImgProduct", visible: false },
                    { "data": "UserID", visible: false },
                    { "data": "Barcode", },
                    { "data": "Location", visible: false },
                    { "data": "RequisStatus", },
                    { "data": "RequisNumber", visible: false },
                    { "data": "EMP_EngName", visible: false },
                    { "data": "Position", visible: false }
                ]




            });

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            // alert('check !');

        }

    });


    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Requisition/" + localStorage.logIDrequis,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {

            if (data.RequisStatus === "approve") {
                document.getElementById('btnApprove').style.visibility = 'hidden';
                document.getElementById('btnCheckingApprove').style.visibility = 'hidden';
                document.getElementById('btnUpdateApprove').style.visibility = 'hidden';
                document.getElementById('btnUnapprove').style.visibility = 'hidden';
                // document.getElementById("btnCheckingApprove").disabled = true;
                // document.getElementById("btnUpdateApprove").disabled = true;
            }
            if (data.RequisStatus === "unapprove") {
                document.getElementById('btnApprove').style.visibility = 'hidden';
                document.getElementById('btnCheckingApprove').style.visibility = 'hidden';
                document.getElementById('btnUpdateApprove').style.visibility = 'hidden';
                document.getElementById('btnUnapprove').style.visibility = 'hidden';
            }

            console.table(data.RequisNumber);

            $("#RequisNumber").text(data.RequisNumber);
            $("#RequisName").text(data.RequisName);
            $("#RequisLocation").text(data.RequisLocation);
            $("#ApproveName").text(data.ApproveName);
            $("#RequisDate").text(data.RequisDate);
            $("#ApproveDate").text(data.ApproveDate);
            $("#RequisPosition").text(data.RequisPosition);
            $("#RequisDept").text(data.RequisDept);
            $("#ApproveStatus").text(data.RequisStatus);
            $("#RequisNote").text(data.RequisNote);
            $("#TotalCost").text(data.TotalCost);


            $("#RequisNumberPrint").text(data.RequisNumber);
            $("#RequisNamePrint").text(data.RequisName);
            $("#RequisLocationPrint").text(data.RequisLocation);
            $("#ApproveNamePrint").text(data.ApproveName);
            $("#RequisDatePrint").text(moment(data.RequisDate).format('DD-MM-YYYY HH:mm:ss'));
            $("#ApproveDatePrint").text(data.ApproveDate);
            $("#RequisPositionPrint").text(data.RequisPosition);
            $("#RequisDeptPrint").text(data.RequisDept);
            $("#RequisNotePrint").text(data.RequisNote);
            $("#TotalCostPrint").text(data.TotalCost);


        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            // alert('check !');

        }

    });




});



function viewNote(note) {
    document.getElementById("getNoteView").innerHTML = note;

}
function goBack() {
    window.history.back();
}

function btnPrint() {
    window.print();
}

function getDataCheckProductApprove(id,amount,category) {
if(category.toLowerCase()  === "package"){
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductInPackage?productID=" + id,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {

            console.log(data);
        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });
}


}

function checkDataBfApprove() {
    var allDataProduct = [];
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Product?sites=" + localStorage.logSite,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {


            for (var i = 0; i < data.length; i++) {
                allDataProduct[i] = data[i];
            }


            $.ajax({

                type: "GET",
                url: "http://localhost:60443/api/IN_ProductViewBarcode?RequisNumber=" + localStorage.logIDrequisViewPro,
                dataType: 'json',
                headers: {
                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                },
                success: function (data) {
                    var countArryAllDataApprove = 0;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].RequisStatus.toLowerCase() === "unapprove" || data[i].RequisStatus.toLowerCase() === "approve" || data[i].RequisStatus.toLowerCase() === "finish") {
                            console.table(data[i]);
                        } else {

                            allDataApprove[countArryAllDataApprove] = data[i];
                            totalCost += data[i].Price;
                            countArryAllDataApprove++;
                        }


                    }

                    for (var i = 0; i < allDataProduct.length; i++) {
                        console.log(allDataApprove[i]);
                        if(allDataProduct.length-1 === i){
                            for(var j = 0; j < allDataApprove.length; j++){
                                getDataCheckProductApprove(allDataApprove[j].ProductID, allDataApprove[j].RequisAmount, allDataApprove[j].Category);
                            }
                        
                        }
                    }


                },
                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                    console.log("Failed, error is '" + thrownError + "'");
                    //alert("Add new product failed, error is '" + thrownError + "'");
                }

            });



        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });


}


