import { useCallback, useEffect, useRef } from 'react';
import { checkOptions } from './core/utils';
import Slider from './slider';


import sliderStyle from './style.scss'

export default function useSlider(options, plugins) {
    const sliderRef = useRef(null);
    const optionsCheckedFirst = useRef(false);
    const currentOptions = useRef(options);
    const onRefChange = useCallback((node) => {
        if (node) {
            currentOptions.current = options;
            sliderRef.current = new Slider(node, options, plugins);
            optionsCheckedFirst.current = false;
        }
        else {
            if (sliderRef.current && sliderRef.current.destroy)
                sliderRef.current.destroy();
            sliderRef.current = null;
        }
    }, []);
    useEffect(() => {
        if (!optionsCheckedFirst.current) {
            optionsCheckedFirst.current = true;
            return;
        }
        if (sliderRef.current)
            sliderRef.current.update(currentOptions.current);
    }, [checkOptions(currentOptions, options)]);
    return [onRefChange, sliderRef];
}
