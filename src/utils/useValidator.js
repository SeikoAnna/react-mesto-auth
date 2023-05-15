import { useState, useEffect } from "react";

export function useValidator(value, validations) {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "isUrl":
          const url = /(?:https?):(\w+:?\w*)?(\S+)(:\d+)?(([\w#!:.?+=&%!]))?/;
          url.test(String(value).toLowerCase())
            ? setUrlError(false)
            : setUrlError(true);
          break;
      }
    }
  }, [value, validations]);

  useEffect(() => {
    if (isEmpty || minLengthError || urlError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, urlError]);

  return {
    isEmpty,
    minLengthError,
    urlError,
    inputValid,
    setInputValid,
  };
}
