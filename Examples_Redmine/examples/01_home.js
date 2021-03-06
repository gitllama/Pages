/*
Path pattern: /$
Type: JavaScript
*/
</script>

  <script src="https://unpkg.com/react@15.6.1/dist/react.min.js"></script>
  <script src="https://unpkg.com/react-dom@15.6.1/dist/react-dom.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.7.2/redux.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-redux/5.0.6/react-redux.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.38/browser.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/immutable/3.8.1/immutable.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/js-yaml/3.4.2/js-yaml.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.31.2/react-bootstrap.min.js"></script>

  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

  <script type="text/babel">

  let {
      Button,FormGroup,FormControl,
      PageHeader, FieldGroup,
      Grid, Row, Col, Jumbotron, Table,
      Panel, Label, Alert
  } = window.ReactBootstrap;

  const addrdebug = "http://192.168.1.xx";
  const apikey = "";

  const defaultState = {
    userid : "-1",
    username : "null",
    onload : false,
    conditions : "",
    result : "",
    chartdata : null
  };
  const initialState = Immutable.Map(defaultState);

  /******** Action, Action Creators, Reducers, store ********/

  const usercheck =(i)=>({ type: 'USERCHECK', value: i });
  const chartupdate =(i)=>({ type: 'CHART', value: i });
  const submit =(i)=>({ type: 'SUBMIT', value: i });
  const onload =()=>({ type: 'ONLOAD'});
  const catcherr =(i)=>({ type: 'ERR', value : i});

  const reducers = {
    'ERR' : (state, action) => {
      console.log(action.value.error);
      return state.set('onload', false)
    },
    'ONLOAD' : (state, action) => (
      state.set('onload', true)
    ),
    'CHART' : (state, action) => (
      state.withMutations(m => (
        m.set('onload', false)
        .set('chartdata', action.value.chartdata)
      ))
    ),
    'SUBMIT' : (state, action) => (
      state.withMutations(m => (
        m.set('onload', false)
        .set('conditions', action.value.conditions)
        .set('result', action.value.result)
      ))
    ),
    "@@redux/INIT" : (state, action) =>{
        // let a = "",
        //     b = "";
        // await new Promise(done => {
        //   let _url = `${addrdebug}/redmine/users/current.json?key=${apikey}`;
        //   fetch(_url).then(response => response.json())
        //   .then(json => {
        //     console.log(state)
        //     a =  json.user.id,
        //     b = json.user.login
        //   });
        // })
        // return await Promise.resolve({
        //   ...state,
        //   userid : a,
        //   username : b
        // })
        return state;
    },
  };

  const store = Redux.createStore((state = initialState, action)=>{
    return reducers[action.type]
          ? reducers[action.type](state, action)
          : state;
  });


  /******** React Components ********/

  const mapStateToProps =(state)=>({ state : state });


  //input

  const InputComponent = ReactRedux.connect(mapStateToProps)( class InputComponent extends React.Component {
    onSubmit(){
      let _id = ReactDOM.findDOMNode(this.refs.ticket).value;
      let conditions = "";
      let result = "";

      let _url = `${addrdebug}/redmine/issues/${_id}.json?format=json&include=relations,attachments`;

      this.props.dispatch(onload());

      fetch(_url).then(response => response.json())
      .then(json => {
        console.log(json);
        for(let i of json.issue.custom_fields){
          switch(i.name){
            case 'Conditions':
              conditions = i.value;
              break;
            case 'Result':
              result = i.value;
              break;
            default:
              break;
          }
        }
        this.props.dispatch(submit({
          conditions : conditions,
          result : result
        }));
      })
      .catch((err)=>{
        console.log(err);
        this.props.dispatch(catcherr({
          error : err
        }));
      });
    }
    render() {
      return (
        <div>
          <table border="0">
            <tr>
              <td> <label>ticket No</label> </td>
              <td> <input type="text" ref="ticket" defaultValue={"444"} /> </td>
            </tr>
          </table>
          <button onClick={this.onSubmit.bind(this)}>submit</button>
        </div>
      );
    }
  });

  //chart

  const ChartView = ReactRedux.connect(mapStateToProps)(class Chart extends React.Component {
    componentDidUpdate(prevProps, prevState){
      let hoge = this.props.state.get('chartdata');
      if(hoge == null) return;

      //Plotだと重ねてしまう
      Plotly.newPlot(
        ReactDOM.findDOMNode(this.refs.stage),
        hoge,
        {
          title: 'the number of units sold transitions',//'販売個数推移',
          xaxis: {
            showgrid: true,
            //tickformat: xTickFormat
          },
          yaxis: {
            title: 'count',
            showgrid: true,
            //range: [0,100]
          },
        }
      );
    }
    render() {
      const hoge =(flag)=>{
        if(flag){
          return(
            <div>Now Loading...</div>
          );
        }else{
          return(
            <div>
            </div>
          );
        }
      }
      return (
        <div>
          {hoge(this.props.state.get('onload'))}
          <div style={{width:"640px",height:"480px"}} ref="stage"></div >
        </div>
      );
    }
  });

  //app

  const App = ReactRedux.connect(mapStateToProps)(class uApp extends React.Component {
    componentDidMount(){
      let _url = `${addrdebug}/redmine/issues.json?limit=100&status_id=*`
               + `&start_date=%3E%3D2017-04-01`
               + `&tracker_id=13`;
               //(uncrypted filter is ">=2012-03-01") %3E%3D
               //完了分含む（破棄も入る
      this.props.dispatch(onload());
      fetch(_url).then(response => response.json())
      .then(json => {
        let x = ["2017-04","2017-05","2017-06","2017-07","2017-08",
                "2017-09","2017-10","2017-11","2017-12","2018-01","2018-01","2018-03","2018-04"];
        let y = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

        //チケットの列挙
        for(let i of json.issues){
          //日付の取出し
          let setdate = -1;
          for(let d in x){
            if((i.start_date >= x[d] + "-01") && (i.start_date < x[d+1] + "-01"))
              setdate = d;
          }
          if(setdate < 0){
            console.log("err");
            return;
          }
          //チップの数のカウント
          let yaml = jsyaml.load(i.custom_fields[0].value);
          if(yaml)
            if(yaml.Details){
              y[setdate] += yaml.Details.reduce((sum, current)=>{
                return { Quantity : sum.Quantity + current.Quantity};
              }).Quantity;
            }
        }
        //累計計算
        let y2 =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
          .map((element, index)=> element + (y.slice(0, index+1).reduce((sum, current) => sum + current)));

        this.props.dispatch(chartupdate({
          chartdata : [{
            x : x,
            y : y,
            type: 'plot',
            name: 'Single month'//'単月個数推移'
          },{
            x : x,
            y : y2,
            type: 'plot',
            name: 'Cumulative total'//'今年度累計'
          }],
        }));
      })
      .catch((err)=>{
        console.log(err);
        this.props.dispatch(catcherr({
          error : err
        }));
      });
    }
    componentDidUpdate(prevProps, prevState){
      let header = (()=>{/*
        <head>
          <meta charset="UTF-8">
          <title>iframe</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        </head>
      */}).toString().match(/\/\*([^]*)\*\//)[1];

      ReactDOM.findDOMNode(this.refs.uframe).srcdoc
       = header
       + ReactDOM.findDOMNode(this.refs.main).innerHTML;
    }
    render() {
      const hoge =(flag)=>{
        if(flag){
          return(
            <div>Now Loading...</div>
          );
        }else{
          return(
            <div>
              <div>{this.props.state.get('conditions')}</div>
              <div>{this.props.state.get('result')}</div>
            </div>
          );
        }
      }
      return (
        <div>
          <h2>statistic data</h2>
          <div>
            <ChartView />
          </div>
          <hr/>
          <h2>read ticket details</h2>
          <div>
            <InputComponent />
            <h3>output</h3>
            <div>
              <iframe ref="uframe" width="100%" height="500" style={{border:"none"}}></iframe>
            </div>
          </div>
          <div ref="main" style={{display:"none"}}>
            <pre>
              {hoge(this.props.state.get('onload'))}
            </pre>
          </div>
        </div>
      );
    }
  });


  /******** Provider, Render ********/

  var Provider = ReactRedux.Provider;
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('.splitcontentright')
  );
