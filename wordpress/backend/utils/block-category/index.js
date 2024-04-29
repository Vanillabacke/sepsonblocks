
/**
 * WordPress dependencies
 */
 const { getCategories, setCategories } = wp.blocks;

 /**
  * Internal dependencies
  */
//  import config from '../../../config';
import config from '../../../../config'
 // import brandAssets from './brand-assets';
 
 
 setCategories( [
     // Add a Namespace block category
     {
         slug:  config.namespace,
         title: config.packageName,
         // icon: brandAssets.categoryIcon,
         // foreground: config.iconColor
         // foreground: "#00CCFF",
         // background: "#ff00cc",
     },
     ...getCategories().filter( ( { slug } ) => slug !== config.packageName ),
 ] );
 