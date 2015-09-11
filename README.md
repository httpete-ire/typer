#Typer

![](https://cloud.githubusercontent.com/assets/1556430/9096597/f9b9f254-3bb5-11e5-8c98-3f77c4203dd5.gif)

> [demo](http://www.httpete.com/typer/)

typer is an Angular directive that simulates someone typing and deleting over a list of words. The directive is highly customisable and allows the words to be set by passing an array of strings as an attribute, the transition times can also be set on the directive. [see below](#options) for a full list of customisations.

 If you have any suggestions for additional features or find any bugs please log them [here](/issues).

Feel free to fork the repository and make a pull request :)

# Documentation

include the typer directive source file in your html


```
 <script src="path/to/typer.js"></script>

```

Mark the typer module as a dependecy of your angular app

```
angular.module('myApp', ['typer']);

```

Then declare the typer directive in your markup

```
<typer words="['JavaScript', 'Angular', 'Cats']" type-time='150' backspace-time='200' start-delay='1500' highlight-background='#2980b9'></typer>

```

**Note:** The directive will inherit the styles of its parent element so it is recommmend to nest it like below


```
 <h1 class="main-title">I love <typer words="['JavaScript', 'Angular', 'Cats']" type-time='150' backspace-time='200' start-delay='1500' highlight-background='#2980b9'></typer></h1>

```

---

## Options


**Note:** all times are in milliseconds

* [words](#words-required)
* [start-typing] (#start-typing)
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

### repeat (optional)

set whether to continuously loop over the words, defaults to true

```
repeat="false"
```

### shuffle (optional)

set whether to randomly shufflethe array of words, defaults to false

```
shuffle="true"
```


### start-delay (optional)

set the time before the first action happens, defaults to 500ms

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

background color of highlight transtion, if set this will replace the backspace transition

```
highlight-background="#2980b9"
```

### highlight-color (optional)

color the text for highlight transtion, defaults to white (#FFFFFF)

```
highlight-color="#2ecc71"
```

### highlight-time (optional)

unlike the backspace time which is for each character the highlight time is for the overall transition, defaults to 250ms

```
highlight-time="400"
```

# Change log

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
* intital release

# License

MIT
