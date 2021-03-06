$(document).ready(function () {
    ddlLocation();


});

function ddlLocation() {
    document.getElementById('setLocation').value = localStorage.logSetLocation;
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
            document.getElementById("showNameLocation").innerHTML = localStorage.logSetLocation.split(",")[1];
            if ($('#setLocation').val() === null) {

                document.getElementById("page-content-wrapper").style.display = 'none';


            } else {
                document.getElementById("page-content-wrapper").style.display = 'block';
                viewWarehouseData()

            }



        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });
}

function viewWarehouseData() {
    if ($('#setLocation').val() === null) {

        document.getElementById("page-content-wrapper").style.display = 'none';
    } else {
        document.getElementById("page-content-wrapper").style.display = 'block';
    }
    $("#showDataPD-Location").empty();
    console.log($('#setLocation').val());

    var tagTable = "";
    tagTable += '<table id="example" class="table table-striped table-bordered text-center dtCheck "style="width:100%">'
    tagTable += " <thead> <tr> <th>ReceiverID</th>  <th>ProductName</th>  <th>ReqAmount</th>  <th>Price</th>  <th>Total</th>  <th>ReqTime</th> <th>Action</th> </tr></thead>"
    tagTable += '</table>'
    $("#showDataPD-Location").append(tagTable)

    console.log(localStorage.logSetLocation.split(",")[0]);

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ReceiverLocationID/" + localStorage.logSetLocation.split(",")[0],
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.log(data);
            console.log(localStorage.logSetLocation.split(",")[0]);
            var getDataReceiverLC = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].Status === "pending") {
                    getDataReceiverLC.push(data[i]);
                }
            }

            if (getDataReceiverLC.length === 0) {
                document.getElementById('btnApprovePD').style.visibility = 'hidden';
            }

            console.log(getDataReceiverLC);
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
                "data": getDataReceiverLC,
                "columns": [
                    { "data": "ReceiverID", },
                    { "data": "ProductName", },
                    { "data": "ReqAmount", },
                    { "data": "Price", },
                    { "data": "Total", },
                    { "data": "ReqTime", },
                    {
                        "data": "ReceiverID", render: function (data, type, row, meta) {
                            return type === 'display' ?
                                '<button type="button" class="btn btn-danger" onclick="btnDelete(' + row.ReceiverID + ')">Delete</button>' :
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



function btnDelete(id) {

    $.ajax({

        type: "DELETE",
        url: "http://localhost:60443/api/IN_Receiver/" + id,
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
        document.getElementById("setLocation").value = localStorage.logSetLocation;
        viewWarehouseData();
    });

}

function goBack() {
    window.location.href = "locationSite.html";
}

function approvePD() {
    window.location.href = "reqSignature.html";
    var arrayApprovePD = [];
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_ReceiverLocationID/" + localStorage.logSetLocation.split(",")[0],
        dataType: 'json',

        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].Status.toLowerCase() === "pending") {
                    arrayApprovePD.push(data[i]);
                }
            }

            console.table(arrayApprovePD);
      



        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            // console.log("Add new product failed, error is '" + thrownError + "'");
            alert("Edit product failed, error is '" + thrownError + "'");
        }

    })

}

// function checkPD(dataPD) {

//     $.ajax({

//         type: "GET",
//         url: "http://localhost:60443/api/IN_ProductLocationViewPD/" + localStorage.logSetLocation.split(",")[0],
//         dataType: 'json',

//         headers: {
//             'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
//         },
//         success: function (data) {
     

//             console.table(data);
      



//         },
//         error: function (jqXHR, xhr, ajaxOptions, thrownError) {
//             // console.log("Add new product failed, error is '" + thrownError + "'");
//             alert("Edit product failed, error is '" + thrownError + "'");
//         }

//     })


// }