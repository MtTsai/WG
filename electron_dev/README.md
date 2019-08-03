# Setup Environment
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
$ ln -s ../static web_src

# Running App directly
$ npm start

# Build APP executable
$ npm run build
```
