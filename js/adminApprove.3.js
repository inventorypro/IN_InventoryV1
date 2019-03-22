var totalCost = 0;
var allIDproductLocation = [];
var myRequisLocation;

var datatable;
var dataLoadPage = []
$(document).ready(function () {
    document.getElementById('btnUpdateApprove').style.visibility = 'hidden';

    // document.getElementById("btnApprove").disabled = false;


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
                    allIDproductLocation.push(data[i].ProductID);
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
            myRequisLocation = data.RequisLocation.split(",")[1]

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
            if (data.RequisStatus.toLowerCase() === "verify") {

                document.getElementById("btnApprove").disabled = false;
                document.getElementById('btnCheckingApprove').style.visibility = 'hidden';
            }

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
        url: "http://localhost:60443/api/V_RequisitionPACK?RequisNumber=" + localStorage.logIDrequisViewPro,
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
                        console.log(dataV_RequisitionPACK[j].ItemAmount + " " + dataV_RequisitionPACK[j].RequisAmount + " " + j);
                        if (dataV_RequisitionPACK[j].Category.toLowerCase() === "package") {
                            resultsArrDataV_RequisitionPACK[i] += dataV_RequisitionPACK[j].ItemAmount * dataV_RequisitionPACK[j].RequisAmount;
                        } else {
                            resultsArrDataV_RequisitionPACK[i] += dataV_RequisitionPACK[j].ItemAmount;
                        }

                        console.log(resultsArrDataV_RequisitionPACK[i]);
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
                    // alert("ตรวจสอบสำเร็จ");
                    // document.getElementById('btnUpdateApprove').style.visibility = 'visible';




                    checkInLocation();
                    updateProductUnapproveApp();

                } else {
                    alert("ไม่สามารถอนุมัติได้เนืองจาก \n" + msgSuss + " ไม่เพียงพอ");
                    // document.getElementById('btnUpdateApprove').style.visibility = 'visible';




                    checkInLocation();
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
        url: "http://localhost:60443/api/IN_ProductRequis/",
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
    var countAllApproveProduct = 0;
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductViewBarcode?RequisNumber=" + localStorage.logIDrequisViewPro,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            countAllApproveProduct = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].RequisStatus.toLowerCase() === "unapprove" || data[i].RequisStatus.toLowerCase() === "approve" || data[i].RequisStatus.toLowerCase() === "finish") {
                } else {
                    countAllApproveProduct++;
                }
            }

            console.log(countAllApproveProduct);
        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            // alert('check !');

        }

    }).done(function () {
        if (countAllApproveProduct === 0) {
            alert("ไม่สามารถเบิกได้");
        } else {
            $.ajax({
                type: "GET",
                url: "http://localhost:60443/api/IN_Requisition/" + localStorage.logIDrequis,
                dataType: 'json',
                headers: {
                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                },

                success: function (data) {
                    localStorage.setItem("logCalRequisNumber", data.RequisNumber);
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
                                        // console.log(approveOneProduct(dataV[i].RequisID, maxLenghtUpdate, countUpdate));

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
                            // location.reload(); //-*-
                            calAmountPD()
                            
                        }else{
                            
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

function calAmountPD() {
    var results2 = [];
    console.log(localStorage.logCalRequisNumber);
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/V_RequisitionPACK?RequisNumber=" + localStorage.logCalRequisNumber,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.log(data);
            var countMaxCal = 0;
            var numFnCal = 0;
            for (var i = 0; i < data.length; i++) {
                // console.log(data[i].RequisStatus.toLowerCase());
                console.log(data[i].Category);
                if (data[i].RequisStatus.toLowerCase() !== "unapprove") {
                    countMaxCal++;

                }

            }
            var arrPutCalAmount = []
            for (var i = 0; i < data.length; i++) {
                // console.log(data[i].RequisStatus.toLowerCase());
                // console.log(data[i].Category);
                if (data[i].RequisStatus.toLowerCase() !== "unapprove") {
                    if (data[i].Category === "PACKAGE") {
                        console.log(data[i].RequisAmount * data[i].ItemAmount);
                        var result = data[i].RequisAmount * data[i].ItemAmount;
                        numFnCal++;
                        arrPutCalAmount.push(data[i].ProductID);
                        arrPutCalAmount.push(data[i].ItemID);
                        // putCalAmount(data[i].ItemID,result, countMaxCal, numFnCal);

                    } else {
                        console.log(data[i].ProductName);
                        console.log(data[i].ItemAmount);
                        numFnCal++;
                        arrPutCalAmount.push(data[i].ItemID);
                        // putCalAmount(data[i].ItemID, data[i].ItemAmount, countMaxCal, numFnCal);

                    }

                }

            }
            console.log(arrPutCalAmount);
            var sorted_arr = arrPutCalAmount.slice().sort();;
            var distinct = (value, index, self) => {
                return self.indexOf(value) === index;
            }

            var results = sorted_arr.filter(distinct);
            console.log(results);
            results2 = [];
            var num = 0;
            var count = 0;
            for (var i = 0; i < results.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (results[i] === data[j].ItemID && data[j].Category.toLowerCase() === "package") {
                        count += data[j].ItemAmount * data[j].RequisAmount
                        results2[num] = results[i] + "," + count;
                    } else if (results[i] === data[j].ItemID && data[j].Category.toLowerCase() !== "package") {
                        count += data[j].ItemAmount
                        results2[num] = results[i] + "," + count;
                    } else if (results[i] === data[j].ProductID && data[j].Category.toLowerCase() === "package") {
                        count = data[j].RequisAmount
                        results2[num] = results[i] + "," + count;
                    }


                }
                count = 0;
                num++;
            }
            console.log(results2);



            // for (var i = 0; i < results.length; i++) {
            //     console.log(results[i].split(",")[0]+"x"+ results[i].split(",")[1]);
            //     putCalAmount(results[i].split(",")[0], results[i].split(",")[1]);
            // }


        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    }).done(function (data) {
        var countRow = 0;

        results2.forEach(function (element) {
            console.log(element.split(",")[0] + "x" + element.split(",")[1]);
            countRow++;
            putCalAmount(element.split(",")[0], element.split(",")[1], results2.length, countRow);

        });
    })
}





function putCalAmount(id, reqAmount, countlength, countRow) {

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Product/" + id,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {



            var formdata = {
                "ProductID": data.ProductID,
                "Barcode": data.Barcode,
                "ProductName": data.ProductName,
                "Category": data.Category,
                "Price": data.Price,
                "UnitType": data.UnitType,
                "MinValue": data.MinValue,
                "MaxValue": data.MaxValue,
                "Amount": parseInt(data.Amount) - parseInt(reqAmount),
                "Vender": data.Vender,
                "ProductStatus": data.ProductStatus,
                "ImgProduct": data.ImgProduct,
                "SITES": data.SITES,
                "Place": data.Place
            }
            $.ajax({

                type: "PUT",
                url: "http://localhost:60443/api/IN_Product/" + id,
                dataType: 'json',
                data: formdata,
                headers: {
                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                },
                success: function (data) {


                    if (countlength === countRow) {
                   
       
                            alert("สำเร็จ",location.reload());
                   
                            // window.location.href = "AdminViewProductRequis.html";
                        
                    }


                  


                    // location.reload(); //-*-
                    // calAmountPD();


                },
                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                    console.log("Add new Stockcard failed, error is '" + thrownError + "'");
                    //alert("Add new product failed, error is '" + thrownError + "'");
                }

            }).done(function (data) {

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
                        checkInLocation();
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
                                updateProductUnApproveAPI(dataRequis[i].RequisID, countAllApprove, dataRequis.length);

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

function updateProductUnApproveAPI(id, countAllApprove, allDataApprove) {
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
                        //checkInLocation();
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

function checkInLocation() {
    console.log("xxx");
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductLocation",
        dataType: 'json',

        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            var checkMSG = true;
            var msg = "";
            var allDataCheckProduct = 0;
            var countAllCheck = 0;
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < allIDproductLocation.length; j++) {
                    if (data[i].ProductID === allIDproductLocation[j] && myRequisLocation.toLowerCase() === data[i].LocationName.toLowerCase()) {
                        allDataCheckProduct++;
                    }
                }
            }

            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < allIDproductLocation.length; j++) {
                    if (data[i].ProductID === allIDproductLocation[j] && myRequisLocation.toLowerCase() === data[i].LocationName.toLowerCase()) {
                        msg += data[i].ProductName + ", \n";
                        console.log(data[i].ProductName);
                        console.log("xx");
                        checkMSG = false;
                        countAllCheck++;
                        updateProductUnApproveAPILocation(allIDproductLocation[j], countAllCheck, allDataCheckProduct)
                    }
                }
            }
            if (checkMSG == false) {
                alert("ไม่สามารถเบิกรายการ " + msg + " มีรายการในคลังแล้ว");
            }
            if (allDataCheckProduct === 0) {
                verifyProduct();
            }




        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });

}

