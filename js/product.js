var allProduct = [];

$(document).ready(function () {

    ddlReturnProduct();


    $("#addPackProduct").hide();
    console.log(localStorage.logSite);
    // var pageLength = 10;
    // function pageLength() {
    //     pageLength = $('#addProductName').val();
    // }

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Product?sites=" + localStorage.logSite,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                allProduct[i] = data[i].ProductID + "," + data[i].ProductName + "," + data[i].Price + "," + data[i].Amount;
            }
            // console.table(data);

            // console.log(allProduct[0].split(",")[0]);

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
                        "data": "ProductID", render: function (data, type, row, meta) {
                            return type === 'display' ?
                                '<center><input type="checkbox"  class="form-check-input" name="deleteMulti" value="' + row.ProductID + '"></center>' :
                                data;
                        }
                    },
                    { "data": "ProductID", visible: false },
                    {
                        "data": "ProductID", "class": "text-left dtCheck", render: function (data, type, row, meta) {
                            return type === 'display' ?
                                '<h5 class="card-title">' + row.ProductName + '</h5><h6 class="card-subtitle mb-2 text-muted">' + row.Category + '</h6>' + "Amount:" + row.Amount + " " + row.UnitType + '' :
                                data;
                        }
                    },
                    { "data": "ProductName", "class": "text-center dtCheck", visible: false },
                    { "data": "Category", visible: false },
                    { "data": "UnitType", visible: false },
                    { "data": "Price" },
                    { "data": "MinValue" },
                    { "data": "MaxValue" },
                    { "data": "Barcode" },
                    { "data": "Vender" },
                    { "data": "Place" },
                    { "data": "ProductStatus" },
                    {
                        "data": "ProductID", render: function (data, type, row, meta) {
                            return type === 'display' ?
                                '<img id="blah" class="img-responsive" width="200" height="150" src="' + row.ImgProduct + '" alt="your image" />' :
                                data;

                        }

                    },
                    { "data": "Amount", visible: false },
                    { "data": "SITES", visible: false },
                    {
                        "data": "ProductID", render: function (data, type, row, meta) {
                            return type === 'display' ?
                                '   <center> <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal" onclick="ShowDataEditor(' + row.ProductID + ')">Edit </button></center>' :
                                data;
                        },

                    },
                    {
                        "data": "ProductID", render: function (data, type, row, meta) {
                            var tttr = $(this).closest('tr');
                            return type === 'display' ?
                                '  <center>  <button type="button" class="btn btn-danger" onclick="btnDelete(' + row.ProductID + ')">Delete </button></center>' :
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

function btnDelete(idVal) {


    var showCfDelete = confirm("Are you sure you want to delete this product?");
    if (showCfDelete == true) {

        txtShow = "You delete success!";


        $.ajax({

            type: "DELETE",
            url: "http://localhost:60443/api/IN_Product/" + idVal,
            dataType: 'json',
            headers: {
                'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
            },

            success: function (data) {
                console.log("success");
                alert(txtShow);
                location.reload();
                // clearProduct(idVal)
            },
            error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                console.log("Your can't delete, error is '" + thrownError + "'");
                //window.location.href = "index.html";
            }
        });



    } else {


    }

}
function clearProduct(getID) {
    var countDel = 1;
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductRequis?userID=all&RequisStatus=all",
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            var getLength = data.length;
            if (data.length === 0) {
                console.log("success");
                alert(txtShow);
                location.reload();

            } else {
                for (var i = 0; i < data.length; i++) {
                    countDel++;

                    if (data[i].ProductID === getID && data[i].ProductStatus === "waiting") {
                        delReqProduct(data[i].RequisID, countDel, getLength);
                    }


                }

            }



        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Your can't delete, error is '" + thrownError + "'");
            //window.location.href = "index.html";
        }
    });

}

function delReqProduct(id, countDel, getLength) {
    $.ajax({

        type: "DELETE",
        url: "http://localhost:60443/api/IN_ProductRequis/" + id,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (datax) {
            console.log("success");
            alert(txtShow);
            location.reload();
        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Your can't delete, error is '" + thrownError + "'");
            //window.location.href = "index.html";
        }
    });
}

