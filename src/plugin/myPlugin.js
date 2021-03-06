class FileListPlugin {
  static defaultOptions = {
    outputFile: 'assets.md',
  };

  //플러그인의 옵션은 컨스트럭터를 통해 챙기기
  constructor(options = {}) {

    //기본 옵션의 경우 객체를 하나 만들어두고(이 클래스의 defaultOption 처럼)
    //이 객체와 유저 옵션을 합치는 방식을 사용하자!
    this.options = { ...FileListPlugin.defaultOptions, ...options };
  }

  apply(compiler) {
    const pluginName = FileListPlugin.name;
    //webpack module 인스턴스는 compiler 객체로부터 가져온다.
    //이런 방식으로 webpack module 인스턴스를 가져오면 올바른 버전의 인스턴스를 가져올 수 있다.
    //직접적으로 import 금지! compiler에서 가져오기.
    const { webpack } = compiler;

    // Compilation object gives us reference to some useful constants.
    const { Compilation } = webpack;

    //RawSource는 컴파일 후 결과물인 sources에 관한 클래스 중 하나. 결과물을 만드는데 사용함(?)
    const { RawSource } = webpack.sources;


    //compiler의 hook 중 thisCompilation 훅은 이전 단계에 대해서 단계를 추가하는 훅이다.
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {

      //compilations엔 여러가지 훅들이 있는데 그 중 processAssets 이전 단계에 추가하는 것이다.
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,

          // Using one of the later asset processing stages to ensure
          // that all assets were already added to the compilation by other plugins.
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          // generating content for our Markdown file.
          //processAssets 훅의 콜백함수
          //변수로 assets를 가지는데 이는 로더를 통한 번들 결과물이다. 
          //assets은 객체로 번들 파일의 이름을 key로 가진다. 번들의 결과물은 source함수에 저장되어있음.
        
          /*
          for(const filename of Object.keys(assets)){
            console.log(filename);
            console.log(assets[filename].source());
          }
          */
          const content =
            '# In this build:\n\n' +
            Object.keys(assets)
              .map((filename) => `- ${filename}`)
              .join('\n');

          // Adding new asset to the compilation, so it would be automatically
          // generated by the webpack in the output directory.
          //새로운 asset 즉 결과물을 만들기 위해선 compilation객체의 emitAsset 메소드를 이용한다.
          //첫 번째 인자로 파일 이름, 두 번째 인자는 파일에 기록할 source 객체이다.
          compilation.emitAsset('hi.md',new RawSource('this is dino plugin'));
          compilation.emitAsset(
            this.options.outputFile,
            new RawSource(content)
          );
        }
      );
    });
  }
}
module.exports = FileListPlugin;