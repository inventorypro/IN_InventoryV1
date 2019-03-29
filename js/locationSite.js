$(document).ready(function () {
    ddlLocation();
});

function ddlLocation() {

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Location?siteName=" + localStorage.logSite,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.log(data.length);
            //  console.log(data[0].UnitTypeName);
            //  location.reload();


            var setLocation = document.getElementById("setLocation");

            var option = document.createElement("option");
            for (var i = 0; i < data.length; i++) {


                var option = document.createElement("option");
                option.text = data[i].LocationID + "," + data[i].LocationName;

                setLocation.add(option, setLocation[i]);


            }
            console.log($('#setLocation').val());
            if ($('#setLocation').val() === null) {

                document.getElementById("page-content-wrapper").style.display = 'none';
            } else {



            }



        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });
}

function viewWarehouseData() {

    localStorage.setItem("logSetLocation", $('#setLocation').val());
    if ($('#setLocation').val() === null) {

        document.getElementById("page-content-wrapper").style.display = 'none';
    } else {
        document.getElementById("page-content-wrapper").style.display = 'block';
    }
    $("#showDataPD-Location").empty();
    console.log($('#setLocation').val());

    var tagTable = "";
    tagTable += '<table id="example" class="table table-striped table-bordered text-center dtCheck "style="width:100%">'
    tagTable += " <thead> <tr> <th>Increase</th> <th>ImgProduct</th> <th >Product</th> <th>ProductID</th> <th>Barcode</th> <th>ProductName</th> <th>Category</th> <th>Price</th> <th>UnitType</th> <th>MinValue</th> <th>MaxValue</th> <th>Amount</th> <th>ProductStatus</th> <th>Place</th> <th>Vender</th>  <th>ACTION</th> </tr></thead>"
    tagTable += '</table>'
    $("#showDataPD-Location").append(tagTable)


    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductLocationViewPD/" + $('#setLocation').val().split(",")[0],
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {

            var datatable = $('#example').DataTable({
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


                    {
                        "data": "ProductLocationID", render: function (data, type, row, meta) {
                            return type === 'display' ?
                                ' <button type="button" class="btn btn-success btn-circle btn-lg" data-toggle="modal" data-target="#addProduct" onclick="showDataAddProduct(' + row.ProductLocationID + ',' + row.ProductID + ')"><i class="material-icons" style="font-size:35px"> add </i></button>  ' :
                                data;

                        }

                    },
                    {
                        "data": "ProductLocationID", render: function (data, type, row, meta) {
                            return type === 'display' ?
                                '<img id="blah" class="img-responsive" width="200" height="150" src="' + row.ImgProduct + '" alt="your image" />' :
                                data;

                        }

                    },
                    {
                        "data": "ProductLocationID", render: function (data, type, row, meta) {
                            return type === 'display' ?
                                '<p>' + row.Barcode + ' ' + row.ProductName + '</p><p>Category: ' + row.Category + '</p><p>UnitType: ' + row.UnitType + '</p><p>MaxValue: ' + row.MaxValue + ' MinValue: ' + row.MinValue + ' </p><p>Amount: ' + row.Amount + '</p>' :
                                data;
                        }
                    },
                    { "data": "ProductID", visible: false },
                    { "data": "Barcode", visible: false },
                    { "data": "ProductName", visible: false },
                    { "data": "Category", visible: false },
                    { "data": "Price", visible: false },
                    { "data": "UnitType", visible: false },
                    { "data": "MinValue", visible: false },
                    { "data": "MaxValue", visible: false },
                    { "data": "Amount", visible: false },
                    { "data": "ProductStatus", visible: false },

                    { "data": "Place" },
                    { "data": "Vender", visible: false },

                    {
                        "data": "ProductLocationID", render: function (data, type, row, meta) {
                            return type === 'display' ?
                                '  <center> <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal" onclick="ShowDataEditor(' + row.ProductLocationID + ')">Edit </button>  <button type="button" class="btn btn-danger" onclick="btnDelete(' + row.ProductLocationID + ')">Delete </button></center>' :
                                data;
                        }
                    },
                ]
            });



        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });

    countCart();
}

function ShowDataEditor(id) {

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductLocation/" + id,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },


        success: function (data) {
            console.log(data);

            document.getElementById("editProductID").value = data.ProductLocationID;
            document.getElementById("editPrice").value = data.Price;
            document.getElementById("editMinValue").value = data.MinValue;
            document.getElementById("editMaxValue").value = data.MaxValue;
            document.getElementById("editBarcode").value = data.Barcode;
            document.getElementById("editVender").value = data.Vender;
            document.getElementById("editPlace").value = data.Place;
            document.getElementById("editProductStatus").value = data.ProductStatus;
            document.getElementById("editAmount").value = data.Amount;


        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            //window.location.href = "index.html";
        }
    });
}