function toggleCheckbox(source) {
    checkboxes = document.getElementsByName('deleteMulti');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
    }
}

function multiDelete() {


    var items = document.getElementsByName('deleteMulti');
    var selectedItems = [];
    var countTrue = 0;
    for (var i = 0; i < items.length; i++) {
        if (items[i].type == 'checkbox' && items[i].checked == true) {
            selectedItems[i] = items[i].value;

        }


        // ccnMultiDelete(items[i].value);
    }
    for (var i = 0; i < selectedItems.length; i++) {
        if (selectedItems[i] !== undefined) {
            countTrue++;
        }
    }

    if (selectedItems.length === 0) {
        alert("You have not selected data!");
    } else {
        var countRowTrue = 1;
        var multiCfDelete = confirm("Are you sure you want to delete this product?");
        if (multiCfDelete == true) {
            for (var i = 0; i < selectedItems.length; i++) {
                if (selectedItems[i] !== undefined) {

                    ccnMultiDelete(selectedItems[i], countRowTrue, countTrue)

                    countRowTrue++;
                }
            }

            // alert("You delete success! x");
            // location.reload();
        }

    }



}

function ccnMultiDelete(getIdDelete, countRowTrue, countTrue) {
    // localhost:60443/api/IN_Package/

    console.log(countRowTrue);
    console.log(countTrue);

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductInPackage?productID=" + getIdDelete,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            var checkMixRowDelete = 1;
            for (var i = 0; i < data.length; i++) {
                $.ajax({

                    type: "DELETE",
                    url: "http://localhost:60443/api/IN_Package/" + data[i].PackageID,
                    dataType: 'json',
                    headers: {
                        'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                    },

                    success: function (dataPackDelete) {
                        checkMixRowDelete++;
                        if (checkMixRowDelete === data.length) {

                            $.ajax({

                                type: "DELETE",
                                url: "http://localhost:60443/api/IN_Product/" + getIdDelete,
                                dataType: 'json',
                                headers: {
                                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                                },

                                success: function (data) {
                                    console.log("success " + data);
                                    if (countRowTrue === countTrue) {

                                        alert("You delete success! x");
                                        location.reload();
                                    }
                                },
                                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                                    console.log("Your can't delete, error is '" + thrownError + "'");
                                    //window.location.href = "index.html";
                                }
                            });
                        }


                    },
                    error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                        console.log("Your can't delete, error is '" + thrownError + "'");
                        //window.location.href = "index.html";
                    }
                });
            }

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Your can't delete, error is '" + thrownError + "'");
            //window.location.href = "index.html";
        }
    });



}

function ShowDataEditor(a) {
    document.getElementById("myImgUpload").src = "";
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Product/" + a,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },


        success: function (data) {
            console.log(data);
            clearDivShowPDEdit();
            document.getElementById("editProductID").value = data.ProductID;
            document.getElementById("editProductName").value = data.ProductName;
            document.getElementById("editCategory").value = data.Category;
            if (data.Category.toLowerCase() === "package") {
                document.getElementById("setCategory").disabled = true;
            } else {
                var op = document.getElementById("setCategory").getElementsByTagName("option");

                for (var i = 0; i < op.length; i++) {
                    // lowercase comparison for case-insensitivity
                    if (op[i].value.toLowerCase() === "package") {
                        op[i].disabled = true;
                    }

                }


                document.getElementById("setCategory").disabled = false;
            }


            document.getElementById("editUnitType").value = data.UnitType;
            // document.getElementById("showUnitType").innerHTML = data.UnitType;
            showddlPackProduct(data.ProductID);
            showddlCategory(data.Category);
            showddlUnitType(data.UnitType);
            document.getElementById("editPrice").value = data.Price;
            document.getElementById("editMinValue").value = data.MinValue;
            document.getElementById("editMaxValue").value = data.MaxValue;
            document.getElementById("editBarcode").value = data.Barcode;
            document.getElementById("editVender").value = data.Vender;
            document.getElementById("editPlace").value = data.Place;
            document.getElementById("editProductStatus").value = data.ProductStatus;
            document.getElementById("editAmount").value = data.Amount;
            document.getElementById("editSITES").value = data.SITES;
            document.getElementById("editImgProduct").value = data.ImgProduct;

            document.getElementById("editImgProductShow").src = data.ImgProduct;

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            //window.location.href = "index.html";
        }
    });
}

