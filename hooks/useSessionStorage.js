// import {useCallback, useState, useEffect} from 'preact/hooks';
import useStorage from './useStorage'


/*
    const [name, setName, removeName] = useSessionStorage("name", "Kyle")
*/
export function useSessionStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window.sessionStorage)
}