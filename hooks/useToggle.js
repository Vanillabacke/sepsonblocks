import {
    useState,
} from 'react';

/*
    const [value, toggleValue] = useToggle(false)
*/
function useToggle() {
    const [value, setValue] = useState(defaultValue)

  function toggleValue(value) {
    setValue(currentValue =>
      typeof value === "boolean" ? value : !currentValue
    )
  }

  return [value, toggleValue]
}

export default useToggle