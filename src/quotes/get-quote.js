
function GetQuote(symbol) {
    $.ajax({
        type: 'GET',
        url: 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22' + symbol.value + '%22)%0A%09%09&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env',
        crossDomain: true,
        dataType: 'xml',
        success: parseXml
        });
                
    function parseXml(xml){
        var price = $(xml).find('LastTradePriceOnly').text();
        var tradeDate = formatDate($(xml).find('LastTradeDate').text());
        var tradeTime = $(xml).find('LastTradeTime').text();
        var sname = $(xml).find('Name').text();
        var symbol = $(xml).find('Symbol').text();
        var quote = document.getElementById("quote");
        var quoteTime = document.getElementById("quoteTime");
                
        quote.textContent = sname +"(" + symbol + "): " + price;
        quoteTime.textContent = "Last Trade: " + tradeDate +" " + tradeTime;
    }
    
    function formatDate(textDate){
        var date = new Date(textDate);
        return date.toDateString();
    }
}