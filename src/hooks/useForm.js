import { useState } from "react";

export function useForm(inputValues = {}) {
  const [formValue, setFormValue] = useState(inputValues);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  return { formValue, handleChange };
}