function btnEditProduct() {
    var cProductID = $('#editProductID').val();

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductLocation/" + cProductID,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.table(data);
            var formdata = {
                "ProductLocationID": data.ProductLocationID,
                "LocationID": data.LocationID,
                "LocationName": data.LocationName,
                "ProductID": data.ProductID,
                "Barcode": $('#editBarcode').val(),
                "ProductName": data.ProductName,
                "Category": data.Category,
                "Price": $('#editPrice').val(),
                "UnitType": data.UnitType,
                "MinValue": $('#editMinValue').val(),
                "MaxValue": $('#editMaxValue').val(),
                "Amount": $('#editAmount').val(),
                "ProductStatus": $('#editProductStatus').val(),
                "ImgProduct": data.ImgProduct,
                "SITES": data.SITES,
                "Place": $('#editPlace').val(),
                "Vender": data.Vender

            }

            $.ajax({

                type: "PUT",
                url: "http://localhost:60443/api/IN_ProductLocation/" + cProductID,
                dataType: 'json',
                data: formdata,
                headers: {
                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                },
                success: function (data) {
                    console.table(data);

                },
                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                    // console.log("Add new product failed, error is '" + thrownError + "'");
                    alert("Edit product failed, error is '" + thrownError + "'");
                }

            }).then(function (data) {
                console.log(data);

                // location.reload();
                document.getElementById("setLocation").value = setLocation.value;
                viewWarehouseData();
            });
        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            // console.log("Add new product failed, error is '" + thrownError + "'");
            alert("Edit product failed, error is '" + thrownError + "'");
        }

    });




}

