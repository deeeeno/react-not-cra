module.exports = function myPlugin(){
  return{
    visitor:{
      Identifier(path){
        //path로 코드 트리 노드에 접근할 수 있군!
        const name = path.node.name;
        console.log(name);
        path.node.name = name.split("").reverse().join("");
        
      },
      VariableDeclaration(path){
        console.log(`kind -> : ${path.node.kind}`);
        if(path.node.kind === "const") path.node.kind = 'var';
      }
    }
  }
}