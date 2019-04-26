
// window.onload = function () {

//     var options = {
//         animationEnabled: true,
//         title: {
//             text: "GDP Growth Rate - 2016"
//         },
//         axisY: {
//             title: "Growth Rate (in %)",
//             suffix: "%",
//             includeZero: false
//         },
//         axisX: {
//             title: "Countries"
//         },
//         data: [{
//             type: "column",
//             yValueFormatString: "#,##0.0#" % "",
//             dataPoints: [
//                 { label: "Iraq", y: 10.09 },
//                 { label: "Turks & Caicos Islands", y: 9.40 },
//                 { label: "Nauru", y: 8.50 },
//                 { label: "Ethiopia", y: 7.96 },
//                 { label: "Uzbekistan", y: 7.80 },
//                 { label: "Nepal", y: 7.56 },
//                 { label: "Iceland", y: 7.20 },
//                 { label: "India", y: 7.1 }

//             ]
//         }]
//     };
//     $("#chartContainer").CanvasJSChart(options);

// }

var productAll = [];
var totalCostProduct = [];
var countLocation = 0;
function viewCost() {
    productAll = [];
  
    countLocation = 0;
    var selectLocation = $('#addsetLocation').val();
    var fDate = new Date($('#fDate').val());
    var sDate = new Date($('#sDate').val());

    var timeDiff = Math.abs(fDate.getTime() - sDate.getTime());
 
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));


    // if (fDate.getTime() > sDate.getTime()) {
    //     console.log(-diffDays);
    // } else {
    //     console.log(diffDays);
    // }




    console.log(selectLocation);
    if ($('#fDate').val() === "" || $('#sDate').val() === "") {
        console.log(fDate);
      
    } else {

        $("#showData-Cost").empty();
        console.log($('#setLocation').val());

        // <div class="table-responsive">
        //     <table id="totalCostShow" class="table table-striped table-bordered text-center">
        //         <thead>
        //             <tr>
        //                 <th>Location</th>
        //                 <th>ProductName</th>
        //                 <th>UnitType</th>
        //                 <th>Price</th>
        //                 <th>RequisAmount</th>
        //                 <th>Total</th>
        //                 <th>Date</th>
        //             </tr>
        //         </thead>
        //     </table>
        // </div>

    


        $.ajax({

            type: "GET",
            url: "http://localhost:60443/api/IN_ProductRequis?userID=all&RequisStatus=all",
            dataType: 'json',
            headers: {
                'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
            },

            success: function (data) {
                //console.log(data)
                for (var i = 0; i < data.length; i++) {
                    var cDate = new Date(data[i].Date);
                    if (data[i].RequisStatus === "finish" && cDate >= fDate && cDate <= sDate && data[i].Location === selectLocation) {
                        productAll.push({ Location: data[i].Location, ProductName: data[i].ProductName, UnitType: data[i].UnitType, Price: data[i].Price, RequisAmount: data[i].RequisAmount, Total: parseInt(data[i].Price) * parseInt(data[i].RequisAmount), Date: data[i].Date })
                    }
                }
                console.log(productAll);
                countLocation = 0;
          
              
 

                for (var i = 0; i < productAll.length; i++) {
                    if(productAll[i].Location === selectLocation){
                        countLocation += productAll[i].Total;
                    }
                }

             
                var tagTable = "";
                tagTable += "Total: <h4>";
                tagTable += countLocation;
                tagTable += "</h4>";
                tagTable += '<table id="totalCostShow" class="table table-striped table-bordered text-center dtCheck "style="width:100%">'
                tagTable += " <thead> <tr>   <th>Location</th>  <th>ProductName</th>  <th>UnitType</th>  <th>Price</th>  <th>RequisAmount</th>  <th>Total</th> <th>Date</th> </tr></thead>"
                tagTable += '</table>'
                $("#showData-Cost").append(tagTable)

           
                console.log(countLocation);
                // console.table(data);

                // console.log(allProduct[0].split(",")[0]);

                var datatable = $('#totalCostShow').DataTable({
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
                        { "data": "Location" },
                        { "data": "ProductName" },
                        { "data": "UnitType" },
                        { "data": "Price" },
                        { "data": "RequisAmount" },
                        { "data": "Total" },
                        { "data": "Date" }
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
}

function calDate() {
    var dateFirst = new Date("2019-03-25T08:45:28");
    var dateSecond = new Date("2019-04-18T09:13:26");

    // time difference
    var timeDiff = Math.abs(dateSecond.getTime() - dateFirst.getTime());

    // days difference
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    console.log(diffDays);
}



$.ajax({

    type: "GET",
    url: "http://localhost:60443/api/IN_Location?siteName=" + localStorage.logSite,
    dataType: 'json',
    headers: {
        'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
    },
    success: function (data) {

        //  console.log(data[0].UnitTypeName);
        //  location.reload();

        var addsetLocation = document.getElementById("addsetLocation");
        var option = document.createElement("option");
        for (var i = 0; i < data.length; i++) {


            var option = document.createElement("option");
            option.text = data[i].LocationID + "," + data[i].LocationName;


            addsetLocation.add(option, addsetLocation[i]);

        }




    },
    error: function (jqXHR, xhr, ajaxOptions, thrownError) {
        console.log("Add new Stockcard failed, error is '" + thrownError + "'");
        //alert("Add new product failed, error is '" + thrownError + "'");
    }

});
