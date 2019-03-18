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




        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });
}

function viewWarehouseData() {
    $("#showDataPD-Location").empty();
    console.log($('#setLocation').val());

    var tagTable = "";
    tagTable += '<table id="example" class="table table-striped table-bordered text-center dtCheck "style="width:80%">'
    tagTable += " <thead> <tr> <th>ProductLocationID</th> <th>ImgProduct</th> <th>Product</th> <th>ProductID</th> <th>Barcode</th> <th>ProductName</th> <th>Category</th> <th>Price</th> <th>UnitType</th> <th>MinValue</th> <th>MaxValue</th> <th>Amount</th> <th>ProductStatus</th> <th>Place</th> <th>Vender</th>  <th>ACTION</th> </tr></thead>"
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

                    { "data": "ProductLocationID",visible: false  },
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
                                '<p>' + row.ProductID + '</p><p>' + row.ProductName + '</p>' :
                                data;
                        }
                    },
                    { "data": "ProductID",visible: false },
                    { "data": "Barcode",visible: false  },
                    { "data": "ProductName",visible: false  },
                    { "data": "Category",visible: false  },
                    { "data": "Price",visible: false  },
                    { "data": "UnitType",visible: false  },
                    { "data": "MinValue" },
                    { "data": "MaxValue" },
                    { "data": "Amount" },
                    { "data": "ProductStatus" },

                    { "data": "Place" },
                    { "data": "Vender",visible: false  },
                    
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

                location.reload();
            });
        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            // console.log("Add new product failed, error is '" + thrownError + "'");
            alert("Edit product failed, error is '" + thrownError + "'");
        }

    });




}

function btnDelete(id){

    $.ajax({

        type: "DELETE",
        url: "http://localhost:60443/api/IN_ProductLocation/" + id,
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