// Responsive Layout Handler Module with ResizeObserver

import THEME_CONFIG from '../../config';
import "./style.scss";

const responsiveLayoutHandler = (() => {
    console.log("Initializing responsiveLayoutHandler");
    const config = THEME_CONFIG;
    const breakpoints = config.breakpointObject;
    let observer;

    function getBreakpointForWidth(width) {
        let matchedBreakpoint = 'default';
        for (const bp in breakpoints) {
            if (breakpoints[bp].width && width >= breakpoints[bp].width) {
                matchedBreakpoint = bp;
            }
        }
        return matchedBreakpoint;
    }

    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    }

    let applyStylesForElement = function(element, width) {
        const currentWidth = element.getAttribute('data-current-width') || 0;
        if (Math.abs(currentWidth - width) < 10) return; // Skip if width change is minimal
        element.setAttribute('data-current-width', width);

        window.requestAnimationFrame(() => {
            const totalColumns = config.layout.columns;
            const childElements = element.children;
            const currentBreakpoint = getBreakpointForWidth(width);

            Array.from(childElements).forEach(child => {
                const baseSize = parseInt(child.getAttribute('data-size'), 10);
                const breakpointSize = child.getAttribute(`data-size-${currentBreakpoint}`);
                const size = breakpointSize ? parseInt(breakpointSize, 10) : baseSize;
                const widthPercentage = (size / totalColumns) * 100;
                child.style.width = `${widthPercentage}%`;

                const baseOrder = child.getAttribute('data-order');
                const breakpointOrder = child.getAttribute(`data-order-${currentBreakpoint}`);
                const order = breakpointOrder ? parseInt(breakpointOrder, 10) : baseOrder;
                child.style.order = order;
            });
        });
    };

    applyStylesForElement = debounce(applyStylesForElement, 50);

    function initializeResizeObserver() {
        observer = new ResizeObserver(entries => {
            entries.forEach(entry => {
                const element = entry.target;
                const width = entry.contentRect.width;
                applyStylesForElement(element, width);
            });
        });

        const containers = document.querySelectorAll('[data-container]');
        containers.forEach(container => {
            observer.observe(container);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initializeResizeObserver();
    });

    return {
        updateStylesForElement: applyStylesForElement,
        observeElement: element => observer.observe(element),
        unobserveElement: element => observer.unobserve(element)
    };
})();

export default responsiveLayoutHandler;
