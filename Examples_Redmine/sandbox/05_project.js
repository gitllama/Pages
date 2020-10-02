$(()=>{

  console.log("View customizes 5");

  // REST APIのキー
  //headers: { 'X-Redmine-API-Key': apiKey },

  let pj = "171hsyu";
  let trackerID_Orders = 15;
  let trackerID_Shipment = 13;
  //表示
  $('#content')
   .append("<div><span>2017年度上期</span></div>")
   .append("<div><span>  受注計：</span><span id=\"orders\" /></div>")
   .append("<div><span>  出荷計：</span><span id=\"shipment\" /></div>")
   .append("<div><span>  金額計：</span><span id=\"test3\" /></div>")
   .append("<div id=\"u_result\"></div>")
   .append("<div id=\"u_result2\"></div>");

  $('#orders').text(`${10}(dummy)`);
  $('#shipment').text(`${20}(dummy)`);

  SummaryOrders((result, list)=>{
    $('#orders').text(result);
    $('#u_result').html(list);
  },"2017");
  
  SummaryShipment((already, notyet, list)=>{
    $('#shipment').text(`済${already} , 未${notyet}`);
    $('#u_result2').html(list);
  },"2017");
  
  //年度の集計
  function SummaryOrders(func, year){
    //?project_id=2&key=XXXX
    //Openした瞬間に集計
    //var _url = '/redmine/issues.json?project_id='+pj+"&tracker_id=13";

    let _url = "/redmine/issues.json?limit=20"
             + `&created_on=%3E%3D${year}-04-01` //(uncrypted filter is ">=2012-03-01") %3E%3D
             + `&tracker_id=${trackerID_Orders}`;

    $.ajax({ type: 'GET', url: _url , dataType: 'json'}).done((data)=>{
      $.getScript("https://cdnjs.cloudflare.com/ajax/libs/js-yaml/3.4.2/js-yaml.min.js", ()=>{

        console.log(`url : ${_url}`);
        console.log(`total_count : ${data["total_count"]}`);
        //console.log(JSON.stringify(data));

        let total = 0;
        let list = "<ul>";

        for(let key in data["issues"]){
          let id         = data["issues"][key]["id"],
              subject    = data["issues"][key]["subject"],
              created_on = data["issues"][key]["created_on"],
              customercode= GetKeyValue(data["issues"][key]["custom_fields"], 'name', 'CustomerCode')[0]["value"],
              conditions = jsyaml.load(GetKeyValue(data["issues"][key]["custom_fields"], 'name', 'Conditions')[0]["value"]);

          console.log(`${key} : #${id}, ${subject}`);

          if(!conditions) continue;
          if(!(conditions["Details"])) continue;

            for(var index of (conditions["Details"])){
              let UnitPrice = parseInt(String(index["UnitPrice"]).split(',').join('')),
                  Quantity  = parseInt(String(index["Quantity"]).split(',').join(''));
                  hogehoge  = UnitPrice * Quantity;
              let hoge = `${index} : ${index["UnitPrice"]} x ${index["Quantity"]} = ${hogehoge}`;
        
              list += `<li>${key} : #${id}, ${subject}, ${created_on}, ${customercode}, ${UnitPrice} x ${Quantity}</li>`
              total += hogehoge;
            }

        }
        //金額の表示
        func(total.toLocaleString(), list + "</ul>");
      });
    }).fail((data)=>{
      alert('失敗しました');
    });
  }
  //年度の集計
  function SummaryShipment(func, year){

    let _url = "/redmine/issues.json?limit=100&status_id=*" //完了分も読む
             + `&start_date=%3E%3D${year}-04-01` //(uncrypted filter is ">=2012-03-01") %3E%3D
             + `&tracker_id=${trackerID_Shipment}`;

    $.ajax({ type: 'GET', url: _url , dataType: 'json'}).done((data)=>{
      $.getScript("https://cdnjs.cloudflare.com/ajax/libs/js-yaml/3.4.2/js-yaml.min.js", ()=>{

        console.log(`url : ${_url}`);
        console.log(`total_count : ${data["total_count"]}`);
        console.log(JSON.stringify(data));

        let already = 0;
        let notyet = 0;
        let list = "<ul>";

        for(let key in data["issues"]){
          let id         = data["issues"][key]["id"],
              subject    = data["issues"][key]["subject"],
              created_on = data["issues"][key]["created_on"],
              customercode= GetKeyValue(data["issues"][key]["custom_fields"], 'name', 'CustomerCode')[0]["value"],
              conditions = jsyaml.load(GetKeyValue(data["issues"][key]["custom_fields"], 'name', 'Conditions')[0]["value"]),
              status = data["issues"][key]["status"]["name"];

          console.log(`${key} : #${id}, ${subject}`);

          if(!conditions) continue;
          if(!(conditions["Details"])) continue;

            for(var index of (conditions["Details"])){
              let Quantity  = parseInt(String(index["Quantity"]).split(',').join(''));

        
              list += `<li>${key} : #${id}, ${subject}, ${created_on}, ${customercode}, ${status}, ${Quantity}</li>`
              if(status == "終了"){
                already += Quantity;
              }else{
                notyet += Quantity;
              }
            }

        }
        //金額の表示
        func(already, notyet, list + "</ul>");
      });
    }).fail((data)=>{
      alert('失敗しました');
    });
  }
  
  function GetKeyValue(dataAry, key, value) {
    var result = $.grep(dataAry, function (e) {
      return e[key] == value;
    });
    return result;
  }

      //console.log(Object.keys(data).length);
  
      //$('#content').append("<pre>a" + $(data).find("project").name() + "</pre>");
      //$('#content').append("<pre>"+data+"</pre>");
      
});
