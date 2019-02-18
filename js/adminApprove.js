var allIdProduct = [];
var allIdRequisProduct = [];
var allAmountProduct = [];
var allResultReqAmountProduct = [];
var totalCost = 0;
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
                    allIdProduct[i] = data[i].ProductID;
                    allAmountProduct[i] = data[i].RequisAmount;
                    allIdRequisProduct[i] = data[i].RequisID;
                    totalCost += parseInt(data[i].RequisAmount) * parseInt(data[i].Price);
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
                    { "data": "Date",  visible: false},
                    { "data": "ImgProduct", visible: false },
                    { "data": "UserID", visible: false },
                    { "data": "Barcode", },
                    { "data": "Location",  visible: false},
                    { "data": "RequisStatus", },
                    { "data": "RequisNumber", visible: false },
                    { "data": "EMP_EngName",  visible: false},
                    { "data": "Position",  visible: false}
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

            console.table(data.RequisNumber);
        
            $("#RequisNumber").text(data.RequisNumber);
            $("#RequisName").text(data.RequisName);
            $("#RequisLocation").text(data.RequisLocation);
            $("#ApproveName").text(data.ApproveName);
            $("#RequisDate").text(data.RequisDate);
            $("#ApproveDate").text(data.ApproveDate);
            $("#RequisPosition").text(data.RequisPosition);
            $("#RequisDept").text(data.RequisPosition);
            $("#RequisNote").text(data.RequisNote);
            $("#TotalCost").text(data.TotalCost);

            
            $("#RequisNumberPrint").text(data.RequisNumber);
            $("#RequisNamePrint").text(data.RequisName);
            $("#RequisLocationPrint").text(data.RequisLocation);
            $("#ApproveNamePrint").text(data.ApproveName);
            $("#RequisDatePrint").text( moment(data.RequisDate).format('DD-MM-YYYY HH:mm:ss'));
            $("#ApproveDatePrint").text(data.ApproveDate);
            $("#RequisPositionPrint").text(data.RequisPosition);
            $("#RequisDeptPrint").text(data.RequisPosition);
            $("#RequisNotePrint").text(data.RequisNote);
            $("#TotalCostPrint").text(data.TotalCost);
      

            /////Check data
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
                                    // allResultReqAmountProduct[j] = data[i].Amount - allAmountProduct[j];
                                }
                            }
                        }
                    }

                    // console.log(checking);
                    // console.log(productNameFalse);
                    if (checking === "false") {
                        //alert(productNameFalse + " มีจำนวนสินค้าไม่เพียงพอ");
                        document.getElementById("btnApprove").disabled = true;
                    } else if (allIdProduct.length === 0) {
                        document.getElementById("btnApprove").disabled = true;
                    } else {
                        //alert("สามารถเบิกได้");
                        document.getElementById("btnApprove").disabled = false;
                    }

                    return checking;

                },
                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                    console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");

                }

            });


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



function btnApproveChecking() {
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

                        } else {

                        }
                    }
                }
            }
            if (checking === "false") {
                alert(productNameFalse + " มีจำนวนสินค้าไม่เพียงพอ");
                document.getElementById("btnApprove").disabled = true;
            } else if (allIdProduct.length === 0) {
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
                        if (data[i].Amount < allAmountProduct[j] || data[i].ProductStatus === "false") {
                            checking = "false";
                            productNameFalse[j] = data[i].ProductName;
                            //alert(data[i].ProductName+"false");
                        } else {
                            // allResultReqAmountProduct[j] = data[i].Amount - allAmountProduct[j];
                        }
                    }
                }
            }
            // console.log(checking);
            // console.log(productNameFalse);
            if (checking === "false") {
                alert(productNameFalse + "มีจำนวนสินค้าไม่เพียงพอหรือสินค้าบางรายการไม่อนุญาติให้ทำการเบิก");
                document.getElementById("btnApprove").disabled = true;
            } else if (allIdProduct.length === 0) {
                document.getElementById("btnApprove").disabled = true;
            } else {
                addToRequis();
                var countI = 1;
                for (var i = 0; i < allIdRequisProduct.length; i++) {
                  
                    getAmountProduct(allIdProduct[i], allAmountProduct[i], allIdRequisProduct[i],countI)
                    countI++;
                }
            

                document.getElementById("btnApprove").disabled = false;
            }



        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");

        }

    });

}

