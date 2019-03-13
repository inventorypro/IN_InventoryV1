var totalCost = 0;
$(document).ready(function () {
    document.getElementById('btnUpdateApprove').style.visibility = 'hidden';
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
                if (data[i].RequisStatus.toLowerCase() === "unapprove" || data[i].RequisStatus.toLowerCase() === "approve" || data[i].RequisStatus.toLowerCase() === "finish") {
                } else {

                    console.table(data[i].Price);
                    totalCost += data[i].Price;
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
var sorted_arr;
var results;
var checkData = true;
var arrayDataV_RequisitionPACK = []
var resultsArrDataV_RequisitionPACK = [];
var allArrDataRequisitionPACK = [];
var allUnAppArrDataRequisitionPACK = [];
function btnCheckApproveRequis() {

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/V_RequisitionPACK",
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (dataV_RequisitionPACK) {
            console.log(dataV_RequisitionPACK);

            arrayDataV_RequisitionPACK = []
            for (var i = 0; i < dataV_RequisitionPACK.length; i++) {
                arrayDataV_RequisitionPACK.push(dataV_RequisitionPACK[i].ItemID);

            }


            var sorted_arr = arrayDataV_RequisitionPACK.slice().sort();;


            var distinct = (value, index, self) => {
                return self.indexOf(value) === index;
            }
            var results = sorted_arr.filter(distinct);
            // console.log(results);
            resultsArrDataV_RequisitionPACK = [];


            for (var i = 0; i < results.length; i++) {
                resultsArrDataV_RequisitionPACK.push(0000);
                for (var j = 0; j < dataV_RequisitionPACK.length; j++) {
                    if (results[i] === dataV_RequisitionPACK[j].ItemID) {
                        //console.log(results[i] + " " + dataV_RequisitionPACK[j].ItemID+ " "+j);
                        resultsArrDataV_RequisitionPACK[i] += dataV_RequisitionPACK[j].ItemAmount * dataV_RequisitionPACK[j].RequisAmount;
                        //console.log(dataV_RequisitionPACK[j].ItemAmount);
                    }
                }
            }

            allArrDataRequisitionPACK = [];
            for (var i = 0; i < results.length; i++) {
                allArrDataRequisitionPACK.push(results[i] + "," + resultsArrDataV_RequisitionPACK[i]);
            }



        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            // alert('check !');

        }

    }).done(function (dataV_RequisitionPACK) {
        $.ajax({

            type: "GET",
            url: "http://localhost:60443/api/IN_Product?sites=" + localStorage.logSite,
            dataType: 'json',
            headers: {
                'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
            },
            success: function (dataIN_Product) {
                var msgSuss = "";
                var checkingStatusApprove = true;
                allUnAppArrDataRequisitionPACK = [];
                console.log(allArrDataRequisitionPACK);
                for (var i = 0; i < allArrDataRequisitionPACK.length; i++) {
                    for (var j = 0; j < dataIN_Product.length; j++) {
                        if (parseInt(allArrDataRequisitionPACK[i].split(",")[0]) === dataIN_Product[j].ProductID) {
                            //  console.log(allArrDataRequisitionPACK[i].split(",")[0]);

                            // console.log(allArrDataRequisitionPACK[i].split(",")[1]);
                            if (parseInt(allArrDataRequisitionPACK[i].split(",")[1]) > dataIN_Product[j].Amount) {
                                allUnAppArrDataRequisitionPACK.push(parseInt(allArrDataRequisitionPACK[i].split(",")[0]));
                                msgSuss += dataIN_Product[j].ProductName + ", " + '\n'
                                checkingStatusApprove = false;
                                break;

                            }
                        }
                    }
                }
                if (checkingStatusApprove === true) {
                    alert("ตรวจสอบสำเร็จ");
                    document.getElementById('btnUpdateApprove').style.visibility = 'visible';
                    document.getElementById("btnApprove").disabled = false;
                    updateProductUnapproveApp();
                } else {
                    alert("ไม่สามารถอนุมัติได้เนืองจาก \n" + msgSuss + " ไม่เพียงพอ");
                    document.getElementById('btnUpdateApprove').style.visibility = 'visible';
                    document.getElementById("btnApprove").disabled = false;
                    updateProductUnapproveApp();
                }

            },
            error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                console.log("Add new Stockcard failed, error is '" + thrownError + "'");

            }

        });
    });

}
var checkingDataApporve = [];
function updateProductUnapprove() {
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/V_RequisitionPACK?RequisNumber=" + localStorage.logIDrequisViewPro,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (dataV_RequisitionPACK) {
            console.log(allUnAppArrDataRequisitionPACK)
            console.log(dataV_RequisitionPACK)
            checkingDataApporve = [];
            for (var i = 0; i < dataV_RequisitionPACK.length; i++) {
                for (var j = 0; j < allUnAppArrDataRequisitionPACK.length; j++) {
                    if (dataV_RequisitionPACK[i].ItemID === allUnAppArrDataRequisitionPACK[j]) {
                        checkingDataApporve.push(dataV_RequisitionPACK[i].RequisID);
                    }
                }
            }

            var sorted_arr = checkingDataApporve.slice().sort();;
            var distinct = (value, index, self) => {
                return self.indexOf(value) === index;
            }

            var results = sorted_arr.filter(distinct);
            console.log(results);

            var countUpdate = 1;

            for (var i = 0; i < results.length; i++) {
                countUpdate++;
                unapproveOneProduct(results[i], results.length, countUpdate);
            }

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            // alert('check !');

        }

    })

}

