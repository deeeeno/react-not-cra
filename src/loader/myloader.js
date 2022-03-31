module.exports = function myloader(content){
  return content.split('\n').filter((code)=>code.indexOf('console.log')===-1).join('\n');
}