function deleteDataProduct(a) {
    // var getA = a;
    // var x = document.getElementById("addProductName"+getA).value;

    // alert(getA+":"+x);
    alert(a);

}

function addNewProduct() {
    //addsetProduct

    if ($('#addCategory').val().toLowerCase() === "package"
        && $('#addProductName').val()
        && $('#addUnitType').val()
        && $('#addPrice').val()
        && $('#addMinValue').val()
        && $('#addMaxValue').val()
        && $('#addBarcode').val()
        && $('#addVender').val()
        && $('#addPlace').val()
        && $('#addImgProduct').val()
        && $('#addAmount').val()
    ) {

        if (allIDproductPackELM.length === 0) {
            alert("Add product in package!");
        } else {

            var formdata = {
                ProductID: "1",
                ProductName: $('#addProductName').val(),
                Category: $('#addCategory').val(),
                UnitType: $('#addUnitType').val(),
                Price: $('#addPrice').val(),
                MinValue: $('#addMinValue').val(),
                MaxValue: $('#addMaxValue').val(),
                Barcode: $('#addBarcode').val(),
                Vender: $('#addVender').val(),
                Place: $('#addPlace').val(),
                ProductStatus: "true",
                ImgProduct: $('#addImgProduct').val(),
                Amount: $('#addAmount').val(),
                SITES: localStorage.logSite
            }

            $.ajax({

                type: "POST",
                url: "http://localhost:60443/api/IN_Product",
                dataType: 'json',
                data: formdata,
                headers: {
                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                },
                success: function (data) {


                    var checkNameCat = "";
                    var countUpload = 1;
                    for (var i = 0; i < allIDproductPackELM.length; i++) {
                        checkNameCat = "addsetProduct" + allIDproductPackELM[i];
                        checkAmountPackPro = "addsetAmountProduct" + allIDproductPackELM[i];
                        // var vvvvv =document.getElementById(checkNameCat).value;
                        var getIdPackInProduct = $('#' + checkNameCat).val()
                        var getAmountPackInProduct = $('#' + checkAmountPackPro).val()
                        // console.log(getIdPackInProduct);

                        var formdataPack = {
                            "PackageID": 1,
                            "ProductID": data.ProductID,
                            "Amount": getAmountPackInProduct,
                            "SITES": localStorage.logSite,
                            "PackProductID": getIdPackInProduct.split(",")[0],
                            "ProductName": getIdPackInProduct.split(",")[1]
                        }

                        $.ajax({

                            type: "POST",
                            url: "http://localhost:60443/api/IN_Package",
                            dataType: 'json',
                            data: formdataPack,
                            headers: {
                                'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                            },
                            success: function (data) {
                                countUpload++;
                                console.table(data);
                                console.table(allIDproductPackELM.length + " x " + countUpload);

                                // document.getElementById("loader").style.display = "block";
                                // location.reload();
                                if (countUpload === allIDproductPackELM.length) {
                                    location.reload();
                                }
                            },
                            error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                                // console.log("Add new product failed, error is '" + thrownError + "'");
                                alert("Add new product failed, error is '" + thrownError + "'");
                            }

                        });

                    }


                },
                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                    // console.log("Add new product failed, error is '" + thrownError + "'");
                    alert("Add new product failed, error is '" + thrownError + "'");
                }

            });

        }




    } else {
        if (!$('#addProductName').val() || !$('#addCategory').val()

            || !$('#addUnitType').val()
            || !$('#addPrice').val()
            || !$('#addMinValue').val()
            || !$('#addMaxValue').val()
            || !$('#addBarcode').val()
            || !$('#addVender').val()
            || !$('#addPlace').val()
            || !$('#addImgProduct').val()
            || !$('#addAmount').val()

        ) {
            alert("กรุณาตรวจสอบข้อมูล");

        } else {
            // document.getElementById("loader").style.display = "none";
            var formdata = {
                ProductID: "1",
                ProductName: $('#addProductName').val(),
                Category: $('#addCategory').val(),
                UnitType: $('#addUnitType').val(),
                Price: $('#addPrice').val(),
                MinValue: $('#addMinValue').val(),
                MaxValue: $('#addMaxValue').val(),
                Barcode: $('#addBarcode').val(),
                Vender: $('#addVender').val(),
                Place: $('#addPlace').val(),
                ProductStatus: "true",
                ImgProduct: $('#addImgProduct').val(),
                Amount: $('#addAmount').val(),
                SITES: localStorage.logSite
            }

            $.ajax({

                type: "POST",
                url: "http://localhost:60443/api/IN_Product",
                dataType: 'json',
                data: formdata,
                headers: {
                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                },
                success: function (data) {
                    console.table(data.ProductID);

                    // document.getElementById("loader").style.display = "block";
                    location.reload();
                },
                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                    // console.log("Add new product failed, error is '" + thrownError + "'");
                    alert("Add new product failed, error is '" + thrownError + "'");
                }

            });
        }

    }


}

