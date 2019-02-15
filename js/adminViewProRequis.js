var allIdProduct = [];
var allAmountProduct = [];
var allResultReqAmountProduct = [];
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
                if (data[i].RequisStatus.toLowerCase() === "unapprove") {

                } else {
                    allIdProduct[i] = data[i].ProductID;
                    allAmountProduct[i] = data[i].RequisAmount;
                }


            }

            btnApproveChecking();
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


    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Requisition/" + localStorage.logIDrequis,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {

            console.table(data.RequisNumber);

            $("#RequisNumber").text(data.RequisNumber);
            $("#RequisName").text(data.RequisName);
            $("#RequisLocation").text(data.RequisLocation);
            $("#ApproveName").text(data.ApproveName);
            $("#RequisDate").text(data.RequisDate);
            $("#ApproveDate").text(data.ApproveDate);
            $("#RequisPosition").text(data.RequisPosition);
            $("#RequisNote").text(data.RequisNote);
            $("#RequisNumber").text(data.RequisNumber);

            //  <h6>เลขที่ใบเบิก : </h6>RequisNumber
            //  <h6>ชื่อผู้เบิก : </h6>RequisName
            //  <h6>สถานที่นำไปใช้ : </h6>RequisLocation
            //  <h6>อนุมัติโดย : </h6>ApproveName

            //  <h6>วันที่เบิก : </h6>RequisDate
            //  <h6>ตำแหน่ง : </h6>RequisPosition
            //  <h6>หน่วยงาน / แผนก : </h6>RequisDept
            //  <h6>หมายเหตุ : </h6>RequisNote
            //  <h6>วันที่อนุมัติ : </h6>ApproveDate






        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            // alert('check !');

        }

    });


});
function btnApproveChecking() {
    console.log(allIdProduct);
    console.log(allAmountProduct);

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Product?sites=" + localStorage.logSite,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            var checking = "true";
            var productNameFalse = [];
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < allIdProduct.length; j++) {
                    if (data[i].ProductID === allIdProduct[j]) {
                        if (data[i].Amount < allAmountProduct[j]) {
                            checking = "false";
                            productNameFalse[j] = data[i].ProductName;
                            //alert(data[i].ProductName+"false");
                        } else {
                            allResultReqAmountProduct[j] = data[i].Amount - allAmountProduct[j];
                        }
                    }
                }
            }

            // console.log(checking);
            // console.log(productNameFalse);
            if (checking === "false") {
                alert(productNameFalse + " มีจำนวนสินค้าไม่เพียงพอ");
                document.getElementById("btnApprove").disabled = true;
            } else {
                alert("สามารถเบิกได้");
                document.getElementById("btnApprove").disabled = false;
            }

            return checking;

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");

        }

    });



}


function btnApprove() {
    console.log(allIdProduct);
    console.log(allAmountProduct);
    console.log(allResultReqAmountProduct);
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Product?sites=" + localStorage.logSite,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            var checking = "true";
            var productNameFalse = [];
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < allIdProduct.length; j++) {
                    if (data[i].ProductID === allIdProduct[j]) {
                        if (data[i].Amount < allAmountProduct[j]) {
                            checking = "false";
                            productNameFalse[j] = data[i].ProductName;
                            //alert(data[i].ProductName+"false");
                        } else {
                            allResultReqAmountProduct[j] = data[i].Amount - allAmountProduct[j];
                        }
                    }
                }
            }

            // console.log(checking);
            // console.log(productNameFalse);
            if (checking === "false") {
                alert(productNameFalse + " มีจำนวนสินค้าไม่เพียงพอ");
                document.getElementById("btnApprove").disabled = true;
            } else {
                document.getElementById("btnApprove").disabled = false;
                for (var i = 0; i < allIdProduct.length; i++) {
                    $.ajax({
                        type: "GET",
                        url: "http://localhost:60443/api/IN_Product/"+allIdProduct[i],
                        dataType: 'json',
                        headers: {
                            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                        },

                        success: function (data) {
                            console.log(data);
                            console.log(allAmountProduct);


                        },
                        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
                            // alert('check !');

                        }
                    });

                }



            }

            return checking;

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");

        }

    });



}

function checkAmountProduct(idProduct, ReqAmount) {

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Product/" + idProduct,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {



            //   console.log(checking);

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");

        }

    });


}
function viewNote(note) {
    document.getElementById("getNoteView").innerHTML = note;

}
function goBack() {
    window.history.back();
}

