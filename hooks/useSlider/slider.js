import SliderHandler from './core/slider';
import Modes from './plugins/modes';
import Drag from './plugins/drag';
import Renderer from './plugins/renderer';
import Web from './plugins/web';
import WheelControls from './plugins/wheelControls';

const Slider = function (container, options, plugins) {
    try {
        const defOpts = {
            drag: true,
            mode: 'snap',
            renderMode: 'precision',
            rubberband: true,
            // selector: '.slider__slide',
            selector: 'vc-slide',
        };
        return SliderHandler(options, [
            Web(container, defOpts),
            Renderer,
            Drag,
            Modes,
            ...(plugins || []),
            // ...(plugins || [WheelControls]),
        ]);
    }
    catch (e) {
        console.error(e);
    }
};
export default Slider;
