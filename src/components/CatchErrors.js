import React, { PureComponent } from "react";
import ErrorBoundary from "./Errors/ErrorBoundary";

export default class CatchErrors extends PureComponent {
  render() {
    if (this.props.error.message) {
      return (
        <>
          <ErrorBoundary errors={this.props.error} />
          {this.props.children}
        </>
      );
    } else {
      return this.props.children;
    }
  }
}
