</script><script type="text/babel">



var Form = JSONSchemaForm.default;
var schema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: {type: "string", title: "Title", default: "A new task"},
    done: {type: "boolean", title: "Done?", default: false}
  }
};
var log = (type) => console.log.bind(console, type);

var JSONForm  = React.createClass({
  render: function() {
    return( 
      <Form schema={schema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")} />
    )
  }
});



console.log(jsyaml.dump(schema));


//コンポーネントの作成

var Comment = React.createClass({
  rawMarkup: function() {
    return {__html: marked(this.props.text.toString(), {sanitize: true})};
  },
  render: function() {
    return (
      <div className="comment">
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  },
  componentWillReceiveProps: function() {
    $("#q").val(this.props.text.toString());
    console.log("componentWillReceiveProps1");
  }
});




var CommentBox = React.createClass({
  getInitialState() {
　  return { textValue: "initial value" };
  },
  changeText(e) {
    this.setState({textValue: e.target.value});
  },
  render: function() {
    return (
      <div className="commentBox">
        <h2>Reactとか練習場</h2>
        <span>markdown viewer</span><br/>
        <textarea id="Text1" type="text" rows="10" cols="40" value={this.state.textValue} onChange={this.changeText}/>
        <Comment text={this.state.textValue}/>
      </div>
    );
  }
});
 


var Temp = React.createClass({
  render: function() {
    return(
  <div className="temp">
    <CommentBox/>
    <JSONForm  />
  </div>
    );
  },
  componentDidMount: function() {
    // 描画が成功して、DOMにアクセス可能になる
    //document.addEventListener('click', this._popupClose);
    //window.addEventListener('resize', this._windowResize);
    console.log("componentDidMount");
  },
  componentWillReceiveProps: function() {
    // プロパティ(props)が変更された時
    //$("#q").val("")
    console.log("componentWillReceiveProps");
  },
  componentWillUnmount: function() {
    // コンポーネントが破棄される時に呼び出される
    //document.removeEventListener('click', this._popupClose);
    //window.removeEventListener('resize', this._windowResize);
    console.log("componentDidUnmount");
  }

});



//レンダリング 
ReactDOM.render((
  <Temp />
), $(".splitcontentright")[0]);


/*
const hoge = (name) => {
  console.log(name);
};
  hoge("home page");
  hoge($.fn.jquery);
    ReactDOM.render(
        <a href="http://192.168.1.33/redmine/projects/171hsyu/issues/gantt?utf8=%E2%9C%93&set_filter=1&gantt=1&f%5B%5D=&query%5Bdraw_relations%5D=0&query%5Bdraw_relations%5D=1&query%5Bdraw_progress_line%5D=0&months=6&month=4&year=2017">上半期出荷ガント</a>,
        $(".splitcontentright")[0]
    );
*/
