import expect from 'expect.js';
import ngMock from 'ng_mock';
import 'ui/private';
import { FormulaParserProvider } from '../../decorators/lib/formula_parser';
import func from '../derivative';

describe('derivative', ()  => {
  let FormulaParser;

  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private) {
    FormulaParser = Private(FormulaParserProvider);
  }));

  it('should work', () => {
    const parser = new FormulaParser();
    parser.addFunc(func);
    expect(parser.evaluate('derivative()')).to.equal(null);
    expect(parser.evaluate('derivative(2)')).to.equal(null);
    expect(parser.evaluate('derivative(1,2,7,4,5,6,3)')).to.eql([null,1,5,-3,1,1,-3]);
    expect(parser.evaluate('derivative(serie)', { serie: [1,2,7,4,5,6,3]})).to.eql([null,1,5,-3,1,1,-3]);
  });
});