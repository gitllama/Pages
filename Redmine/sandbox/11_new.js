$(()=>{

//入力formがなかった際にskipする処理必要
//#issue-form等

  console.log("issues view customize ver 0.6");

  //現在選択されているものをもとに初期値
  var previewTracker,
      editTrackerID = $('#issue_tracker_id').val(), 
      editTrackerName = $('#issue_tracker_id option:selected').text(),
      trackerChanged = false;

  $(document).ajaxError((e, jqxhr, settings, exception)=>{
    //settings.dataType=='script'を指定することで、scriptファイル読み込みエラー時限定で処理を行う
    if (settings.dataType=='script') {
      alert( "スクリプトファイルの読み込みに失敗しました。" );
    }
  });

  
/*----------------------------------------------------------------------*/
  //Previewの描画
  RedrawPreview();

/*----------------------------------------------------------------------*/  

  //サブミットチェック
/*
  $(document).submit((e)=>{
    //デフォルトの処理をキャンセル
    e.preventDefault();
    var _this = $(this);

    evc.SubmitCheck(editTrackerName,(dst)=>{
      if(dst =="") _this.submit();
      else alert(dst);
    });
  });
*/
/*----------------------------------------------------------------------*/
  //ポップアッププレビュー
  $('#issue-form').append("<span> / </span><a href=\"#\" id=\"preview_b\">プレビュー</a>");
  $('#preview_b').click(()=>{
    var childWin = window.open("", "", "");
    childWin.document.write("<body></body>");
      $(childWin.document).find("body").append("<div>aaa</div>"); 
    });

/*----------------------------------------------------------------------*/
  //Editの描画
  var evc = new EditViewClass(editTrackerName);

  //トラッカーIDが変わった場合に初期値を切り替え登録
  //差し替え処理フックし完了後再描画
  $(document).on('change', '#issue_tracker_id',()=>{
    editTrackerID = $('#issue_tracker_id').val();
    editTrackerName = $('#issue_tracker_id option:selected').text();           
    trackerChanged = true;
  });
  
  let _replaceIssueFormWith = replaceIssueFormWith; //関数を別名で退避
  replaceIssueFormWith = (html) =>{
    _replaceIssueFormWith(html);                    //退避下関数呼び出し
    if (trackerChanged){
      $('#issue_tracker_id').val(editTrackerID);
      evc.init(editTrackerName);
    }
    trackerChanged = false;
  };
  //RedrawEditView(editTrackerName); //読み出し時表示変更



  //エリア外のカスタマイズ+++++++++++++++++++++++++++++
  function RedrawOther(){



  }
});
