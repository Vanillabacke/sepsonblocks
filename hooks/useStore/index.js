// https://github.com/pie6k/hooksy

import { useLayoutEffect } from 'react';
import { removeArrayElement, useForceUpdate } from './services';


export function createStore(defaultValue) {
  let storeState = defaultValue;
  const storeListeningComponents = [];

  function updateStoreState(newStoreState) {
    const oldStoreState = storeState;
    storeState = newStoreState;
    storeListeningComponents.forEach(({ update, options }) => {
      const shouldUpdate =
        !options ||
        !options.shouldUpdate ||
        !options.shouldUpdate(oldStoreState, newStoreState);

      if (!shouldUpdate) {
        return;
      }

      update();
    });
  }

  function useStoreState(options) {
    const forceUpdate = useForceUpdate();

    useLayoutEffect(() => {
      const listeningData = {
        options,
        update: forceUpdate,
      };

      storeListeningComponents.push(listeningData);

      return () => {
        removeArrayElement(storeListeningComponents, listeningData);
      };
    });

    return [storeState, updateStoreState]
  }

  return [useStoreState, updateStoreState]
}