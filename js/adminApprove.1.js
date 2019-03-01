var allDataApprove = [];
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
            checkApproveRequis();

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
            if(data.RequisStatus === "unapprove"){
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

function approveRequis() {
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

                    console.log(checkAmountInProduct.length);
                    var countAllApprove = 0;
                    for (var i = 0; i < allDataApprove.length; i++) {
                        countAllApprove++;
                        updateProductApproveAPI(allDataApprove[i].RequisID, countAllApprove);
                       
                    }

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
function btnCheckApproveRequis() {

    console.table(allDataApprove);
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Product?sites=" + localStorage.logSite,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            var countChecking = 0;
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < allDataApprove.length; j++) {

                    if (data[i].ProductID === allDataApprove[j].ProductID) {

                        if (allDataApprove[j].Category.toLowerCase() === "package") {
                            console.log(allDataApprove[j].ProductID);
                            checkApproveRequisPackage(allDataApprove[j].ProductID);
                            console.log(checkNameProductINPackage.length);
                            if (checkNameProductINPackage.length > 0) {

                                checkAmountInProduct[countChecking] = "false," + allDataApprove[j].RequisID + "," + allDataApprove[j].ProductName
                                countChecking++;
                            } else {
                                if (data[i].Amount < allDataApprove[j].RequisAmount || data[i].ProductStatus === "false") {
                                    checkAmountInProduct[countChecking] = "false," + allDataApprove[j].RequisID + "," + allDataApprove[j].ProductName
                                } else {
                                    checkAmountInProduct[countChecking] = "true," + allDataApprove[j].RequisID + "," + allDataApprove[j].ProductName
                                    // alert("True");
                                }
                                countChecking++;
                            }


                        } else {
                            if (data[i].Amount < allDataApprove[j].RequisAmount || data[i].ProductStatus === "false") {
                                checkAmountInProduct[countChecking] = "false," + allDataApprove[j].RequisID + "," + allDataApprove[j].ProductName
                            } else {
                                checkAmountInProduct[countChecking] = "true," + allDataApprove[j].RequisID + "," + allDataApprove[j].ProductName
                                // alert("True");
                            }
                            countChecking++;
                        }


                    }
                    // console.log("x");
                }
            }
            var msgCheckApprove = "";
            for (var i = 0; i < checkAmountInProduct.length; i++) {
                if (checkAmountInProduct[i].split(",")[0] === "false") {

                    for (var ei = 0; ei < checkAmountInProduct.length; ei++) {
                        if (checkAmountInProduct[ei].split(",")[0] === "false") {

                            msgCheckApprove += "ไม่สามารถเบิก" + checkAmountInProduct[ei].split(",")[2] +"\n" ;
                            // alert(msgCheckApprove + " ");

                        } else {


                        }
                    }
                    if (checkNameProductINPackage.length > 0) {
                        msgCheckApprove +="สินค้าใน Package มีจำนวนไม่เพียงพอ(" + checkNameProductINPackage + ")";
                       
    
                    }
                    // location.reload();
                    document.getElementById("btnApprove").disabled = true;
                    checkNameProductINPackage = [];

                    break;
                } else {
                    msgCheckApprove = "สามารถเบิก"
                    // location.reload();
                    document.getElementById("btnApprove").disabled = false;
                }
            }



            if (msgCheckApprove === "สามารถเบิก") {

                alert(msgCheckApprove);
            }else{
                alert(msgCheckApprove);
              
            }



        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });


    console.log(checkAmountInProduct);
}

