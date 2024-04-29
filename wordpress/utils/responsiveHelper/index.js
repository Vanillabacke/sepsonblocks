
export function flattenResponsiveValues(data) {
    const output = [];

    // Loop through each responsive property (e.g., 'margin', 'size')
    for (const name in data) {
        const item = data[name];
        const sizes = item.sizes;
        const units = item.units || {};

        // Loop through each breakpoint in sizes
        for (const breakpoint in sizes) {
            let value = sizes[breakpoint];
            const unit = units[breakpoint] || false;  // Default to false if no unit is present

            // Check if the value is a numeric string and convert it
            if (typeof value === 'string' && !isNaN(value)) {
                value = parseInt(value, 10);
            }

            // Create an object for each flattened value and push it to output
            output.push({
                name: name,
                breakpoint: breakpoint,
                value: value,  // Now correctly handles strings that represent numbers
                unit: unit
            });
        }
    }

    return output;
}


export function createDataAttributes(flattenedValues, customPrefix = '') {
    return flattenedValues.map(entry => {
        const attributePrefix = customPrefix ? customPrefix + '-' : ''; // Add '-' if customPrefix is provided
        const propertyPrefix = entry.name;
        const breakpoint = entry.breakpoint === 'default' ? '' : `-${entry.breakpoint}`;
        const unit = entry.unit ? entry.unit : '';
        const value = entry.value + unit;

        return `data-${attributePrefix}${propertyPrefix}${breakpoint}="${value}"`;
    });
}


export function createDataAttributesToObject(flattenedValues, customPrefix = '') {
    const attributes = {};
    flattenedValues.forEach(entry => {
        const attributePrefix = customPrefix ? `${customPrefix}-` : '';
        const propertyPrefix = entry.name;
        const breakpoint = entry.breakpoint === 'default' ? '' : `-${entry.breakpoint}`;
        const unit = entry.unit ? entry.unit : '';
        const value = entry.value + unit;

        attributes[`data-${attributePrefix}${propertyPrefix}${breakpoint}`] = value;
    });
    return attributes;
}