$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
})


function btnEditProduct() {

    if ($('#editCategory').val().toLowerCase() === "package") {
        updateAllProductPackage();
    }

    var cProductID = $('#editProductID').val();


    var formdata = {
        ProductID: $('#editProductID').val(),
        ProductName: $('#editProductName').val(),
        Category: $('#editCategory').val(),
        UnitType: $('#editUnitType').val(),
        Price: $('#editPrice').val(),
        MinValue: $('#editMinValue').val(),
        MaxValue: $('#editMaxValue').val(),
        Barcode: $('#editBarcode').val(),
        Vender: $('#editVender').val(),
        Place: $('#editPlace').val(),
        ProductStatus: $('#editProductStatus').val(),
        ImgProduct: $('#editImgProduct').val(),
        Amount: $('#editAmount').val(),
        SITES: localStorage.logSite
    }

    $.ajax({

        type: "PUT",
        url: "http://localhost:60443/api/IN_Product/" + cProductID,
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

        location.reload();
    });

}

function ddlUnitType() {

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_UnitType",
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.log(data.length);
            //  console.log(data[0].UnitTypeName);
            //  location.reload();
            var setUnitType = document.getElementById("setUnitType");

            var option = document.createElement("option");
            for (var i = 0; i < data.length; i++) {


                var option = document.createElement("option");
                option.text = data[i].UnitTypeName;

                setUnitType.add(option, setUnitType[i]);


            }




        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });

}
function ADDddlUnitType() {

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_UnitType",
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.log(data.length);
            //  console.log(data[0].UnitTypeName);
            //  location.reload();

            var addsetUnitType = document.getElementById("addsetUnitType");
            var option = document.createElement("option");
            for (var i = 0; i < data.length; i++) {


                var option = document.createElement("option");
                option.text = data[i].UnitTypeName;


                addsetUnitType.add(option, addsetUnitType[i]);

            }




        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });

}

function showddlUnitType(nameUnitType) {

    document.getElementById("setUnitType").value = nameUnitType;

}

function setVarDdlUnitType() {
    var UnitType = document.getElementById("setUnitType").value;
    document.getElementById("editUnitType").value = UnitType;

}
function addsetVarDdlUnitType() {
    var UnitType = document.getElementById("addsetUnitType").value;
    document.getElementById("addUnitType").value = UnitType;
}


function ddlCategory() {

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Category",
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.log(data.length);

            var setCategory = document.getElementById("setCategory");

            var option = document.createElement("option");
            for (var i = 0; i < data.length; i++) {


                var option = document.createElement("option");
                option.text = data[i].CategoryName;

                setCategory.add(option, setCategory[i]);


            }




        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });

}
function ADDddlCategory() {

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Category",
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.log(data.length);
            //  console.log(data[0].UnitTypeName);
            //  location.reload();

            var addsetCategory = document.getElementById("addsetCategory");
            var option = document.createElement("option");
            for (var i = 0; i < data.length; i++) {


                var option = document.createElement("option");
                option.text = data[i].CategoryName;


                addsetCategory.add(option, addsetCategory[i]);

            }




        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });

}
function showddlCategory(nameCategory) {
    // disabled = true;


    document.getElementById("setCategory").value = nameCategory;

}

