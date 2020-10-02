/*
チケット一覧で期日を過ぎたものは赤字
*/
$(()=>{

  console.log("View customizes 4");

  $("td.cf_6.text").css('text-align', 'left');

  $.each($("td.cf_6.text"), (index, value)=>{

      var hoge = $(value).children().text();
      $(value).children().html("<pre>"+hoge +"</pre>");
  })



/*
  $.each($('td.due_date'), (index, value)=>{

      var a = new Date($(value).text());
      var b = new Date();
      if(a<b) $(value).parent().css('color', 'red');      
  })
*/
  $.each($('tr'), (index, value)=>{

      if( $(value).hasClass("overdue")) $(value).css('color', 'red');      
  })
});


    // classから進捗の値を取得(progress-値 となっている)
/*    
var match = target.attr('class').match(/progress-([0-9]+)/);
    if (!match) {
      return;
    }

    // 値を追記して表示
    var value = match[1];
    target.after($('<p>').text(value));
 */
