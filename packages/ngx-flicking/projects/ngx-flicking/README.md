# @egjs/ngx-flicking [![version](https://img.shields.io/npm/v/@egjs/ngx-flicking.svg?style=flat)](https://www.npmjs.com/package/@egjs/ngx-flicking)
> 🎠 A module used to implement flicking interactions. With this module, you can make flicking gestures, which are ways to navigate left and right to move between panels arranged side by side.
Angular wrapper of [@egjs/flicking](https://github.com/naver/egjs-flicking)

## Install
```sh
npm install --save @egjs/ngx-flicking
```

## Quick Start
### Module definition
```js
import { NgxFlickingModule } from '@egjs/ngx-flicking'; // import
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxFlickingModule /* Add in imports */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Template & Script
```ts
@Component({
  selector: 'autoplay-plugin-demo',
  template: `
  <eg-flicking
    [options]="{ circular: true, gap: 10, duration: 500 }"
    [plugins]="plugins"
  >
    <ng-template>
      <div class="panel">
        <img src="https://naver.github.io/egjs-flicking/images/bg01.jpg" />
      </div>
      <div class="panel">
        <img src="https://naver.github.io/egjs-flicking/images/bg02.jpg" />
      </div>
      <div class="panel">
        <img src="https://naver.github.io/egjs-flicking/images/bg03.jpg" />
      </div>
    </ng-template>
  </eg-flicking>
  `,
  styleUrls: ['./autoplay.component.css']
})
export class AutoplayComponent implements OnInit {
  plugins: Plugin[] = [new Fade(), new AutoPlay(2000, 'NEXT')];

  constructor() { }

  ngOnInit() {
  }
}
```

### SSR(Server Side Rendering)
> TODO

## More Examples
See `demo/` for more implementation examples.

## Local development
### Project setup
```
npm install
```

### Compiles and hot-reloads demo
```sh
npm run start
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## Bug Report

If you find a bug, please report to us opening a new [Issues](https://github.com/naver/egjs-flicking/issues) on GitHub.

## License
egjs-flicking is released under the [MIT license](http://naver.github.io/egjs/license.txt).

```
Copyright (c) 2015-present NAVER Corp.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
