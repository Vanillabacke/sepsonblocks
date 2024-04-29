// https://github.com/antonioru/beautiful-react-hooks/blob/master/src/shared/safeHasOwnProperty.ts

const safeHasOwnProperty = (obj, prop) => (obj ? Object.prototype.hasOwnProperty.call(obj, prop) : false)

export default safeHasOwnProperty