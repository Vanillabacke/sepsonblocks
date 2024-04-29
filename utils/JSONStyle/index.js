import parseMediaQuery from '../parseMediaQuery'

export default class JSONStyle {
    constructor( reference = this, args = {} ) {
        this.ref = reference

        this.updateStateInit = args.updateStateInit || false
        this.rules = args.rules || []

        // console.log('JSONStyle')
        this.style = new CSSStyleSheet()


        this.parseRules()

        if( this.updateStateInit ) this.updateState()

        console.log(parseMediaQuery({minWidth: 100, maxWidth: 200}) )
        
    }


    updateState() {
        if( this.ref.state ) {
            this.ref.setState({
                style: this.style
            })
        }
    }


    getStyles(){
        let cssRules = [];
        [...this.style.cssRules].map( (value, index) => {
            cssRules.push(value.cssText)
        })
        return cssRules
    }



    parseRules() {
        Object.keys(this.rules).map( (value, index) => {
            console.log(index, value)
        })
    }







}