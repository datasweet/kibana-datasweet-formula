import expect from 'expect.js';
import ngMock from 'ng_mock';
import 'ui/private';
import { formulaParser } from '../../decorators/lib/formula_parser';
import func from '../ifnan';

describe('ifnan', ()  => {
  let FormulaParser;

  beforeEach(ngMock.module('kibana'));

  it('should work', () => {
    const parser = formulaParser;
    parser.addFunc(func);
    expect(parser.evaluate('ifnan(series,10)', { series: [1,NaN,3] })).to.eql([1,10,3]);
  });
});