var checkAmountInProduct = [];
function checkApproveRequis() {
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Product?sites=" + localStorage.logSite,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            var countChecking = 0;
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < allDataApprove.length; j++) {

                    if (data[i].ProductID === allDataApprove[j].ProductID) {

                        if (allDataApprove[j].Category.toLowerCase() === "package") {
                            console.log(allDataApprove[j].ProductID);
                            // checkApproveRequisPackage(allDataApprove[j].ProductID);


                            $.ajax({

                                type: "GET",
                                url: "http://localhost:60443/api/IN_ProductInPackage?productID=" + allDataApprove[j].ProductID,
                                dataType: 'json',
                                headers: {
                                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                                },
                                success: function (data) {
                                    console.log(data);
                                    $.ajax({

                                        type: "GET",
                                        url: "http://localhost:60443/api/IN_Product?sites=" + localStorage.logSite,
                                        dataType: 'json',
                                        headers: {
                                            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                                        },
                                        success: function (dataP) {
                                            console.log(data);
                                            var countCheckProductInPack = 0;
                                            for (var i = 0; i < data.length; i++) {
                                                for (var j = 0; j < data.length; j++) {

                                                    if (data[i].PackProductID === dataP[j].ProductID) {
                                                        if (data[i].Amount > dataP[j].Amount || dataP[j].ProductStatus === "false") {
                                                            checkNameProductINPackage[countCheckProductInPack] = dataP[j].ProductName;
                                                            countCheckProductInPack++;

                                                        }


                                                    }
                                                }
                                            }


                                            console.log(checkNameProductINPackage.length);
                                            if (checkNameProductINPackage.length > 0) {
                                                document.getElementById("btnApprove").disabled = true;

                                            } else {
                                                document.getElementById("btnApprove").disabled = false;
                                                document.getElementById('btnCheckingApprove').style.visibility = 'hidden';
                                                document.getElementById('btnUpdateApprove').style.visibility = 'hidden';
                                            }
                                        },
                                        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                                            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
                                            //alert("Add new product failed, error is '" + thrownError + "'");
                                        }

                                    });

                                },
                                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                                    console.log("Add new Stockcard failed, error is '" + thrownError + "'");
                                    //alert("Add new product failed, error is '" + thrownError + "'");
                                }

                            });



                            //*************************** */

                            if (checkNameProductINPackage.length > 0) {

                                checkAmountInProduct[countChecking] = "false," + allDataApprove[j].RequisID + "," + allDataApprove[j].ProductName
                                countChecking++;
                            } else {
                                if (data[i].Amount < allDataApprove[j].RequisAmount || data[i].ProductStatus === "false") {
                                    checkAmountInProduct[countChecking] = "false," + allDataApprove[j].RequisID + "," + allDataApprove[j].ProductName
                                } else {
                                    checkAmountInProduct[countChecking] = "true," + allDataApprove[j].RequisID + "," + allDataApprove[j].ProductName
                                    // alert("True");
                                }
                                countChecking++;
                            }


                        } else {
                            if (data[i].Amount < allDataApprove[j].RequisAmount || data[i].ProductStatus === "false") {
                                checkAmountInProduct[countChecking] = "false," + allDataApprove[j].RequisID + "," + allDataApprove[j].ProductName
                            } else {
                                checkAmountInProduct[countChecking] = "true," + allDataApprove[j].RequisID + "," + allDataApprove[j].ProductName
                                // alert("True");
                            }
                            countChecking++;
                        }
                    }
                    // console.log("x");
                }
            }

            for (var i = 0; i < checkAmountInProduct.length; i++) {
                if (checkAmountInProduct[i].split(",")[0] === "false") {
                    document.getElementById("btnApprove").disabled = true;

                    break;
                } else {

                    document.getElementById("btnApprove").disabled = false;
                    document.getElementById('btnCheckingApprove').style.visibility = 'hidden';
                    document.getElementById('btnUpdateApprove').style.visibility = 'hidden';
                }
            }


        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });

}
var checkNameProductINPackage = [];
function checkApproveRequisPackage(id) {


    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductInPackage?productID=" + id,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.log(data);
            $.ajax({

                type: "GET",
                url: "http://localhost:60443/api/IN_Product?sites=" + localStorage.logSite,
                dataType: 'json',
                headers: {
                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                },
                success: function (dataP) {
                    console.log(data);
                    var countCheckProductInPack = 0;
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < data.length; j++) {

                            if (data[i].PackProductID === dataP[j].ProductID) {
                                if (data[i].Amount > dataP[j].Amount || dataP[j].ProductStatus === "false") {
                                    checkNameProductINPackage[countCheckProductInPack] = data[i].ProductName;
                                    countCheckProductInPack++;

                                }


                            }
                        }
                    }




                },
                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                    console.log("Add new Stockcard failed, error is '" + thrownError + "'");
                    //alert("Add new product failed, error is '" + thrownError + "'");
                }

            });

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });

    return checkNameProductINPackage;

}