function setVarDdlCategory() {
    var Category = document.getElementById("setCategory").value;
    document.getElementById("editCategory").value = Category;

}
function addsetVarDdlCategory() {
    var Category = document.getElementById("addsetCategory").value;
    document.getElementById("addCategory").value = Category;

    var check = document.getElementById("addCategory").value;
    if (check === "PACKAGE") {
        $("#addPackProduct").show();
    } else {
        $("#addPackProduct").hide();
    }
}



var countAddButton = 1;
var numberAddButton = 0;
var allIDproductPackELM = [];
function addButton() {

    // for (var i = i; i <= countAddButton.length; i++) {
    $("#addPackProduct").append(' <div id="addPack' + numberAddButton + '">' + numberAddButton + '<select class="form-control" onchange="checkVall()" id="addsetProduct' + numberAddButton + '"  onclick="" required><option disabled selected value="">Please select Product</option></select>จำนวน(1 : 1 Pack): <input type="number" name="quantity" onchange="checkVall()" id="addsetAmountProduct' + numberAddButton + '" min="1" value="1"><button class="btn btn-danger" type="button" onchange="checkVall()" id="btnRemove" onclick="removeButton(' + numberAddButton + ')">Remove</button><br><br></div>');

    // }
    var setName = "addsetProduct" + numberAddButton;
    var addsetProduct = document.getElementById(setName);
    var option = document.createElement("option");
    for (var i = 0; i < allProduct.length; i++) {


        var option = document.createElement("option");
        // option.text = allProduct[i].split(",")[1];
        option.text = allProduct[i];

        addsetProduct.add(option, addsetProduct[i]);

    }
    allIDproductPackELM.push(numberAddButton);


    numberAddButton++;
    countAddButton++;

}



function removeButton(id) {
    for (var i = 0; i < allIDproductPackELM.length; i++) {
        if (allIDproductPackELM[i] === id) {
            allIDproductPackELM.splice(i, 1);
        }
    }



    countAddButton--;
    var setName = "addPack" + id;
    document.getElementById(setName).remove();

}
var editArrayIdPackProduct = [];
function showddlPackProduct(id) {
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductInPackage?productID=" + id,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.log(data.length);
            //  console.log(data[0].UnitTypeName);
            //  location.reload();

            for (var j = 0; j < data.length; j++) {

                $("#showPackProduct").append(' <div id="addShowPack' + data[j].PackageID + '">' + data[j].ProductName + '<br>จำนวน(1 : 1 Pack): <input type="number" name="quantity" onchange="checkEditVal()" id="editsetAmountProduct' + data[j].PackageID + '" min="1" value="' + data[j].Amount + '"><br><br></div>');

                // document.getElementById(setName).value = data[j].PackageID;
                editArrayIdPackProduct[j] = '' + data[j].PackageID + ',' + data[j].ProductID + ',' + 'editsetAmountProduct' + data[j].PackageID + ',' + data[j].PackProductID + ',' + data[j].ProductName;


            }

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });
}

var shownameProduct = ""
function getProductById(id) {

    for (var i = 0; i < allProduct.length; i++) {
        if (allProduct[i].split(",")[0] === id) {
            return allProduct[i].split(",")[1]
        }

    }

}

function clearDivShowPDEdit() {

    for (var i = editArrayIdPackProduct.length; 0 < i; i--) {
        editArrayIdPackProduct.pop();
    }
    $("#showPackProduct").empty();
}



