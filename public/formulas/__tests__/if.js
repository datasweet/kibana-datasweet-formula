import expect from 'expect.js';
import ngMock from 'ng_mock';
import 'ui/private';
import { FormulaParserProvider } from '../../decorators/lib/formula_parser';
import func from '../if';

describe('sum', ()  => {
  let FormulaParser;

  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private) {
    FormulaParser = Private(FormulaParserProvider);
  }));

  it('should work', () => {
    const parser = new FormulaParser();
    parser.addFunc(func);

    expect(parser.evaluate('if(true, 1, 0)')).to.equal(1);
    expect(parser.evaluate('if(false, 1, 0)')).to.equal(0);

    const cond = [true, false, true];
    const yes = [1,2,3];
    const no = [-1,-2,-3];

    expect(parser.evaluate('if(cond, 1, 0)', { cond })).to.eql([1,0,1]);
    expect(parser.evaluate('if(cond, yes, 0)', { cond, yes })).to.eql([1,0,3]);
    expect(parser.evaluate('if(cond, 1, no)', { cond, no })).to.eql([1,-2,1]);
    expect(parser.evaluate('if(cond, yes, no)', { cond, yes, no })).to.eql([1,-2,3]);
  });
});