function updateProductUnapprove() {
    // checkAmountInProduct
    var countUpdate = 1;
    var maxLenghtUpdate = 1;
    console.log(checkAmountInProduct.length);
    for (var i = 0; i < checkAmountInProduct.length; i++) {
        if (checkAmountInProduct[i].split(",")[0] === "false") {

            maxLenghtUpdate++;
        }
    }

    for (var i = 0; i < checkAmountInProduct.length; i++) {
        if (checkAmountInProduct[i].split(",")[0] === "false") {
            countUpdate++;
            updateProductUnapproveAPI(checkAmountInProduct[i].split(",")[1], maxLenghtUpdate, countUpdate);
          
        }
    }
}

function updateProductUnapproveAPI(id, maxLenghtUpdate, countUpdate) {
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductRequis/" + id,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.log(data);
            var updateIDPdRq = data.RequisID;
            var formdata = {
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
                "RequisStatus": "unapprove",
                "RequisNumber": data.RequisNumber,
                "EMP_EngName": data.EMP_EngName,
                "Position": data.Position
            }

            $.ajax({

                type: "PUT",
                url: "http://localhost:60443/api/IN_ProductRequis/" + updateIDPdRq,
                dataType: 'json',
                data: formdata,
                headers: {
                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                },
                success: function (datax) {
                    console.log(datax);
                    if (countUpdate === maxLenghtUpdate) {
                        location.reload();
                    }

                },
                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                    console.log("Add new Stockcard failed, error is '" + thrownError + "'");
                    //alert("Add new product failed, error is '" + thrownError + "'");
                }

            });

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });
}


function updateProductApproveAPI(id,countAllApprove) {
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductRequis/" + id,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.log(data);

            var formdata = {
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
                url: "http://localhost:60443/api/IN_ProductRequis/" + id,
                dataType: 'json',
                data: formdata,
                headers: {
                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                },
                success: function (data) {
                    console.log(data);

                    if (countAllApprove === allDataApprove.length) {
                        location.reload();
                    }
                },
                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                    console.log("Add new Stockcard failed, error is '" + thrownError + "'");
                    //alert("Add new product failed, error is '" + thrownError + "'");
                }

            });

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });
}


function unapproveRequis() {
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
                "RequisStatus": "unapprove"
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

                    console.log(checkAmountInProduct.length);
                    var countAllApprove = 0;
                    for (var i = 0; i < allDataApprove.length; i++) {
                        countAllApprove++;
                        updateProductUnApproveAPI(allDataApprove[i].RequisID, countAllApprove);
                       
                    }

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

function updateProductUnApproveAPI(id,countAllApprove) {
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductRequis/" + id,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.log(data);

            var formdata = {
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
                "RequisStatus": "unapprove",
                "RequisNumber": data.RequisNumber,
                "EMP_EngName": data.EMP_EngName,
                "Position": data.Position
            }

            $.ajax({

                type: "PUT",
                url: "http://localhost:60443/api/IN_ProductRequis/" + id,
                dataType: 'json',
                data: formdata,
                headers: {
                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                },
                success: function (data) {
                    console.log(data);

                    if (countAllApprove === allDataApprove.length) {
                        location.reload();
                    }
                },
                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                    console.log("Add new Stockcard failed, error is '" + thrownError + "'");
                    //alert("Add new product failed, error is '" + thrownError + "'");
                }

            });

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });
}