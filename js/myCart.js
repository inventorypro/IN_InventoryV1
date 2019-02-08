

$(document).ready(function () {
    // document.getElementById("getMyUsername").value = localStorage.getMyUsername;
    document.getElementById("getMyUsername").innerHTML = localStorage.getMyUsername;
    console.log(localStorage.logSite);
    ranBillNumber();
    showDataLocation();
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductRequis?userID=" + localStorage.logUsername + "&RequisStatus=waiting",
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
                                '<img id="blah" height="100" src="' + row.ImgProduct + '" alt="your image" />' :
                                data;
                        }

                    },
                    {
                        "data": "RequisID", visible: false, render: function (data, type, row, meta) {
                            return type === 'display' ?
                                '<center><input type="checkbox"  class="form-check-input" name="deleteMulti" value="' + row.RequisID + '"></center>' :
                                data;
                        }
                    },
                    { "data": "ProductID", visible: false },
                    {
                        "data": "RequisID", "class": "text-left dtCheck", render: function (data, type, row, meta) {
                            return type === 'display' ?
                                '<button type="button" class="close" onclick="btnDeleteCart(' + row.RequisID + ')" aria-label="Close"><span aria-hidden="true">&times;</span></button><br><img id="blah"  class="img-responsive" width="200" height="150" src="' + row.ImgProduct + '" alt="your image" /> <h5 class="card-title">' + row.Barcode + '' + row.ProductName + '</h5><h6>' + row.Category + '</h6><p>' + row.Price + ' บาท/' + row.UnitType + ' </p>จำนวนที่ต้องการ: <input type="number" id="editNum' + row.RequisID + '" value="' + row.RequisAmount + '"> ' + row.UnitType + '<div class="float-right"><br><button class="btn btn-primary" onclick="btnUpdateCart(' + row.RequisID + ')">Update</button></div>' :
                                data;
                        }
                    },
                    { "data": "Category", visible: false, },
                    { "data": "ProductName", visible: false, },
                    { "data": "Price", visible: false, },
                    { "data": "UnitType", visible: false, },

                    { "data": "RequisAmount", visible: false, },
                    { "data": "Barcode", visible: false, }




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

function btnUpdateCart(RequisID) {
    var checkAmount;
    var checkAmountID;
    var validaAmount ;
    var RequisIdAmount = $('#editNum' + RequisID + '').val();
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ProductRequis/" + RequisID,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.table(data.ProductID);
            checkAmountID = data.ProductID;
            var setDateNow = new Date().toLocaleString();
            var formdata = {
                "RequisID": RequisID,
                "ProductID": data.ProductID,
                "Category": data.Category,
                "ProductName": data.ProductName,
                "Price": data.Price,
                "UnitType": data.UnitType,
                "Balance": data.Balance,
                "RequisAmount": RequisIdAmount, // edit req amount
                "RequisNote": data.RequisNote,
                "Date": setDateNow,
                "ImgProduct": data.ImgProduct,
                "UserID": data.UserID,
                "Barcode": data.Barcode,
                "EMP_EngName": data.EMP_EngName,
                "Position": data.Position,
                "RequisStatus": "waiting",
            }
            $.ajax({

                type: "GET",
                url: "http://localhost:60443/api/IN_Product/"+data.ProductID,
                dataType: 'json',
                headers: {
                    'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                },
                success: function (data) {   
                    
                    if(RequisIdAmount > data.Amount){
                        validaAmount = "true";
                        alert("จำวนวที่ต้องการมากเกินไป");
                        console.log(validaAmount);
                    }else{
                        validaAmount = "false";
                        console.log(validaAmount);
                        $.ajax({

                            type: "PUT",
                            url: "http://localhost:60443/api/IN_ProductRequis/" + RequisID,
                            dataType: 'json',
                            data: formdata,
                            headers: {
                                'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
                            },
                            success: function (data) {
                               // console.table(data);
        
                            },
                            error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                                // console.log("Add new product failed, error is '" + thrownError + "'");
                                alert("Edit product failed, error is '" + thrownError + "'");
                            }
        
                        }).then(function (data) {
                            console.log(data);
        
                            alert("You update success!");
                        });
                    }
           
                },
                error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                    // console.log("Add new product failed, error is '" + thrownError + "'");
                    alert("Edit product failed, error is '" + thrownError + "'");
                }
        
          
            });
   

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            // console.log("Add new product failed, error is '" + thrownError + "'");
            alert("Edit product failed, error is '" + thrownError + "'");
        }
    });

}


function btnDeleteCart(id) {
    var showCfDelete = confirm("Are you sure you want to delete this product?");
    if (showCfDelete == true) {
        txtShow = "You delete success!";

        $.ajax({

            type: "DELETE",
            url: "http://localhost:60443/api/IN_ProductRequis/" + id,
            dataType: 'json',
            headers: {
                'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
            },

            success: function (data) {
                console.log("success");
                alert(txtShow);
                location.reload();
            },
            error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                console.log("Your can't delete, error is '" + thrownError + "'");
                //window.location.href = "index.html";
            }
        });



    } else {


    }

}

function showDataLocation() {

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
            var setDataLocation = document.getElementById("setDataLocation");

            var option = document.createElement("option");
            for (var i = 0; i < data.length; i++) {


                var option = document.createElement("option");
                option.text = data[i].LocationName;

                setDataLocation.add(option, setDataLocation[i]);


            }




        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });

}

function ranBillNumber() {
    var setDateNow = new Date().toLocaleString();
    var ranBillNumber = Date.parse(setDateNow);
    var cutRanBillNumber = ranBillNumber.toString().substring(0, 11);
    var setRanBillNum = cutRanBillNumber + "" + localStorage.logUsername;
    document.getElementById("ranBillNumber").innerHTML = setRanBillNum;
}