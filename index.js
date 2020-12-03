/*
    This file contains the current version of the LogJS library.
    It is designed to connect via import {log} from './path/to/logJS'
*/

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
    maxLogDelph: 100,
    warnLogGroupDelph: 5,
    loggedWarnLogGroupDelph: false,
    mode: 'prod',
    defaultStyle: [
        'color: gray;', 'font: 1.93rem/3 Georgia;'
    ].join(''),
    warnStandart: true
}
class _logJs {
    setConfig( _config ){
        for( let prop in _config ){
            config[prop] = _config[prop];
        }
    }
    addReadyStyle( style = {head: 'default', body: ['color: gray']} ){
        readyStyle[style.head] = style.body;
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
    initGroup( title = 'temp', open = true ){
        logGroupDelph++;
        if( open ){
            console.group( title );
        } else {
            console.groupCollapsed( title );
        }
        if( logGroupDelph > config.warnLogGroupDelph && config.loggedWarnLogGroupDelph && config.mode === 'dev' ){
            console.log( `[delph: ${logGroupDelph}]` );
        }
    }
    closeGroup(){
        logGroupDelph--;
        console.groupEnd();
    }
    open( output ){
        console.log( '%O', output );
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
    table( outputObj = {testKey: 'test'}, cleanOutputObj ){
        if( config.warnStandart === true ){
            console.warn( 'The "console.table" API has not been standardized. It is highly recommended that you use it only when debugging.' );
        }
        console.table( outputObj );
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