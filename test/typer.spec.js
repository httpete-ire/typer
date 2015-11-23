describe('typer directive', function() {
  var element;
  var scope;
  var compile;
  var $scope;

  function render(template, _scope_) {
    var el = angular.element(template);
    el = compile(el)(_scope_);

    scope = el.isolateScope();

    scope.$apply();
    return el;
  }

  beforeEach(module('typer'));

  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope.$new();

    $scope.words = ['test1', 'test2', 'test3'];

    $scope.start = false;

    $scope.repeat = 'true';

    compile = $compile;

    var template = '<typer words="words" repeat="repeat"></typer>';

    element = render(template, $scope);
  }));

  it('should be defined', function() {
    expect(scope).to.be.defined;
    expect(element).to.be.defined;
  });

  it('should contain an array of words', function() {
    expect(scope.words).to.be.instanceof(Array);
  });

  it('should have a repeat setting', function() {
    expect(scope.repeat).to.be.true;
  });

  it('repeat setting should default to true', function() {
    var template = '<typer words="[]"></typer>';
    element = render(template, $scope);
    expect(scope.repeat).to.be.true;
  });

  it('timer settings should have a default value', function() {
    expect(scope.pause).to.be.defined;
  });

  it('shuffle should default to false', function() {
    expect(scope.shuffle).to.be.false;
  });

  it('cursor should have a default value', function() {
    expect(scope.getCursor()).to.equal('|');
  });

  describe('startTyping', function() {

    beforeEach(function() {
      var template = '<typer words="words" repeat="true" start-typing="true"></typer>';
      element = render(template, $scope);
    });

    it('initally the element should be empty', function() {
      var result = element.find('span').html();
      expect(result).to.equal('');
    });

  });

  describe('boolean attributes', function() {

    beforeEach(function() {

      $scope.shuffle = 'true';

      var template = '<typer words="words" repeat="true" shuffle="shuffle"></typer>';
      element = render(template, $scope);
    });

    it('shuffle on scope should be true', function() {
      expect(scope.shuffle).to.be.true;
    });

  });

  describe('start trigger', function () {
    beforeEach(function() {
      var template = '<typer words="words" start="true" start-trigger="start"></typer>';
      element = render(template, $scope);
    });

    it('start and trigger should be set on scope', function() {
      expect(scope.startTrigger).to.be.false;
    });
  });

});
