import expect from 'expect.js';
import ngMock from 'ng_mock';
import 'ui/private';
import { FormulaParserProvider } from '../../decorators/lib/formula_parser';
import func from '../avg';

describe('average', ()  => {
  let FormulaParser;

  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private) {
    FormulaParser = Private(FormulaParserProvider);
  }));

  it('should work', () => {
    const parser = new FormulaParser();
    parser.addFunc(func);
    expect(parser.evaluate('avg()')).to.equal(null);
    expect(parser.evaluate('avg(2)')).to.equal(2);
    expect(parser.evaluate('avg(1,2,3,4,5,6,7)')).to.equal(4);
    expect(parser.evaluate('avg(serie)', { serie: [1,2,3,4,5,6,7]})).to.equal(4);
  });
});
