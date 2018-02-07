import expect from 'expect.js';
import ngMock from 'ng_mock';
import 'ui/private';
import { FormulaParserProvider } from '../../decorators/lib/formula_parser';
import func from '../count';

describe('count', ()  => {
  let FormulaParser;

  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private) {
    FormulaParser = Private(FormulaParserProvider);
  }));

  it('should work', () => {
    const parser = new FormulaParser();
    parser.addFunc(func);
    expect(parser.evaluate('count()')).to.equal(0);
    expect(parser.evaluate('count(1)')).to.equal(1);
    expect(parser.evaluate('count(1,2,3,4,5,6,7)')).to.equal(7);
    expect(parser.evaluate('count(serie)', { serie: [1,2,3,4,5,6,7]})).to.equal(7);
  });
});
