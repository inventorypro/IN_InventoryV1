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
            for (var i = 0; i < data.length; i++) {
                if (data[i].RequisStatus.toLowerCase() === "unapprove" || data[i].RequisStatus.toLowerCase() === "approve") {

                } else {

                }


            }


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
                // document.getElementById("btnCheckingApprove").disabled = true;
                // document.getElementById("btnUpdateApprove").disabled = true;
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
