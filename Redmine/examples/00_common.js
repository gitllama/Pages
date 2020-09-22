/*
Path pattern: /
Type: JavaScript
*/
</script>

<!-- React and Redux -->

<script src="https://unpkg.com/react@15.6.1/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15.6.1/dist/react-dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.7.2/redux.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-redux/5.0.6/react-redux.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.38/browser.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/immutable/3.8.1/immutable.min.js"></script>

<!-- utilities -->

<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js"></script>
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-yaml/3.4.2/js-yaml.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/signature_pad/1.5.3/signature_pad.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.31.2/react-bootstrap.min.js"></script>

<script type="text/babel">

window.ViewCustomClass = class ViewCustomClass{

  constructor() {
    this.defaulttracker = 16;
    this.sign_array = ['12', '13', '14', '15'];
    this.conditionsID = "6";
    this.resultID = "7";
    this.addresseeID = "10";
    this.customerID = "17";

    this.IDList = { "conditions" : "6",
                    "result" : "7",
                    "addressee" : "10",
                    "customer" : "17" };
  }
}