function checkVall() {
    var checkNameCat = "";
    var checkRePrice = 0;
    var checkAmountPackPro = 0;
    var allAmountCalucattor = 99999999;
    for (var i = 0; i < allIDproductPackELM.length; i++) {
        checkNameCat = "addsetProduct" + allIDproductPackELM[i];
        checkAmountPackPro = "addsetAmountProduct" + allIDproductPackELM[i];
        // var vvvvv =document.getElementById(checkNameCat).value;
        var getIdPackInProduct = $('#' + checkNameCat).val()
        var getAmountPackInProduct = $('#' + checkAmountPackPro).val()


        if (getIdPackInProduct.split(",")[3] / getAmountPackInProduct < allAmountCalucattor) {
            allAmountCalucattor = getIdPackInProduct.split(",")[3] / getAmountPackInProduct
        }

        checkRePrice += getIdPackInProduct.split(",")[2] * getAmountPackInProduct
        console.log(getIdPackInProduct.split(",")[2]);
        console.log(getAmountPackInProduct);
    }

    document.getElementById("addAmount").value = Math.floor(allAmountCalucattor);
    document.getElementById("addPrice").value = checkRePrice;
    console.log(allAmountCalucattor);
}


function updateAllProductPackage() {
    var getReqAmount = "";
    var getIdPackEdit;
    var getNameReqAmount = "";

    for (var i = 0; i < editArrayIdPackProduct.length; i++) {
        getReqAmount = editArrayIdPackProduct[i];
        getNameReqAmount = "#" + getReqAmount.split(",")[2];
        getIdPackEdit = getReqAmount.split(",")[0];
        console.log(getNameReqAmount);
        var formdata = {
            "PackageID": getIdPackEdit,
            "ProductID": getReqAmount.split(",")[1],
            "Amount": $(getNameReqAmount).val(),
            "SITES": localStorage.logSite,
            "PackProductID": getReqAmount.split(",")[3],
            "ProductName": getReqAmount.split(",")[4]
        }
        $.ajax({

            type: "PUT",
            url: "http://localhost:60443/api/IN_Package/" + getIdPackEdit,
            dataType: 'json',
            data: formdata,
            headers: {
                'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
            },
            success: function (datax) {
                console.table(datax);

            },
            error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                // console.log("Add new product failed, error is '" + thrownError + "'");
                alert("Edit product failed, error is '" + thrownError + "'");
            }

        }).then(function (data) {
            // console.log(data);

            // location.reload();
        });

    }
}

function checkEditVal() {
    // var valAmountEdit = 99999999;
    // for(var i = 0 ; i < allProduct.length ; i++ ){
    //     for(var j = 0 ; j < editArrayIdPackProduct.length ; j++ ){
    //         if(allProduct[i].split(",")[0] === editArrayIdPackProduct[j].split(",")[3] ){

    //             valAmountEdit = $("#"+editArrayIdPackProduct[j].split(",")[2]).val() / allProduct[i].split(",")[3] ;
    //             if($("#"+editArrayIdPackProduct[j].split(",")[2]).val() / allProduct[i].split(",")[3] < valAmountEdit){
    //                 valAmountEdit = $("#"+editArrayIdPackProduct[j].split(",")[2]).val() / allProduct[i].split(",")[3] ;
    //             }
    //         }


    //     }

    // }

    // document.getElementById("editAmount").value = Math.floor(valAmountEdit);
    // // document.getElementById("editPrice").value = xxxxx;
}


function returnProduct() {
    if ($('#topicReturunProduct').val() === null || $('#addsetReturunProduct').val() === null || $('#amountReturnPD').val() <= 0) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else {
        // alert("Pass");

        $.ajax({

            type: "GET",
            url: "http://localhost:60443/api/IN_Product/" + $('#addsetReturunProduct').val().split(",")[0],
            dataType: 'json',
            headers: {
                'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
            },
            success: function (data) {

                var now = new Date();
                var setDateNow = moment(now).format('YYYY-MM-DD HH:mm:ss');
                var calAmount = parseInt($('#amountReturnPD').val())  + parseInt(data.Amount);
                console.log(calAmount);
                var formdata = {
                    "StockCardID": 1,
                    "Date": setDateNow,
                    "UserID": localStorage.logUsername,
                    "StockCardCategory": $('#topicReturunProduct').val(),
                    "ProductID": data.ProductID,
                    "Amount":$('#amountReturnPD').val(),
                    "Balance":data.Amount,
                    "ProductName": data.ProductName,
                    "Price": data.Price,
                    "UnitType": data.UnitType,
                    "Category": data.Category,
                    "SITES": data.SITES,
                    "Comment": $('#commentReturnPD').val()
                }
                $.ajax({

                    type: "POST",
                    url: "http://localhost:60443/api/IN_StockCard",
                    dataType: 'json',
                    data: formdata,
                    headers: {
                        'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                    },
                    success: function (datax) {
                        console.table(datax);
                        calReturnPD();
                    },
                    error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                        // console.log("Add new product failed, error is '" + thrownError + "'");
                        alert("Edit product failed, error is '" + thrownError + "'");
                    }

                }).then(function (data) {
                    // console.log(data);

                    // location.reload();
                });

            },
            error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                console.log("Add new Stockcard failed, error is '" + thrownError + "'");
                //alert("Add new product failed, error is '" + thrownError + "'");
            }

        });

    }




}


