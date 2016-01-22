#Typer

![](https://cloud.githubusercontent.com/assets/1556430/9096597/f9b9f254-3bb5-11e5-8c98-3f77c4203dd5.gif)

Typer is an Angular directive that simulates someone typing and deleting over a list of words. The directive is highly customisable and allows the words to be set by passing an array of strings as an attribute, the transition times can be set on the directive aswell as callback functions to get invoked after each action ('Type', 'Delete', 'Highlight')

[full list](#directive-options) of directive options or [advanced examples](http://httpete.com/typer/#examples)

# Documentation

---

## Installation

include the typer directive source file in your html

```
 <script src="path/to/typer.js"></script>

```

Mark the typer module as a dependency of your angular app

```
angular.module('myApp', ['typer']);

```

###  NPM installation

```
npm install angular-typer
```

Using a module bundler such as __webpack__ or __browserify__ require the typer module as a dependency of your angular app

```
var angular = require('angular');

angular.module('app', [
	require('angular-typer')
]);
```

### Bower installation

```
bower install angular-typer
```

include the typer directive source file in your html


```
 <script src="bower_components/angular-typer/dist/typer.min.js"></script>
```

Mark the typer module as a dependency of your angular app

```
angular.module('myApp', ['typer']);

```

---

### Declaring directive

Then declare the typer directive in your HTML

```
<typer words="['JavaScript', 'Angular', 'Cats']" type-time='150' backspace-time='200' start-delay='1500' highlight-background='#2980b9'></typer>

```

**Note:** The directive will inherit the styles of its parent element so it is recommended to nest it like below


```
 <h1 class="main-title">I love <typer words="['JavaScript', 'Angular', 'Cats']" type-time='150' backspace-time='200' start-delay='1500' highlight-background='#2980b9'></typer></h1>

```

---

## Directive options

**Note:** all times are in milliseconds

* [words](#words-required)
* [start-typing](#start-typing)
* [start-trigger](#start-trigger)
* [repeat](#repeat-optional)
* [shuffle](#shuffle-optional)
* [start-delay](#start-delay-optional)
* [pause](#pause-optional)
* [type-time](#type-time-optional)
* [backspace-time](#backspace-time-optional)
* [on-typed](#on-typed-optional)
* [on-deleted](#on-deleted-optional)
* [on-complete](#on-complete-optional)
* [highlight-background](#highlight-background-optional)
* [highlight-color](#highlight-color-optional)
* [highlight-time](#highlight-time-optional)
* [cursor](#cursor-optional)


### words (required)

Array of strings to loop over and simulate someone typing out each single word

```
words="['Angular', 'React', 'Ember']"
```

### start-typing (optional)

Set whether the directives first animation is either the type or delete/highlight

*defaults* to false

```
start-typing="true"
```

### start-trigger (optional)

Set a boolean variable on the directive that will start the directive when the variable changes to true

Note: start-delay is taken into account

```
start-trigger="vm.controllerTrigger"
```


### repeat (optional)

set whether to continuously loop over the words, defaults to true

```
repeat="false"
```

### shuffle (optional)

set whether to randomly shuffle the array of words, defaults to false

```
shuffle="true"
```


### start-delay (optional)

set the time before the first action happens, defaults to 0ms since v0.5.6 (500ms before)

```
start-delay="2000"
```

### pause (optional)

set the time between each transition (excluding the start time), defaults 1000ms

```
pause="500"
```

### type-time (optional)

set the time for each character to be typed out, defaults to 250ms

```
type-time="300"
```

### backspace-time (optional)

set the time for each character to be deleted, defaults to type-time

```
backspace-time="150"
```

### on-typed (optional)

function to be executed when a word is fully typed

```
on-typed="vm.alert('typed')"
```

### on-deleted (optional)

function to be executed when a word is fully deleted

```
on-deleted="vm.alert('deleted')"
```

### on-complete (optional)

function to be executed when all the words are typed, will only excute if repeat is set to false

```
on-complete="vm.alert('complete')"
```

### highlight-background (optional)

background color of highlight transition, if set this will replace the backspace transition

```
highlight-background="#2980b9"
```

### highlight-color (optional)

color the text for highlight transition, defaults to white (#FFFFFF)

```
highlight-color="#2ecc71"
```

### highlight-time (optional)

unlike the backspace time which is for each character the highlight time is for the overall transition, defaults to 250ms

```
highlight-time="400"
```

### cursor (optional)

set a custom cursor, *defaults* to '|'

*note*
the cursor will not be set if the highlight-color is set

```
cursor="@"
```

include the following CSS for the cursor blinking effect

```
.typer__cursor--blink {
  -webkit-animation: blink 1s infinite;
  -moz-animation: blink 1s infinite;
  animation: blink 1s infinite;
}

@-webkit-keyframes blink {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-moz-keyframes blink {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
```

## Contributing

Contributions are welcome. Please be sure to document your changes.

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

# Change log

### 0.5.4
* fix shuffle bug

### 0.5.3
* publish to NPM

### 0.5.2
* boolean attributes except either a boolean value or a string representation of the boolean

### 0.5.1
* start-trigger
* clear timers on destroy

### 0.4.1
* custom cursor

### 0.3
* UMD support
* Travis CI

### 0.2.2
* shuffle words feature
* refactor of link function

### 0.2.1
* watch words array for changes

#### 0.2.0
* startTyping functionality

#### 0.1.1
* set the default repeat attribute to true

#### 0.1.0
* initial release

# License

MIT
