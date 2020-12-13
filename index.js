/*
    This file contains the current version of the LogJS library.
    It is designed to connect via import {log} from './path/to/logJS'
    v1.1.0
*/

const getStatus = id => {
    const prefix = '\n[status]: ';
    const statusCodes = {
        0: 'continue',
        1: 'executed with error',
        2: 'aborted',
        3: 'fatal error'
    };
    if( statusCodes[id] !== undefined ){
        return prefix+statusCodes[id]
    }
    console.error( `statusCodes[id] === undefined!\n${prefix+statusCodes[2]}` );
}
const intervalsId = {};
const readyStyle = {
    h1: ['font-size: 2em;', 'font-weight: bold;'].join(''),
    h2: ['font-size: 1.5em;', 'font-weight: bold;'].join(''),
    h3: ['font-size: 1.17em;', 'font-weight: bold;'].join(''),
    h4: ['font-size: 1em;', 'font-weight: bold;'].join(''),
    h5: ['font-size: .83em','font-weight: bold;'].join(''),
    h6: ['font-size: .67em','font-weight: bold;'].join(''),
    happy: ['padding: 1rem;',
    'background: linear-gradient( gold, orangered);',
    'text-shadow: 0 2px orangered;',
    'font: 1.3rem/3 Georgia;',
    'color: white;'].join('')
}
let logGroupDelph = 0;
let config = {
    defaultStyle: [
        'color: gray;', 'font: 1.93rem/3 Georgia;'
    ].join(''),
    warnStandart: true
}
class _logJs {
    constructor(){
        this.deferred.bind( this );
    }
    setConfig( _config ){
        for( let prop in _config ){
            config[prop] = _config[prop];
        }
    }
    addReadyStyle( style = {title: 'default', body: ['color: gray']} ){
        readyStyle[style.title] = style.body;
    }
    err( output ){
        console.error( output );
    }
    log( output ){
        console.log( output );
    }
    dir( output ){
        console.dir( output );
    }
    warn( output ){
        console.warn( output );
    }
    initGroup( title = `group ${logGroupDelph}`, open = true ){
        logGroupDelph++;
        if( open ){
            console.group( title );
        } else {
            console.groupCollapsed( title );
        }
    }
    closeGroup(){
        logGroupDelph--;
        console.groupEnd();
    }
    open( output ){
        console.log( '%o', output );
    }
    color( output, color = config.defaultStyle.color ){
        console.log( '%c%s', `color: ${color};`, output );
    }
    styled( output, style = config.defaultStyle ){
        const readyStyle = getReadyStyle( style );
        if( readyStyle !== null ){
            console.log( '%c%s', readyStyle, output );
        } else {
            console.log( '%c%s', style, output );
        }
    }
    table( outputObj = {testKey: 'test'} ){
        if( config.warnStandart === true ){
            console.warn( `The "console.table" API has not been standardized. It is highly recommended that you use it only when debugging.${getStatus(0)}` );
        }
        console.table( outputObj );
    }
    deferred( delay, method, output0, output1 ){
        if( this[method] !== undefined ){
            setTimeout( () => {
                this[method](output0, output1);
            }, delay);
        } else {
            console.warn( `log.${method} is ${this[method]}!${getStatus(2)}` );
        }
    }
    loop( periodicity, method, id, output0, output1 ){
        if( this[method] === undefined ){
            console.warn( `log.${method} is ${this[method]}!${getStatus(2)}` );
        } else if( intervalsId[id] !== undefined ){
            console.warn( `ID "${id}" already taken!${getStatus(2)}` );
        } else {
            const loopObj = {
                method,
                output0,
                output1,
                ID: setInterval(() => {this[method](output0, output1);}, periodicity)
            }
            intervalsId[id] = loopObj;
            return loopObj;
        }
    }
    stopLoop( id, logNow ){
        if( intervalsId[id] !== undefined ){
            let loopObj = intervalsId[id];
            clearInterval( loopObj.ID );
        } else {
            console.warn( `id "${id}" is not defined!${getStatus(2)}` );
        }
    }
    stopAllLoops(){
        for( let loop in intervalsId ){
            clearInterval( intervalsId[loop].ID );
        }
    }
}
const getReadyStyle = id => {
    let style = readyStyle[id];
    if( style === undefined ){
        return null;
    }
    return style;
}

// exports
export const log = new _logJs();
export default log;