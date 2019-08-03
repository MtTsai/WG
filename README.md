# WebGame Server
=====================

Introduction:
-------------

    This is a practice for web design

    To be continue....

Requirement:
------------

1. npm install express
2. npm install socket.io

Run:
----
* node server.js

===

# Electron

```bash
$ npm init -y
$ npm install --save--dev electron
$ npm install electron-packager --save-dev
```

```
electron-packager <source_dir> <app_name> 
    --out <out_dir>
    --overwrite
    --platform=win32
        * Windows(win32), Mac(darwin), Linus(linux)
    --arch=x64
        * x64, ia32, all
    --icon=<path>
    --ignore=node_modules/electron-*
    --electron-version=1.7.9
    --version-string.CompanyName=<name>
    --version-string.ProductName=<name>
```

```bash
# Running App directly
$ npm start

# Build APP executable
$ npm run build
```
