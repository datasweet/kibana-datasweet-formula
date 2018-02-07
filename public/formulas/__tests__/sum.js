import expect from 'expect.js';
import ngMock from 'ng_mock';
import 'ui/private';
import { FormulaParserProvider } from '../../decorators/lib/formula_parser';
import func from '../sum';

describe('sum', ()  => {
  let FormulaParser;

  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private) {
    FormulaParser = Private(FormulaParserProvider);
  }));

  it('should work', () => {
    const parser = new FormulaParser();
    parser.addFunc(func);
    expect(parser.evaluate('sum()')).to.equal(0);
    expect(parser.evaluate('sum(2)')).to.equal(2);
    expect(parser.evaluate('sum(1,2,3,4,5,6,7)')).to.equal(28);
    expect(parser.evaluate('sum(serie)', { serie: [1,2,3,4,5,6,7]})).to.equal(28);
  });
});
