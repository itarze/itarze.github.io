import React from "../../_snowpack/pkg/react.js";
import {ErrorMessage} from "./styled.js";
export class AsyncCommand extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      didError: false,
      value: void 0
    };
  }
  componentDidCatch() {
    this.setState({didError: true});
  }
  componentDidMount() {
    this.props.promise.then((val) => this.setState({value: val}), () => this.setState({didError: true}));
  }
  render() {
    if (this.state.didError) {
      return /* @__PURE__ */ React.createElement(ErrorMessage, null, "Command Unsupported");
    } else if (this.state.value === void 0) {
      return null;
    } else {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, this.props.render(this.state.value));
    }
  }
}
