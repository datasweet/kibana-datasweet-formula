import expect from 'expect.js';
import ngMock from 'ng_mock';
import 'ui/private';
import { FormulaParserProvider } from '../../decorators/lib/formula_parser';
import func from '../next';

describe('next', ()  => {
  let FormulaParser;

  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private) {
    FormulaParser = Private(FormulaParserProvider);
  }));

  it('should work', () => {
    const parser = new FormulaParser();
    parser.addFunc(func);
    expect(parser.evaluate('next()')).to.equal(null);
    expect(parser.evaluate('next(2)')).to.equal(null);
    expect(parser.evaluate('next(1,2,3,4,5,6,7)')).to.eql([2,3,4,5,6,7,null]);
    expect(parser.evaluate('next(serie)', { serie: [1,2,3,4,5,6,7]})).to.eql([2,3,4,5,6,7,null]);
  });
});
