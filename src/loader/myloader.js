module.exports = function myloader(content){
  return content.replace('console.log(','alert(');
}