function btnDelete(id) {

    $.ajax({

        type: "DELETE",
        url: "http://localhost:60443/api/IN_ProductLocation/" + id,
        dataType: 'json',
  
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.table(data);

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            // console.log("Add new product failed, error is '" + thrownError + "'");
            alert("Edit product failed, error is '" + thrownError + "'");
        }

    }).then(function (data) {
        console.log(data);

        // location.reload();
        document.getElementById("setLocation").value = setLocation.value;
        viewWarehouseData();
    });

}
var getIDaddProduct;
var getIDProduct;
var getAllAmountProduct;
var getMaxVarPD;
function showDataAddProduct(id, pdID) {
    getIDaddProduct = id
    getIDProduct = pdID


    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Product/" + pdID,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            // $("#addAmount").attr({
            //     "max": data.Amount,        // substitute your own
            //     "min": 1          // values (or variables) here
            // });

            $("#addAmount").prop('min', 1);
            $("#addAmount").prop('max', data.Amount);
            console.log(data.ProductName + "A: " + data.Amount);

            getAllAmountProduct = data.Amount;
        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            // console.log("Add new product failed, error is '" + thrownError + "'");
            alert("Edit product failed, error is '" + thrownError + "'");
        }

    }).then(function (data) {


        $.ajax({

            type: "GET",
            url: "http://localhost:60443/api/IN_ProductLocation/" + getIDaddProduct,
            dataType: 'json',
            headers: {
                'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
            },
            success: function (data) {

                getMaxVarPD = data.MaxValue;
            },
            error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                // console.log("Add new product failed, error is '" + thrownError + "'");
                alert("Edit product failed, error is '" + thrownError + "'");
            }

        })
    });

    console.log(id);
}
function addProduct() {
    console.log($('#addAmount').val());
    if ($('#addAmount').val() > getAllAmountProduct || $('#addAmount').val() < 0 || $('#addAmount').val() === undefined || $('#addAmount').val() === null) {
        alert("จำนวนสินค้าไม่เพียงพอ(" + getAllAmountProduct + ")");
    } else {

        $.ajax({

            type: "GET",
            url: "http://localhost:60443/api/IN_ReceiverViewProductID/" + getIDProduct,
            dataType: 'json',
            headers: {
                'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
            },
            success: function (data) {
                // console.log(data[0].ReqAmount);
                if (data.length === 0) {
                    console.log("xxx");
                    $.ajax({

                        type: "GET",
                        url: "http://localhost:60443/api/IN_ProductLocation/" + getIDaddProduct,
                        dataType: 'json',
                        headers: {
                            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                        },
                        success: function (data) {
                            console.table(data);
                            var setAmount = parseInt(data.Amount) + parseInt($('#addAmount').val());
                            var setTotal = data.Price * parseInt($('#addAmount').val());

                            var now = new Date();
                            var setDateNow = moment(now).format('YYYY-MM-DD HH:mm:ss');

                            var formdata = {
                                "ReceiverID": 1,
                                "LocationID": data.LocationID,
                                "ProductID": data.ProductID,
                                "ProductName": data.ProductName,
                                "Price": data.Price,
                                "Total": setTotal,
                                "ReqAmount": parseInt($('#addAmount').val()),
                                "ReqTime": setDateNow,
                                "ESSUSR_Name": localStorage.logUsername,
                                "EMP_EngName": localStorage.getMyUsername,
                                "ReceiverSignature": null,
                                "ReceiverESSUSR_Name": null,
                                "ReceiverEMP_EngName": null,
                                "ReceiverTime": null,
                                "SITES": localStorage.logSite,
                                "Status": "pending"
                            }
                            console.log(setAmount);
                            console.log(data.MaxValue);
                            if (setAmount > data.MaxValue) {
                                alert("ไม่สามารถเพิ่มสินค้าเกิน MaxValue!");
                            } else {
                                $.ajax({

                                    type: "POST",
                                    url: "http://localhost:60443/api/IN_Receiver",
                                    dataType: 'json',
                                    data: formdata,
                                    headers: {
                                        'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                                    },
                                    success: function (data) {
                                        console.table(data);

                                    },
                                    error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                                        // console.log("Add new product failed, error is '" + thrownError + "'");
                                        alert("Edit product failed, error is '" + thrownError + "'");
                                    }

                                }).then(function (data) {
                                    console.log(data);
                                    alert("Successs");
                                    document.getElementById("setLocation").value = setLocation.value;
                                    viewWarehouseData();
                                    // location.reload();
                                });
                            }

                        },
                        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                            // console.log("Add new product failed, error is '" + thrownError + "'");
                            alert("Edit product failed, error is '" + thrownError + "'");
                        }

                    });
                } else {
                    if (parseInt($('#addAmount').val()) + parseInt(data[0].ReqAmount) > getAllAmountProduct || parseInt($('#addAmount').val()) + parseInt(data[0].ReqAmount) > getMaxVarPD) {
                        alert("จำนวนสินค้าไม่เพียงพอ(" + getAllAmountProduct + ")");
                    } else {

                        var caltotal = parseInt($('#addAmount').val()) + parseInt(data[0].ReqAmount);
                        var total = caltotal * data[0].Price
                        var now = new Date();
                        var setDateNow = moment(now).format('YYYY-MM-DD HH:mm:ss');

                        // console.log(getIDaddProduct);
                        var formdata = {
                            "ReceiverID": data[0].ReceiverID,
                            "LocationID": data[0].LocationID,
                            "ProductID": data[0].ProductID,
                            "ProductName": data[0].ProductName,
                            "Price": data[0].Price,
                            "Total": total,
                            "ReqAmount": parseInt($('#addAmount').val()) + parseInt(data[0].ReqAmount),
                            "ReqTime": setDateNow,
                            "ESSUSR_Name": data[0].ESSUSR_Name,
                            "EMP_EngName": data[0].EMP_EngName,
                            "ReceiverSignature": data[0].ReceiverSignature,
                            "ReceiverESSUSR_Name": data[0].ReceiverESSUSR_Name,
                            "ReceiverEMP_EngName": data[0].ReceiverEMP_EngName,
                            "ReceiverTime": data[0].ReceiverTime,
                            "SITES": data[0].ReqSITESAmount,
                            "Status": data[0].Status,
                            "LocationProductID": data[0].LocationProductID
                        }

                        $.ajax({

                            type: "PUT",
                            url: "http://localhost:60443/api/IN_Receiver/" + data[0].ReceiverID,
                            dataType: 'json',
                            data: formdata,
                            headers: {
                                'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                            },
                            success: function (dataP) {
                                // console.table(data);
                                alert("Successs");
                                document.getElementById("setLocation").value = setLocation.value;
                                viewWarehouseData();
                            },
                            error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                                // console.log("Add new product failed, error is '" + thrownError + "'");
                                alert("Edit product failed, error is '" + thrownError + "'");
                            }

                        })
                    }

                }



            },
            error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                console.log("product failed, error is '" + thrownError + "'");


            }

        })



    }

}

function veriInputAmount() {
    var xxx = document.getElementById("addAmount").value
    console.log(getAllAmountProduct)
    if (xxx > 0) {
        if (xxx >= getAllAmountProduct) {
            document.getElementById("btnaddProduct").disabled = true;
        } else {
            document.getElementById("btnaddProduct").disabled = false;
        }

    } else {
        document.getElementById("btnaddProduct").disabled = true;
    }




}

function countCart() {

    console.log(setLocation.value);
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ReceiverLocationID/" + setLocation.value.split(",")[0],
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.log(data.length);
            document.getElementById("checkCartLoca").innerHTML = data.length;
        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            // console.log("Add new product failed, error is '" + thrownError + "'");
            alert("Edit product failed, error is '" + thrownError + "'");
        }

    })



}