//編集エリアのカスタマイズ+++++++++++++++++++++++++++++
class EditViewClass{
  constructor(trackerName) {
    //div#update
    this.ids = new ViewCustomClass();
    this.yaml_Customer = null;
    this.yaml_Format = null;

    this.yaml_address = null;
    this.yaml_Conditons = null;
    this.yaml_ConditonsCheck = null;
    this.yaml_Description = null;

    //Promise.resolve()

    Promise.all([
      YamlClass.ReadPathPromise("/redmine/projects/m/wiki/Format.txt"),
      YamlClass.ReadPathPromise("/redmine/projects/m/wiki/Customer.txt")
    ]).then((result)=>{

      this.yaml_Format = result[0];
      this.yaml_Customer = result[1];

      console.log("b");

      this.init(trackerName);
    });
  }

  /**/
  SubmitCheck(trackerName,callback){
      //番号のチェック
      //yamlのチェック
      callback("");
      return;

        let dst;
        let src = jsyaml.load($(`textarea#issue_custom_field_values_${this.ids.conditionsID}`).val()),
            reg = jsyaml.load(this.yaml_ConditonsCheck);

          if(reg == null) {
            alert("null");
            dst = "null";
          }else{
            dst= YamlClass.Check(src, reg);
          }
          callback(dst);
  }

  /**/
  init(trackerName){
    /*トラッカー連動部*/
    if(trackerName != "Default"){
      this.yaml_Conditons = YamlClass.Parse(this.yaml_Format , [trackerName,"Conditons"]);
      this.yaml_ConditonsCheck = YamlClass.Parse(this.yaml_Format , [trackerName,"ConditonsCheck"]);


      //フォームの順番の入れ替え
      $('#issue_subject').parent()
        .before($('#issue_status_id').parent().parent().parent()).before("<Hr>");
      $('#issue_description_and_toolbar').parent()
        .after("<p id=\"u_description\"></p>");

      $('textarea#issue_description.wiki-edit').attr("rows","3");

          //let id = $('#issue_subject').parent();
          //let id2 = $('div#attributes.attributes');

      $('label[for="issue_assigned_to_id"]').html('次の回覧先');

          //id.before($('#issue_status_id').parent());
          //id.before($('#issue_assigned_to_id').parent());
          //id.before($('#issue_priority_id').parent());
          //id.before($('#issue_priority_id').parent());

      //フォームサイズの変更
      let size = "5"
      $(`textarea#issue_custom_field_values_${this.ids.conditionsID}`).attr("rows",size );
      $(`textarea#issue_custom_field_values_${this.ids.resultID}`).attr("rows", size );
      $(`textarea#issue_custom_field_values_${this.ids.addresseeID}`).attr("rows", size );

      //ボタンの追加


      //カスタマーの選択式置き換え
      ((id)=>{
        let inputlist = '<datalist id="kansai1">';
        for(let key in this.yaml_Customer){
          inputlist += `<option value="${key }"></option>`;
        }
        inputlist += '</datalist>';
        id.parent().append('<input type="text" list="kansai1" id="userid1">'+inputlist);
        $('#userid1').change(()=>{
          id.val($('#userid1').val());
        });
        id.hide();
      })($("#issue_custom_field_values_17"));

      //自動採番 newの時だけ
      let autonum = new AutoNumberingClass();
      $('label[for="issue_subject"]').html('管理番号<span class="required"> *</span>');

      if($("body").hasClass("action-new")){
        //Draft
        autonum.AutoNumbering((text)=>{
          $("#issue_subject").val(text)
            .prop("readonly", true)
            .prop("style", "background-color:lightgray");
        });
      }else{
            //$("#issue_subject").val("");
      }

      //説明の動的表示
      //テンプレートのボタンと呼び出し
      //$(".jstElements").hide(); //説明のtoolbar消す

      $('div#attributes.attributes')
          .append("<p><label></label><input id =\"readtemp\" type=\"button\" value=\"テンプレート読込\"></p>");

      $('#readtemp').click(()=> {

        if(this.yaml_Conditons!= null)
          $(`textarea#issue_custom_field_values_${this.ids.conditionsID}`).val(this.yaml_Conditons);

        let ccode = $(`#issue_custom_field_values_${this.ids.customerID}`).val();
        this.yaml_address =  YamlClass.Parse(this.yaml_Customer, [ccode , "address"]);
        if(this.yaml_address!= null)
          $(`textarea#issue_custom_field_values_${this.ids.addresseeID}`).val(this.yaml_address);

      });

      this.yaml_Description = YamlClass.Parse(this.yaml_Format, [trackerName,"Description"]);
      if(this.yaml_Description!= null)
        $("#u_description").html(this.yaml_Description);

      //Conditionsのチェック changeでもいいかも


      var checkconditons = (()=>{
        let id = $(`textarea#issue_custom_field_values_${this.ids.conditionsID}`);
        let dst = "";
        let src = jsyaml.load(id.val()),
            reg = jsyaml.load(this.yaml_ConditonsCheck);
        console.log(YamlClass.Check(src, reg));
     
        if(reg == null) {
              //dst = "null";
          console.log("null");
        }else{
          dst= YamlClass.Check(src, reg);
          if(dst != ""){
            console.log("red");
            id.css("color","red");
          }
          else{
            console.log("black");
            id.css("color","black");
          }
        }

      });
　　　$(`textarea#issue_custom_field_values_${this.ids.conditionsID}`).keyup(()=>{
        checkconditons();
      });


      //署名欄
/*
      let signat = $('div#attributes.attributes');
      for(let i of this.ids.sign_array){
        let hoge = $(`#issue_custom_field_values_${i}`);
        if(hoge){
          signat.append($(`#issue_custom_field_values_${i}`).parent());
          SignClass.Set(hoge);
        }
      }
*/
      /*トラッカー非連動部*/
      if(trackerName != "Default"){
      }else{
      }
    }
  }
}
