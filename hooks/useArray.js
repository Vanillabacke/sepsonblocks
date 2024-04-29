import {
    useState,
} from 'react';

/*
    const { array, set, push, remove, filter, update, clear } = useArray([
      1, 2, 3, 4, 5, 6,
    ])
*/
export default function useArray(defaultValue) {
  const [array, setArray] = useState(defaultValue)

  function push(element) {
    setArray(a => [...a, element])
  }

  function filter(callback) {
    setArray(a => a.filter(callback))
  }

  function filterCascade( callback, order = 'asc') {
    
  }


  function update(index, newElement) {
    setArray(a => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length - 1),
    ])
  }


  // Reduce
  // https://www.youtube.com/watch?v=s1XVfm5mIuU
  function reduce( reduceKey = false ) {
    return array.reduce( (total, item) => {
      return total + item[reduceKey]
    })
  }
  
  function groupByKeyValue( groupKey = '' ) {
    return array.reduce( (group, item) => {
      const val = item[groupKey]
      if( group[groupKey] == null ) group[groupKey] = []
      group[groupKey].push(item)
      return group
    }, {} )
  }

 

  function remove(index) {
    setArray(a => [...a.slice(0, index), ...a.slice(index + 1, a.length - 1)])
  }

  function clear() {
    setArray([])
  }

  return { array, set: setArray, push, filter, update, remove, clear }
}