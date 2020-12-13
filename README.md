# logJS
### Current: v1.1.0
### Designed for easy logging of information when debugging code.

The library allows you to use more console.
After import *(via `<script> </script>` tag or via `import`)* we get an instance of the class with methods for logging.
What follows is a description of the methods and arguments for these methods.
---
#### log.newConfigObj( newConfigObj )
An object that contains fields to describe the default behavior of logJs.
     The *for..in* loop will overwrite all values in the internal config of the library.
 - **defaultStyle** - Styles to be applied when log.styled () is called without a second argument.
     
 - **warnStandart** - Responsible for warnings about standards.
 Some methods use methods on the console object that have not yet been standardized.  
 ---

#### log.addReadyStyle( styleObj )
The method allows you to set your own ready-made styles and refer to them in the .styled () method by styleObj.title
- **styleObj** contains two fields, **title** (a line that is an id for a style. Become an object key, therefore it should not contain special characters, spaces, numbers at the beginning of a line),
     and **body** (An array of strings like `['font-size: 15px;', 'color: red;']`, don't forget the ";"!)
---
#### log.err/log/dir/warn ( output ) 
Likewise with **console.error/log/dir/warn( *output* )**

---
#### initGroup (groupTitle, open)
The method is designed to initialize a group of logs and assign a title to this group.

- **groupTitle** - A string that will define the title for the group.
- **open** - is a boolean value that determines whether the group will be opened when outputting to the console. The default value is true.

    ```
    log.initGroup ('pets');

    log.initGroup ('dogs breeds');
    log.log ('Beagle');
    console.log ('Collie');
    console.warn ('Bedlington Terrier');
    log.closeGroup ();
    
    log.initGroup ('cats breeds');
    log.log ('Persian');
    console.log ('Manx');
    console.error ('Bedlington Terrier');
    log.closeGroup ();

    log.closeGroup ();

    log.log ('some else ...')
    ```
![groups example](https://github.com/Aleksandr-JS-Developer/imgs/blob/main/logJS_Groups.png)

---
#### log.closeGroup ()
Closes the last open group.

---
#### log.open (output)
The method allows you to display objects immediately in expanded form. Now you don't have to open the object in the console every time.

---
#### log.color (output, color)
Outputs output in color. All formats supported by css are possible.

---
#### log.styled (output, style)
The method outputs "output" to the console, styled according to the "style" rules.
- **style** - Must be an array with strings *or string*. For example, `['font-size: 15px;', 'color: red;']`
It is worth remembering that the array is parsed into a string, therefore the ";" at the end of the css rule is critical.

Also, there are built-in styles.
To use them, style must be specified as a key string.

For example, calling `log.styled ('some text', 'h1')` uses the inline `h1` style. You can define and access your styles in the same way as h1.
For this you need to use the *log.addReadyStyle ()* method.

Here is a list of ready-made styles available by key.
- **h1** - 'font-size: 2em; font-weight: bold; '
- **h2** - 'font-size: 1.5em; font-weight: bold; '
- **h3** - 'font-size: 1.17em; font-weight: bold; '
- **h4** - 'font-size: 1em; font-weight: bold; '
- **h5** - 'font-size: .83em; font-weight: bold; '
- **h6** - 'font-size: .67em; font-weight: bold; '
- **happy** - 
'padding: 1rem;
   background: linear-gradient (gold, orangered);
   text-shadow: 0 2px orangered;
   font: 1.3rem / 3 Georgia;
   color: white;

---
#### log.table (outputObj)
One of the most amazing console methods.
The method prints a real table to the console, where rows are keys and columns are values.
It is worth remembering that object methods will be ignored.

For instance:
```
let myKnowledges = {
     JS: true,
     HTML5_CSS3: true,
     Cats: true,
     whereBob: false
}
log.table (myKnowledges);
```

![groups example](https://github.com/Aleksandr-JS-Developer/imgs/blob/main/logJS_table.png)

---
#### log.deferred (delay, method, output0, output1)
The method allows you to log information to the console with a delay.
- **delay** - Number of milliseconds before calling the method
- **method** - String with the name of the method (for example, `"color"`)
- **output0** - If the method takes arguments, then the value of this argument is forwarded further to the first position, by default - `undefined`
- **output1** - If the method takes arguments, then the value of this argument is forwarded further to the second position, by default - `undefined`

---
#### log.loop (periodicity, method, id, output0, output1)
The method allows you to log information to the console in a loop.

- **periodicity** - Number of milliseconds, times in which the method will be executed
- **method** - String with the name of the method (for example, "color")
- **id** - id by which logJS will save "setInterval" for deletion in the future
- **output0** - If the method takes arguments, then the value of this argument is forwarded further to the first position, by default - `undefined`
- **output1** - If the method takes arguments, then the value of this argument is forwarded further to the second position, by default - `undefined`

---
#### log.stopLoop( id )
The method finds setInterval in the internal storage and stops it.

- **id** - This argument is used to search for an interval. The default is `undefined`
---
#### stopAllLoops()
The method stops all previously declared `log.loop()`

---

### Installation

To install this library to your project, you just need to download it and add it to the `head` tag before your script tag.
It is also possible to get it using `import { log } from './Path/to/logJS'`
or `import log from'./Path/to/logJS'`

In the future, it may be possible to get this through npm.

---
### Wat`s new
- v1.0.0 - Issue
- v1.1.0 - Added four new methods ( deferred, loop, stopLoop, stopAllLoops), bugs fixed

---
I apologize for the clumsy English. Pull requests aimed at improving the code and English in the README file are very welcome.
