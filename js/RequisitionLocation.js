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
            if ($('#setLocation').val() === null) {

                document.getElementById("page-content-wrapper").style.display = 'none';
       
            } else {
                document.getElementById("page-content-wrapper").style.display = 'block';
          
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

        // location.reload();
        document.getElementById("setLocation").value = setLocation.value;
        viewWarehouseData();
    });

}

