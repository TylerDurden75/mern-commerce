import React from "react";

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText,
  ErrorNumber,
} from "./error-boundary.styles";

const ErrorBoundary = () => {
  return (
    <ErrorImageOverlay>
      <ErrorImageContainer imageUrl="https://i.imgur.com/A040Lxr.png" />
      <ErrorImageText>Sorry this page is lost in translation...</ErrorImageText>
      <ErrorNumber>404</ErrorNumber>
    </ErrorImageOverlay>
  );
};

export default ErrorBoundary;
