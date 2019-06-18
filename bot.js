// LINE Developersに書いてあるChannel Access Token
var CHANNEL_ACCESS_TOKEN = "SLAhIkWHD7LvapekzfWvBdYgGGaOQVnE6jGvIM55L3NU3h34uKirFW35vrFracMKKIqqb8KGT0dvfZ0Gq6Pa2eHbyDBQ6bc8MYVBmXBXS5BFJtnQXjRsdZLF5Ix8xTbBgU19bpUjdGadYsLELYvn1QdB04t89/1O/w1cDnyilFU="
var to = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(2,1).getValue();

//送信するメッセージ定義する関数を作成します。
function createMessage() {
  var message = "明日、15日は洗濯機の洗浄の日だよ！洗浄が終わるまで洗濯は我慢してね(>_<)\n\n洗浄が出来ないと、洗濯槽に汚れが溜まって、洗っても服が汚れちゃうんだ...\n\nみんなの洗濯物を綺麗に洗うために協力お願いします☆☆";
  return push(message);
}

function push(text) {
  var url = "https://api.line.me/v2/bot/message/push";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };
  
  var postData = {
    "to" : to,
    "messages" : [
      {
        'type':'text',
        'text':text,
      }
    ]
  };
  
  var options = {
    "method" : "post",
    "headers" : headers,
    "payload" : JSON.stringify(postData)
  };
  
  return UrlFetchApp.fetch(url, options);
}

function doPost(e){
  var json = JSON.parse(e.postData.contents);
  var UID = json.events[0].source.userId;
  var GID = json.events[0].source.groupId;
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getRange(2,1).setValue(GID);
  
}
