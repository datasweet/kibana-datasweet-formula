import expect from 'expect.js';
import ngMock from 'ng_mock';
import 'ui/private';
import { FormulaParserProvider } from '../../decorators/lib/formula_parser';
import func from '../prev';

describe('prev', ()  => {
  let FormulaParser;

  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private) {
    FormulaParser = Private(FormulaParserProvider);
  }));

  it('should work', () => {
    const parser = new FormulaParser();
    parser.addFunc(func);
    expect(parser.evaluate('prev()')).to.equal(null);
    expect(parser.evaluate('prev(2)')).to.equal(null);
    expect(parser.evaluate('prev(1,2,3,4,5,6,7)')).to.eql([null,1,2,3,4,5,6]);
    expect(parser.evaluate('prev(serie)', { serie: [1,2,3,4,5,6,7]})).to.eql([null,1,2,3,4,5,6]);
  });
});
