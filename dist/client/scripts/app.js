!function(t){var n={};function r(o){if(n[o])return n[o].exports;var e=n[o]={exports:{},id:o,loaded:!1};return t[o].call(e.exports,e,e.exports,r),e.loaded=!0,e.exports}r.m=t,r.c=n,r.p="",r(0)}([function(o,e){console.log(12345),fetch("/test").then(o=>o.json()).then(o=>console.log(o))}]);