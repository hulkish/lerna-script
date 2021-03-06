const index = require('..'),
  intercept = require('intercept-stdout');

module.exports.asBuilt = (project, {label, log} = {}) => {
  return project.inDir(ctx => {
    const lernaPackages = index.loadPackages({log});
    lernaPackages.forEach(lernaPackage => index.changes.build(lernaPackage, {log})(label));
    ctx.exec('sleep 1'); //so that second would rotate
  });
};

module.exports.asGitCommited = project => {
  return project.inDir(ctx => {
    ctx.exec('git add -A && git commit -am "init"');
  });
};

module.exports.captureOutput = () => {
  let capturedOutput = "";
  let detach;

  beforeEach(() => detach = intercept(txt => {
    capturedOutput += txt;
  }));

  afterEach(() => {
    detach();
    capturedOutput = "";
  });


  return () => capturedOutput;
};
