function addNewStockcard() {
            var now = new Date();         var setDateNow = moment(now).format('YYYY-MM-DD HH:mm:ss');
    var formdata = {
        StockCardID: 1,
        Date: setDateNow,
        UserID: "sample string 2",
        StockCardCategory: "sample string 3",
        ProductID: 1,
        Amount: 1,
        Balance: 1,
        ProductName: "sample string 4",
        Price: 1,
        UnitType: "sample string 5",
        Category: "sample string 6",
        SITES: localStorage.logSite
    }

    $.ajax({

        type: "POST",
        url: "http://localhost:60443/api/IN_StockCard",
        dataType: 'json',
        data: formdata,
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.table(data);
          //  location.reload();
        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
             console.log("Add new Stockcard failed, error is '" + thrownError + "'");
            //alert("Add new product failed, error is '" + thrownError + "'");
        }

    });
}