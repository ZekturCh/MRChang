/* Adds only Attach's namespace to the live rules. No other rule or index is replaced. */
const fs=require('node:fs'),path=require('node:path');
const PROJECT='dbdosparax';
async function admin(){
 const root=process.env.FIREBASE_TOOLS_PATH;
 if(!root)throw Error('Set FIREBASE_TOOLS_PATH to the installed firebase-tools package directory.');
 const auth=require(path.join(root,'lib/auth')),account=auth.getGlobalDefaultAccount();
 if(!account)throw Error('Run firebase login first.');
 const token=await auth.getAccessToken(account.tokens.refresh_token,['https://www.googleapis.com/auth/cloud-platform']);
 return async (url,options={})=>{const r=await fetch(url,{...options,headers:{Authorization:'Bearer '+token.access_token,'Content-Type':'application/json',...options.headers}});const raw=await r.text();const body=raw?JSON.parse(raw):{};if(!r.ok)throw Error(r.status+' '+JSON.stringify(body));return body};
}
async function deploy(){
 const api=await admin(),origin='https://firebaserules.googleapis.com/v1/';
 const release=await api(origin+'projects/'+PROJECT+'/releases/cloud.firestore');
 const current=await api(origin+release.rulesetName);
 const file=current.source.files.find(f=>f.name==='firestore.rules');if(!file)throw Error('Unrecognized rules source');
 const snippet=fs.readFileSync(path.join(__dirname,'../infra/attach-ranking.rules'),'utf8').trim();
 let merged;
 const start=file.content.indexOf('// BEGIN PARALELVR_ATTACH_RANKING');
 if(start>=0){const end=file.content.indexOf('// END PARALELVR_ATTACH_RANKING',start);if(end<0)throw Error('Incomplete Attach marker');merged=file.content.slice(0,start)+snippet+file.content.slice(end+'// END PARALELVR_ATTACH_RANKING'.length)}
 else {const marker='    match /{document=**}';const i=file.content.lastIndexOf(marker);if(i<0)throw Error('Expected deny-all fallback not found; review manually');merged=file.content.slice(0,i)+snippet+'\n\n'+file.content.slice(i)}
 const source={files:current.source.files.map(f=>f===file?{...f,content:merged}:f)};
 const compile=await api(origin+'projects/'+PROJECT+':test',{method:'POST',body:JSON.stringify({source})});
 if((compile.issues||[]).some(i=>i.severity==='ERROR'))throw Error(JSON.stringify(compile.issues));
 const backup=process.argv[2];if(!backup)throw Error('Pass a private backup directory outside the repository.');
 fs.mkdirSync(backup,{recursive:true});fs.writeFileSync(path.join(backup,'rules-before-deploy.json'),JSON.stringify(current,null,2));fs.writeFileSync(path.join(backup,'release-before-deploy.json'),JSON.stringify(release,null,2));
 if(merged!==file.content){
  const created=await api(origin+'projects/'+PROJECT+'/rulesets',{method:'POST',body:JSON.stringify({source})});
  // Re-read before publishing, so concurrent changes cannot be silently discarded.
  const fresh=await api(origin+'projects/'+PROJECT+'/releases/cloud.firestore');if(fresh.rulesetName!==release.rulesetName)throw Error('Live rules changed concurrently; rerun against the new source.');
  await api(origin+'projects/'+PROJECT+'/releases/cloud.firestore',{method:'PATCH',body:JSON.stringify({release:{name:release.name,rulesetName:created.name},updateMask:'rulesetName'})});
 }
 const indexBase='https://firestore.googleapis.com/v1/projects/'+PROJECT+'/databases/(default)/collectionGroups/paralelvr_attach_scores/indexes';
 const fields=[{fieldPath:'score',order:'DESCENDING'},{fieldPath:'moves',order:'ASCENDING'},{fieldPath:'durationMs',order:'ASCENDING'},{fieldPath:'completedAt',order:'ASCENDING'}];
 const existing=await api(indexBase);
 const match=(existing.indexes||[]).find(i=>i.queryScope==='COLLECTION'&&fields.every((f,n)=>i.fields[n]?.fieldPath===f.fieldPath&&i.fields[n]?.order===f.order));
 const index=match||await api(indexBase,{method:'POST',body:JSON.stringify({queryScope:'COLLECTION',fields})});
 console.log(JSON.stringify({rules:'Attach namespace ready; existing rules preserved',index:index.name||index.metadata?.index||index.metadata?.['@type'],state:index.state||'CREATING'}));
}
module.exports={admin};if(require.main===module)deploy().catch(e=>{console.error(e.message);process.exit(1)});
