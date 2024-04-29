import Coordinate from "./Coordinate";

export default class Utils {

    static cachedVendor_ = '';
    static cachedVendorProps_ = {};


    static getVendor = function (optProp) {
        var property = '';
        var prefix = '';

        if (optProp && this.cachedVendorProps_.hasOwnProperty(optProp)) {
            return this.cachedVendorProps_[optProp];
        }

        if (this.cachedVendor_ != '') {
            prefix = this.cachedVendor_;
        } else {
            var styles = window.getComputedStyle(document.documentElement, '');
            prefix = this.cachedVendor_ = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) ||
                (styles.OLink && styles.OLink === '' && ['', 'o']))[1];
        }

        var vendorPrefix = prefix[0].toUpperCase() + prefix.substr(1);

        if (prefix.length > 0 && optProp) {
            property = optProp[0].toUpperCase() + optProp.substr(1);
            this.cachedVendorProps_[optProp] = vendorPrefix + property;
        }

        return vendorPrefix + property;
    };


    static getStyle = function (element, style, optVendorize) {
        return window.getComputedStyle(element)[optVendorize ? this.getVendor(style) : style];
    };


    static setStyle = function (element, property, value, optVendorize) {
        element.style[property] = value;

        if (optVendorize) {
            element.style[this.getVendor(property)] = value;
        }
    };


    static removeStyle = function (element, property, optVendorize) {
        element.style[property] = '';

        if (optVendorize) {
            element.style[this.getVendor(property)] = '';
        }
    };


    static setTranslation = function (element, x, y) {
        this.setStyle(element, 'transform', 'translate3d(' + x + 'px,' + y + 'px,0)', true);
    };


    static extendObject = function (target, var_args) {
        var key;
        var source;
        var prorotypeFields = [
            'constructor',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'toLocaleString',
            'toString',
            'valueOf'
        ];

        for (var i = 1; i < arguments.length; i++) {
            source = arguments[i];

            for (key in source) {
                target[key] = source[key];
            }

            for (var j = 0; j < prorotypeFields.length; j++) {
                key = prorotypeFields[j];

                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
    };


    static getAncestor = function (element, matcher, opt_includeNode, opt_maxSearchSteps) {
        if (element && !opt_includeNode) {
            element = element.parentNode;
        }

        var steps = 0;

        while (element && (opt_maxSearchSteps == null || steps <= opt_maxSearchSteps)) {
            if (matcher(element)) {
                return element;
            }

            element = element.parentNode;
            steps++;
        }

        return null;
    };


    static getAncestorByTagName = function (element, opt_tag) {
        if (!opt_tag) {
            return null;
        }

        var tagName = opt_tag ? String(opt_tag).toUpperCase() : null;

        return (getAncestor(element, function (node) {
            return !tagName || node.nodeName == tagName;
        }, true));
    };


    static getOwnerDocument = function (node) {
        return (
            node.nodeType == Node.DOCUMENT_NODE ? node : node.ownerDocument || node.document);
    };


    static getDocumentScroll = function () {
        var element = document.scrollingElement || document.documentElement;

        return new Coordinate(
            window.pageXOffset || element.scrollLeft,
            window.pageYOffset || element.scrollTop
        );
    };


    static getPageOffset = function (element) {
        var ownerDoc = this.getOwnerDocument(element);
        var offsetPosition = new Coordinate();
        var boundingRect = element.getBoundingClientRect();
        var scrollPosition = this.getDocumentScroll();

        offsetPosition.x = boundingRect.left + scrollPosition.x;
        offsetPosition.y = boundingRect.top + scrollPosition.y;

        return offsetPosition;
    };
}








