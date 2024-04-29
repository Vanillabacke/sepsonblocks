import { useEffect } from 'react';
import useTimeout from "./useTimeout"

/*
    useDebounce(() => alert(count), 1000, [count])
*/
export default function useDebounce(callback, delay, dependencies) {
  const { reset, clear } = useTimeout(callback, delay)
  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [])
}