function addToRequis() {
    $.ajax({
        type: "GET",
        url: "http://localhost:60443/api/IN_Requisition/" + localStorage.logIDrequis,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            var now = new Date();
            var setDateNow = moment(now).format('YYYY-MM-DD HH:mm:ss');
            var formdataReq = {
                "RequisID": data.RequisID,
                "RequisName": data.RequisName,
                "RequisPosition": data.RequisPosition,
                "RequisDept": data.RequisDept,
                "RequisLocation": data.RequisLocation,
                "RequisNote": data.RequisNote,
                "RequisDate": data.RequisDate,
                "ApproveID": localStorage.logUsername,
                "ApproveName": localStorage.getMyUsername,
                "ApproveDate": setDateNow,
                "RequisNumber": data.RequisNumber,
                "TotalCost": totalCost,
                "UserID": data.UserID,
                "SITES": data.SITES,
                "RequisStatus": "approve"
            }
            $.ajax({
                type: "PUT",
                url: "http://localhost:60443/api/IN_Requisition/" + localStorage.logIDrequis,
                dataType: 'json',
                data: formdataReq,
                headers: {
                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                },
                success: function (data) {
                    console.log(totalCost);
                    console.log(allIdProduct);
                    console.log(allIdRequisProduct);
                    console.log(allAmountProduct);

                },
                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                    // console.log("Add new product failed, error is '" + thrownError + "'");
                    alert("Approve failed, error is '" + thrownError + "'");
                }
            });

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            // alert('check !');

        }
    });

}



function getAmountProduct(id, amount, RequisProduct,countI) {
    $.ajax({
        type: "GET",
        url: "http://localhost:60443/api/IN_Product/" + id,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {

            var formdataProduct = {
                ProductID: id,
                ProductName: data.ProductName,
                Category: data.Category,
                UnitType: data.UnitType,
                Price: data.Price,
                MinValue: data.MinValue,
                MaxValue: data.MaxValue,
                Barcode: data.Barcode,
                Vender: data.Vender,
                Place: data.Place,
                ProductStatus: data.ProductStatus,
                ImgProduct: data.ImgProduct,
                Amount: parseInt(data.Amount) - parseInt(amount),
                SITES: data.SITES
            }
            $.ajax({

                type: "PUT",
                url: "http://localhost:60443/api/IN_Product/" + id,
                dataType: 'json',
                data: formdataProduct,
                headers: {
                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                },
                success: function (data) {

                    $.ajax({
                        type: "GET",
                        url: "http://localhost:60443/api/IN_ProductRequis/" + RequisProduct,
                        dataType: 'json',
                        headers: {
                            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                        },

                        success: function (data) {
                            var formdataReqProduct = {
                                "RequisID": data.RequisID,
                                "ProductID": data.ProductID,
                                "Category": data.Category,
                                "ProductName": data.ProductName,
                                "Price": data.Price,
                                "UnitType": data.UnitType,
                                "Balance": data.Balance,
                                "RequisAmount": data.RequisAmount,
                                "RequisNote": data.RequisNote,
                                "Date": data.Date,
                                "ImgProduct": data.ImgProduct,
                                "UserID": data.UserID,
                                "Barcode": data.Barcode,
                                "Location": data.Location,
                                "RequisStatus": "approve",
                                "RequisNumber": data.RequisNumber,
                                "EMP_EngName": data.EMP_EngName,
                                "Position": data.Position

                            }

                            $.ajax({

                                type: "PUT",
                                url: "http://localhost:60443/api/IN_ProductRequis/" + RequisProduct,
                                dataType: 'json',
                                data: formdataReqProduct,
                                headers: {
                                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                                },
                                success: function (data) {
                                    console.log(countI);
                                    console.log( allIdRequisProduct.length);
                                    if (countI === allIdRequisProduct.length) {
                                        alert("เบิกสำเร็จ");
                                        location.reload();
                             
                                    }
                                
                                },
                                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                                    // console.log("Add new product failed, error is '" + thrownError + "'");
                                    alert("Requis product failed, error is '" + thrownError + "'");
                                }
                            });

                        },
                        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
                            // alert('check !');

                        }
                    });




                },
                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                    // console.log("Add new product failed, error is '" + thrownError + "'");
                    alert("Cal product failed, error is '" + thrownError + "'");
                }
            
            });



        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            // alert('check !');

        }
    });



}

function btnPrint() {
    window.print();
}

