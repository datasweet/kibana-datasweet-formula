import expect from 'expect.js';
import ngMock from 'ng_mock';
import 'ui/private';
import { FormulaParserProvider } from '../../decorators/lib/formula_parser';
import func from '../cusum';

describe('Cusum', ()  => {
  let FormulaParser;

  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private) {
    FormulaParser = Private(FormulaParserProvider);
  }));

  it('should work', () => {
    const parser = new FormulaParser();
    parser.addFunc(func);
    expect(parser.evaluate('cusum()')).to.equal(null);
    expect(parser.evaluate('cusum(2)')).to.equal(2);
    expect(parser.evaluate('cusum(1,2,3,4,5,6,7)')).to.eql([1,3,6,10,15,21,28]);
    expect(parser.evaluate('cusum(serie)', { serie: [1,2,3,4,5,6,7]})).to.eql([1,3,6,10,15,21,28]);
  });
});