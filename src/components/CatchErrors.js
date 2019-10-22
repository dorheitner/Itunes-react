import React, { PureComponent } from "react";
import ErrorHandler from "../hoc/ErrorHandler/ErrorHandler";
import Layout from "../hoc/Layout/Layout";

export default class CatchErrors extends PureComponent {
  state = { error: null };

  componentDidCatch(error, errorInfo) {
    console.log("CatchErrors");

    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return (
        <Layout>
          <ErrorHandler />
        </Layout>
      );
    } else {
      return this.props.children;
    }
  }
}
