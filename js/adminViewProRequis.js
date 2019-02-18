var allIdProduct = [];
var allIdRequisProduct = [];
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
                if (data[i].RequisStatus.toLowerCase() === "unapprove" || data[i].RequisStatus.toLowerCase() === "approve") {

                } else {
                    allIdProduct[i] = data[i].ProductID;
                    allAmountProduct[i] = data[i].RequisAmount;
                    allIdRequisProduct[i] = data[i].RequisID;
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

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            // alert('check !');

        }

    });


    /////Check data
    

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
                            // allResultReqAmountProduct[j] = data[i].Amount - allAmountProduct[j];
                        }
                    }
                }
            }

            // console.log(checking);
            // console.log(productNameFalse);
            if (checking === "false") {
                alert(productNameFalse + " มีจำนวนสินค้าไม่เพียงพอ");
                document.getElementById("btnApprove").disabled = true;
            }else if(allIdProduct.length === 0){
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
function updateAmountProduct(formdataProduct,id){
    $.ajax({

        type: "PUT",
        url: "http://localhost:60443/api/IN_Product/" + id,
        dataType: 'json',
        data: formdataProduct,
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
      
        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            // console.log("Add new product failed, error is '" + thrownError + "'");
            alert("Edit product failed, error is '" + thrownError + "'");
        }

    }).then(function (data) {
        console.log("ssssssssssssssss");
    });

}

function getAmountProduct(id,amount){
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
                Amount: data.Amount-amount,
                SITES: data.SITES
            }

            updateAmountProduct(formdataProduct,id);
          
            



        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            // alert('check !');

        }
    });

}

function btnApprove() {
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
                            // allResultReqAmountProduct[j] = data[i].Amount - allAmountProduct[j];
                        }
                    }
                }
            }

            // console.log(checking);
            // console.log(productNameFalse);
            if (checking === "false") {
                alert(productNameFalse + " มีจำนวนสินค้าไม่เพียงพอ");
                document.getElementById("btnApprove").disabled = true;
            }else if(allIdProduct.length === 0){
                document.getElementById("btnApprove").disabled = true;
            }else {
                document.getElementById("btnApprove").disabled = false;
                for (var i = 0; i < allIdProduct.length; i++) {
                    console.log(allIdProduct[i]+"xxx"+allAmountProduct[i]);
                    getAmountProduct(allIdProduct[i],allAmountProduct[i])
                    ///////put req product
                   
                    $.ajax({
                        type: "GET",
                        url: "http://localhost:60443/api/IN_ProductRequis/" + allIdRequisProduct[i],
                        dataType: 'json',
                        headers: {
                            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                        },

                        success: function (data) {


                            for (var j = 0; j < allIdProduct.length; j++) {
                                if(allIdRequisProduct[j]===data.RequisID){
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
                                        url: "http://localhost:60443/api/IN_ProductRequis/" + allIdRequisProduct[j],
                                        dataType: 'json',
                                        data: formdataReqProduct,
                                        headers: {
                                            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                                        },
                                        success: function (data) {
    
    
                                        },
                                        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                                            // console.log("Add new product failed, error is '" + thrownError + "'");
                                            alert("Edit product failed, error is '" + thrownError + "'");
                                        }
    
                                    }).then(function (data) {
                                        console.log("ssssssssssssssss");
                                    });
                                }
                            


                            }
                  



                        },
                        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
                            // alert('check !');

                        }
                    });
                    location.reload();
                }
                  //// req

                  $.ajax({
                    type: "GET",
                    url: "http://localhost:60443/api/IN_Requisition/" + localStorage.logIDrequis,
                    dataType: 'json',
                    headers: {
                        'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                    },

                    success: function (data) {


                        for (var j = 0; j < allIdProduct.length; j++) {
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
                                "ApproveName":localStorage.getMyUsername,
                                "ApproveDate": setDateNow,
                                "RequisNumber": data.RequisNumber,
                                "TotalCost": data.TotalCost,
                                "UserID": data.UserID,
                                "SITES": data.SITES,
                                "RequisStatus": "approve"

                            }

                            $.ajax({

                                type: "PUT",
                                url: "http://localhost:60443/api/IN_Requisition/" +  localStorage.logIDrequis,
                                dataType: 'json',
                                data: formdataReq,
                                headers: {
                                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                                },
                                success: function (data) {


                                },
                                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                                    // console.log("Add new product failed, error is '" + thrownError + "'");
                                    alert("Edit product failed, error is '" + thrownError + "'");
                                }

                            }).then(function (data) {
                                //    location.reload();
                                console.log("ssssssssssssssss");
                            });


                        }




                    },
                    error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                        console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
                        // alert('check !');

                    }
                });



            }
     
    

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

