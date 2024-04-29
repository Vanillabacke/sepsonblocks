const {
    svg,
    path
} = wp.element



const HyphensIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
    <path d="M6.8 10h1.5a3.7 3.7 0 1 1 7.4 0h1.5A5.23 5.23 0 0 0 12 4.8 5.16 5.16 0 0 0 6.8 10Zm5.2 7.7A3.76 3.76 0 0 1 8.3 14H6.8a5.2 5.2 0 1 0 10.4 0h-1.5a3.76 3.76 0 0 1-3.7 3.7Z" />
</svg>
const BreakIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
    <path d="M18 5.5h-5.25V20H6v-1.5h5.25V4H18v1.5z" />
</svg>


// export {
//     HyphensIcon,
//     BreakIcon,
// }


// import hyphensIcon from './svg/hyphens.svg';
// import breakIcon from './svg/custom-break.svg';





// export default {
// 	'hyphens': hyphensIcon,
// 	'break': breakIcon,
// }

export default {
	'hyphens': HyphensIcon,
	'break': BreakIcon,
}