function updateProductUnApproveAPILocation(id, countAllCheck, allDataCheckProduct) {

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductViewBarcode?RequisNumber=" + localStorage.logIDrequisViewPro,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.log(data);
            var idProductLocation;


            for (var i = 0; i < data.length; i++) {
                if (id === data[i].ProductID) {
                    idProductLocation = data[i].RequisID;
                    var formdata = {
                        "RequisID": data[i].RequisID,
                        "ProductID": data[i].ProductID,
                        "Category": data[i].Category,
                        "ProductName": data[i].ProductName,
                        "Price": data[i].Price,
                        "UnitType": data[i].UnitType,
                        "Balance": data[i].Balance,
                        "RequisAmount": data[i].RequisAmount,
                        "RequisNote": data[i].RequisNote,
                        "Date": data[i].Date,
                        "ImgProduct": data[i].ImgProduct,
                        "UserID": data[i].UserID,
                        "Barcode": data[i].Barcode,
                        "Location": data[i].Location,
                        "RequisStatus": "unapprove",
                        "RequisNumber": data[i].RequisNumber,
                        "EMP_EngName": data[i].EMP_EngName,
                        "Position": data[i].Position
                    }
                }
            }


            $.ajax({

                type: "PUT",
                url: "http://localhost:60443/api/IN_ProductRequis/" + idProductLocation,
                dataType: 'json',
                data: formdata,
                headers: {
                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                },
                success: function (data) {
                    console.log(data);


                    if (countAllCheck === allDataCheckProduct) {
                        // location.reload();
                        // checkInLocation();
                        verifyProduct();
                    }

                },
                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                    console.log("Add new Stockcard failed, error is '" + thrownError + "'");
                    //alert("Add new product failed, error is '" + thrownError + "'");
                }

            });

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Check In location failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });

}

function verifyProduct() {
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
                "RequisStatus": "verify"
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
     
                    location.reload();
                },
                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                    // console.log("Add new product failed, error is '" + thrownError + "'");
                    alert("Approve failed, error is '" + thrownError + "'");
                }
            });
        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });
}