$(()=>{
  console.log("View customizes 9 gantt");
  
  $.getScript("https://cdnjs.cloudflare.com/ajax/libs/js-yaml/3.4.2/js-yaml.min.js", ()=>{
    $.each($('div.task.leaf.label'), (index, value)=>{

      //console.log($(value).text());

      let head = ".issue-subject[style*='top:" + $(value).css('top') +";']";    
      let _url = `/redmine/issues/${$(head).attr("id").split("-")[1]}.json`;
      //console.log(_url);

      $.ajax({ type: 'GET', url: _url , dataType: 'json'}).done((data)=>{
        
        //console.log(data["issue"]["id"]);
        //console.log(JSON.stringify(data["issue"]));

        let customercode= GetValueFromName(data["issue"]["custom_fields"], 'CustomerCode'),
            conditions = jsyaml.load(GetValueFromName(data["issue"]["custom_fields"], 'Conditions')),
            models     = "";



        if(!conditions) return true; //.eachはcontinue効かないので。breakはfalse
        if(!(conditions["Details"])) return true;

        for(var index of (conditions["Details"])){
          models += index["Model"];
        }

        $(head).append(" / " + customercode ) ;
        $(value).text(models);


      }).fail((data)=>{
        alert('失敗しました');
      });

    });
  }).fail(()=>{
    alert("[LOG] $.getScript cannot load exist.js");
  });

  function GetValueFromName(dataAry, value) {

    if(!dataAry) return undefined;

    var result = $.grep(dataAry, (e)=> { 
      return e["name"] == value; 
    });

    return result[0]["value"];
  }


});