function unapproveOneProduct(id, maxLenghtUpdate, countUpdate) {
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

                },
                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                    // console.log("Add new product failed, error is '" + thrownError + "'");
                    alert("Approve failed, error is '" + thrownError + "'");
                }
            }).done(function (data) {
                $.ajax({

                    type: "GET",
                    url: "http://localhost:60443/api/V_RequisitionPACK?RequisNumber=" + localStorage.logIDrequisViewPro,
                    dataType: 'json',
                    headers: {
                        'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                    },

                    success: function (dataV) {
                        var countUpdate = 1;
                        var maxLenghtUpdate = 1;
                        for (var i = 0; i < dataV.length; i++) {
                            if (dataV[i].RequisStatus !== "unapprove") {
                                maxLenghtUpdate++;
                            }
                        }
                        for (var i = 0; i < dataV.length; i++) {
                            if (dataV[i].RequisStatus !== "unapprove") {
                                countUpdate++;
                                approveOneProduct(dataV[i].RequisID, maxLenghtUpdate, countUpdate)
                            }
                        }
                        
                    },
                    error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                        console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
                        // alert('check !');

                    }

                });
            });

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            // alert('check !');

        }
    });
}

function approveOneProduct(id, maxLenghtUpdate, countUpdate) {
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
                "RequisStatus": "approve",
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


function unapproveOneProductApp(id, maxLenghtUpdate, countUpdate) {
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


function updateProductUnapproveApp() {
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/V_RequisitionPACK?RequisNumber=" + localStorage.logIDrequisViewPro,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (dataV_RequisitionPACK) {
            console.log(allUnAppArrDataRequisitionPACK)
            console.log(dataV_RequisitionPACK)
            checkingDataApporve = [];
            for (var i = 0; i < dataV_RequisitionPACK.length; i++) {
                for (var j = 0; j < allUnAppArrDataRequisitionPACK.length; j++) {
                    if (dataV_RequisitionPACK[i].ItemID === allUnAppArrDataRequisitionPACK[j]) {
                        checkingDataApporve.push(dataV_RequisitionPACK[i].RequisID);
                    }
                }
            }

            var sorted_arr = checkingDataApporve.slice().sort();;
            var distinct = (value, index, self) => {
                return self.indexOf(value) === index;
            }

            var results = sorted_arr.filter(distinct);
            console.log(results);

            var countUpdate = 1;

            for (var i = 0; i < results.length; i++) {
                countUpdate++;
                unapproveOneProductApp(results[i], results.length, countUpdate);
            }

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            // alert('check !');

        }

    })

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

           

                    $.ajax({

                        type: "GET",
                        url: "http://localhost:60443/api/IN_ProductViewBarcode?RequisNumber=" + localStorage.logIDrequisViewPro,
                        dataType: 'json',
                        headers: {
                            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                        },
                
                        success: function (dataRequis) {
                
                      
                            var countAllApprove = 0;
                            
                            for (var i = 0; i < dataRequis.length; i++) {
                                countAllApprove++;
                                updateProductUnApproveAPI(dataRequis[i].RequisID, countAllApprove,dataRequis.length);
        
                            }
                        },
                        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
                            // alert('check !');
                
                        }
                
                    })

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

function updateProductUnApproveAPI(id, countAllApprove,allDataApprove) {
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

                    if (countAllApprove === allDataApprove) {
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