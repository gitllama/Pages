import React from 'react'
import { connect } from 'react-redux'
import App from '../components/app'
import AppActions from '../actions/app'

// グローバルなstateから必要な値をとってきて、コンポーネントのthis.propsとしてセット
// 今回はいずれにしろstateのプロパティには{fuga}しか無いので、stateをまるごと返してます
function mapStateToProps(state) {
  return state
}

// clickでactionを飛ばず
function mapDispatchToProps(dispatch) {
  return {
    handleClick: () => { dispatch(AppActions.increment()) }
  }
}

//connect関数でReduxとReactコンポーネントを繋ぐ
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
