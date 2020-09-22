/*
  閲覧エリアのカスタマイズ
*/
function RedrawPreview()
{
  let ids = new ViewCustomClass();

  //Previewの描画判定
  //defaultトラッカー以外なら再描画して抜ける
  let classVal = $('.issue').attr('class');
  if (!classVal) return false;

  let trackerVal = classVal.match(/tracker-([\s\S]*?) /)[1]; 
  if(trackerVal == ids.defaulttracker ) return false;

  //バーコード表示
    $.getScript("/libs/jquery-barcode.js", ()=>{
      $('.subject').after("<div id=\"barcodetarget\"/>");
      $('#barcodetarget').barcode($('.subject div h3').text(), 'code39');
    });
    
    //Conditions/Resultエリアのyaml表示
    for(let c of [ids.conditionsID, ids.resultID]) {
      let _c = $(`.cf_${c}.attribute`);
      _c.parent().parent().append(_c);
      _c.children('.value').html(`<pre>${jQuery.trim(_c.children('.value').text())}</pre>`);
    }
    
    //署名の表示
    let signparent = $(`.cf_${ids.sign_array[0]}.attribute`).parent().parent();
    for(let i of ids.sign_array){
      var hoge = $(`.cf_${i}.attribute`).children('.value');
      signparent.append(hoge.parent()); 
      SignClass.ToImg(hoge);

    }

    
    //プレビュー画面の表示テスト
    //$('#history').append("<iframe src=\"/rc.html\" width=\"100%\"></iframe>");

}