function calReturnPD() {

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Product/" + $('#addsetReturunProduct').val().split(",")[0],
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {

         
            console.log(data);
            var formdata = {
                "ProductID": data.ProductID,
                "Barcode": data.Barcode,
                "ProductName": data.ProductName,
                "Category": data.Category,
                "Price": data.Price,
                "UnitType": data.UnitType,
                "MinValue": data.MinValue,
                "MaxValue": data.MaxValue,
                "Amount": parseInt(data.Amount) +  parseInt($('#amountReturnPD').val()),
                "Vender": data.Vender,
                "ProductStatus": data.ProductStatus,
                "ImgProduct": data.ImgProduct,
                "SITES": data.SITES,
                "Place": data.Place

            }
            $.ajax({

                type: "PUT",
                url: "http://localhost:60443/api/IN_Product/" + $('#addsetReturunProduct').val().split(",")[0],
                dataType: 'json',
                data: formdata,
                headers: {
                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                },
                success: function (datax) {
                    alert("สำเร็จ");
                    location.reload();

                },
                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                    // console.log("Add new product failed, error is '" + thrownError + "'");
                    alert("Edit product failed, error is '" + thrownError + "'");
                }

            }).then(function (data) {
                // console.log(data);

                // location.reload();
            });

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });

}

function ddlReturnProduct() {
    // $('#topicReturunProduct').val("return1");
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Product?sites=" + localStorage.logSite,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.log(data.length);
            //  console.log(data[0].UnitTypeName);
            //  location.reload();

            var addsetReturunProduct = document.getElementById("addsetReturunProduct");
            var option = document.createElement("option");
            for (var i = 0; i < data.length; i++) {


                var option = document.createElement("option");
                option.text = data[i].ProductID + "," + data[i].ProductName;


                addsetReturunProduct.add(option, addsetReturunProduct[i]);

            }




        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });



    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Topic",
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.log(data.length);
            //  console.log(data[0].UnitTypeName);
            //  location.reload();

            var addsetTopicReturunProduct = document.getElementById("topicReturunProduct");
            var option = document.createElement("option");
            for (var i = 0; i < data.length; i++) {


                var option = document.createElement("option");
                option.text = data[i].Name;


                addsetTopicReturunProduct.add(option, addsetTopicReturunProduct[i]);

            }




        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });

}
function closeModel(){
    var x = document.getElementById("myModalReturnProduct"); 
    x.close(); 
}

$("#trigger").click(function(){
    $("#trigger").data('target', $('#myModalAddNew'));
  })

function newTopicReturn() {
    if ($('#topicReturnPD').val().length === 0) {
        alert("กรุณาตรวจสอบข้อมูล")
    }else{
        var formdata = {
            "Id": 1,
            "Name":  $('#topicReturnPD').val(),
            "Description": $('#commentTopicReturnPD').val(),
            "SITES": localStorage.logSite,
        }
        $.ajax({

            type: "POST",
            url: "http://localhost:60443/api/IN_Topic",
            dataType: 'json',
            data: formdata,
            headers: {
                'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
            },
            success: function (datax) {
                alert("สำเร็จ");
                location.reload();

            },
            error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                // console.log("Add new product failed, error is '" + thrownError + "'");
                alert("Edit product failed, error is '" + thrownError + "'");
            }

        }).then(function (data) {
            // console.log(data);

            // location.reload();
        });
    }
}