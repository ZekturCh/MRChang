const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const publicDir=path.join(__dirname,'../public');
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(item=>item.isDirectory()?files(path.join(dir,item.name)):[path.join(dir,item.name)])}
const inputs=files(publicDir).filter(f=>path.basename(f)!=='sw.js');
const shell=inputs.map(f=>'/'+path.relative(publicDir,f).replaceAll('\\','/')).map(p=>p.endsWith('/index.html')?p.slice(0,-10):p).sort();
const hash=crypto.createHash('sha256');for(const file of inputs.sort()){hash.update(path.relative(publicDir,file));hash.update(fs.readFileSync(file))}
const template=fs.readFileSync(path.join(__dirname,'sw-template.js'),'utf8');
const version='paralelvr-attach-shell-'+hash.digest('hex').slice(0,16);
fs.writeFileSync(path.join(publicDir,'sw.js'),template.replace('__CACHE__',version).replace('__SHELL__',JSON.stringify(shell,null,2)));
console.log(JSON.stringify({cache:version,assets:shell.length}));
