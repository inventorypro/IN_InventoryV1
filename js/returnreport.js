//Return Report
// $(document).ready(function () {
var productAll = [];
function viewReport() {
    productAll = [];
    var selectTopic = $('#addsetTopic').val();

    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_StockCardSITE?siteName=" + localStorage.logSite,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            console.log(data)
            for (var i = 0; i < data.length; i++) {
                if (data[i].StockCardCategory === selectTopic.split(",")[1]) {
                    productAll.push({ Date: data[i].Date, ProductID: data[i].ProductID, ProductName: data[i].ProductName, Amount: data[i].Amount, Comment: data[i].Comment })
                }
            }
            console.log(productAll);
            // countLocation = 0;


            // var tagTable = "";
            // tagTable += '<table id="reportShow" class="table table-responsive table-striped table-bordered text-center dtCheck "style="width:100%">'
            // tagTable += " <thead> <tr>   <th>Date</th>  <th>ProductID</th>  <th>ProductName</th>  <th>Amount</th>  <th>Comment</th> </tr></thead>"
            // tagTable += '</table>'
            // $("#showData-Return").append(tagTable)


            //console.log(countLocation);
            // console.table(data);

            // console.log(allProduct[0].split(",")[0]);

            var datatable = $('#reportShow').DataTable({
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

                "data": productAll,
                "columns": [
                    { "data": "Date" },
                    { "data": "ProductID" },
                    { "data": "ProductName" },
                    { "data": "Amount" },
                    { "data": "Comment" }
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
}


$.ajax({

    type: "GET",
    url: "http://localhost:60443/api/IN_Topic",
    dataType: 'json',
    headers: {
        'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
    },
    success: function (data) {

        //  console.log(data[0].UnitTypeName);
        //  location.reload();

        var addsetTopic = document.getElementById("addsetTopic");
        var option = document.createElement("option");
        for (var i = 0; i < data.length; i++) {


            var option = document.createElement("option");
            option.text = data[i].Id + "," + data[i].Name;


            addsetTopic.add(option, addsetTopic[i]);

        }




    },
    error: function (jqXHR, xhr, ajaxOptions, thrownError) {
        console.log("Add new Stockcard failed, error is '" + thrownError + "'");
        //alert("Add new product failed, error is '" + thrownError + "'");
    }

});
// })