import React from "react";
import { Button } from "react-bootstrap";
// import { Button, Glyphicon } from "react-bootstrap";
import "./LoaderButton.css";

export default ({
  isLoading,
  text,
  loadingText,
  className = "",
  disabled = false,
  ...props
}) =>
  <Button
    className={`LoaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading }
    {// {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
  }
    {!isLoading ? text : loadingText}
  </Button>;
