

$(document).ready(function () {

    console.log(localStorage.logSite);
    checkCartUser();

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Product?sites=" + localStorage.logSite,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {

            // console.table(data);



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

                "data": data,
                "columns": [
                    {
                        "data": "ProductID", visible: false, render: function (data, type, row, meta) {
                            return type === 'display' ?
                                '<center><input type="checkbox"  class="form-check-input" name="deleteMulti" value="' + row.ProductID + '"></center>' :
                                data;
                        }
                    },
                    { "data": "ProductID", visible: false },
                    {
                        "data": "ProductID", render: function (data, type, row, meta) {
                            return type === 'display' ?
                                '<img id="blah" class="img-responsive" width="200" height="150" src="' + row.ImgProduct + '" alt="your image" />' :
                                data;
                        }

                    },
                    {
                        "data": "ProductName", "class": "text-left dtCheck", render: function (data, type, row, meta) {
                            return type === 'display' ?
                                '<h5 class="card-title">' + row.Barcode + " " + row.ProductName + '</h5><h6 class="card-subtitle mb-2 text-muted">' + row.Category + '</h6>' + "Amount:" + row.Amount + " " + row.UnitType + " <br>Price:" + row.Price + ' <br><input type="number" value="1" required min="1" max="' + row.Amount + '" id="addAmount' + row.ProductID + '"><br> <button type="button" class="btn btn-danger float-right" data-toggle="modal" data-target="#myModal" id="btnAddToCart'+row.ProductID+'" onclick="addProductToCart('+row.ProductID+",'"+row.ProductName+"',"+"'"+row.Category+"',"+row.Price+",'"+row.UnitType+"',"+row.Amount+",'"+row.Barcode+"','"+row.ImgProduct+"',"+')">Add</button>' :
                                data;
                        }
                    },
                    { "data": "ProductName", "class": "text-center dtCheck", visible: false },
                    // { "data": "Category" },
                    // { "data": "UnitType" },
                    // { "data": "Price" },
                    // { "data": "MinValue" },
                    // { "data": "MaxValue" },
                    { "data": "Barcode",visible: false  },
                    // { "data": "Vender" },
                    // { "data": "Place" },
                    // { "data": "ProductStatus" },

                    // { "data": "Amount", visible: false },
                    // { "data": "SITES", visible: false },
                    {
                        "data": "ProductID",visible: false, render: function (data, type, row, meta) {
                            return type === 'display' ?
                                '   <center> <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#myModal" id="btnAddToCart'+row.ProductID+'" onclick="addProductToCart('+row.ProductID+",'"+row.ProductName+"',"+"'"+row.Category+"',"+row.Price+",'"+row.UnitType+"',"+row.Amount+",'"+row.Barcode+"','"+row.ImgProduct+"',"+')">Add</button></center>' :
                                data;
                        },

                    }



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
function toggleCheckbox(source) {
    checkboxes = document.getElementsByName('deleteMulti');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
    }
}

function addProductToCart(ProductID,ProductName,Category,Price,UnitType,Amount,Barcode,ImgProduct) {

   //alert(ProductID+ProductName+Category+Price+UnitType+Amount+Barcode+ImgProduct);
    var addAmount = $('#addAmount' + ProductID).val();
    if (Amount >= addAmount && addAmount != 0) {
        var setDateNow = new Date().toLocaleString();
        var formdata = {
    
            "RequisID": 1,
            "ProductID": ProductID,
            "Barcode": Barcode,
            "Category": Category,
            "ProductName": ProductName,
            "Price":Price,
            "UnitType": UnitType,
            "Balance": Amount,
            "RequisAmount": addAmount,
            "RequisNote": "",
            "Date": setDateNow,
            "ImgProduct": ImgProduct,
            "RequisStatus": "waiting",  // waiting,pending,approve,unapprove
            "UserID": localStorage.logUsername,
            "EMP_EngName": localStorage.getMyUsername,
            "Position": localStorage.getMyPosition
    
        }
    
    
    
        $.ajax({
    
            type: "POST",
            url: "http://localhost:60443/api/IN_ProductRequis",
            dataType: 'json',
            data: formdata,
            headers: {
                'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
            },
            success: function (data) {
                console.log(data);
                alert("Add success");
                checkCartUser();
                //  console.log(data[0].UnitTypeName);
                //  location.reload();
    
            },
            error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                console.log("Add new Stockcard failed, error is '" + thrownError + "'");
                //alert("Add new product failed, error is '" + thrownError + "'");
            }
    
        });

    } else {
        alert("โปรดระบุจำนวนให้ถูกต้อง");
    }

    // $('#addProductName').val(),
   
}


function checkCartUser(){

   $.ajax({
    
            type: "GET",
            url: "http://localhost:60443/api/IN_ProductRequis?userID="+localStorage.logUsername+"&RequisStatus=waiting",
            dataType: 'json',
            headers: {
                'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
            },
            success: function (data) {
                console.log(data.length);
                document.getElementById("checkCartUser").innerHTML = data.length;
    
            },
            error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                console.log("Cart failed, error is '" + thrownError + "'");
                document.getElementById("checkCartUser").innerHTML = 0;
                //alert("Add new product failed, error is '" + thrownError + "'");
            }
    
        });

}