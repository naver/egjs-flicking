<template>
  <div>
    <header>
      <router-link to="/align">Align</router-link>
      <router-link to="/bound">Bound</router-link>
      <router-link to="/freeScroll">FreeScroll</router-link>
      <router-link to="/gap">Gap</router-link>
      <router-link to="/progress">Progress</router-link>
      <router-link to="/snap">Snap</router-link>
      <router-link to="/variable">VariableSize</router-link>
      <router-link to="/infinite">Infinite</router-link>
    </header>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
<style>
  @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic&subset=korean');
  body, em, i {
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 300;
    font-style: normal;
  }
  .hljs {
    margin: 30px auto;
    max-width: 800px;
    padding: 10px;
    border-radius: 5px;
  }
  .container {
    max-width: 800px;
    width: 100%;
    margin: 30px auto;
  }
  h1 a {
    position: relative;
    color: #333;
  }
  pre {
    max-width: 800px;
    margin: 30px auto;
  }
  ul.extra {
    max-width: 800px;
    margin: 10px auto;
    font-size: 16px;
    padding: 10px 10px 10px 40px;
    border-radius: 10px;
    background: #f5f5f5;
    box-sizing: border-box;
    list-style: initial;
  }
  ul.extra li {
    font-size: 16px;
    margin: 10px 0px;
    list-style: initial;
    height: auto;
    overflow: visible;
  }
  .flicking {
    width: 500px;
    height: 130px;
    margin: 0px auto;
    background: #eee;
    background: rgba(55, 55, 55 0.1);
    border-radius: 5px;
  }
  .flicking .panel, .flicking .infinite {
    position: relative;
    display: block;
    border-radius: 5px;
    width: 200px;
    margin-top: 5px;
    background: #f55;
    height: 120px;
    text-align: center;
    line-height: 120px;
  }
  .flicking .panel:nth-child(5n + 1) {
    background: #F47071;
  }
  .flicking .panel:nth-child(5n + 2) {
    background: #F69462;
  }
  .flicking .panel:nth-child(5n + 3) {
    background: #EDE484;
  }
  .flicking .panel:nth-child(5n + 4) {
    background: #90F290;
  }
  .flicking .panel:nth-child(5n + 5) {
    background: #78CAFF;
  }
  .flicking .infinite0 {
    background: #F47071;
  }
  .flicking .infinite1 {
    background: #F69462;
  }
  .flicking .infinite2 {
    background: #EDE484;
  }
  .flicking .infinite3 {
    background: #90F290;
  }
  .flicking .infinite4 {
    background: #78CAFF;
  }
  /*
  Atom One Dark by Daniel Gamage
  Original One Dark Syntax theme from https://github.com/atom/one-dark-syntax

  base:    #282c34
  mono-1:  #abb2bf
  mono-2:  #818896
  mono-3:  #5c6370
  hue-1:   #56b6c2
  hue-2:   #61aeee
  hue-3:   #c678dd
  hue-4:   #98c379
  hue-5:   #e06c75
  hue-5-2: #be5046
  hue-6:   #d19a66
  hue-6-2: #e6c07b
  */

  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: #abb2bf;
    background: #282c34;
  }

  .hljs-comment,
  .hljs-quote {
    color: #5c6370;
    font-style: italic;
  }

  .hljs-doctag,
  .hljs-keyword,
  .hljs-formula {
    color: #c678dd;
  }

  .hljs-section,
  .hljs-name,
  .hljs-selector-tag,
  .hljs-deletion,
  .hljs-subst {
    color: #e06c75;
  }

  .hljs-literal {
    color: #56b6c2;
  }

  .hljs-string,
  .hljs-regexp,
  .hljs-addition,
  .hljs-attribute,
  .hljs-meta-string {
    color: #98c379;
  }

  .hljs-built_in,
  .hljs-class .hljs-title {
    color: #e6c07b;
  }

  .hljs-attr,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-type,
  .hljs-selector-class,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-number {
    color: #d19a66;
  }

  .hljs-symbol,
  .hljs-bullet,
  .hljs-link,
  .hljs-meta,
  .hljs-selector-id,
  .hljs-title {
    color: #61aeee;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }

  .hljs-link {
    text-decoration: underline;
  }

  a {
    margin: 10px;
  }
</style>
