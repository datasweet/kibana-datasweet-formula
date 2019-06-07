import expect from 'expect.js';
import ngMock from 'ng_mock';
import 'ui/private';
import { formulaParser } from '../../decorators/lib/formula_parser';
import func from '../max';

describe('max', ()  => {
  let FormulaParser;

  beforeEach(ngMock.module('kibana'));

  it('should work', () => {
    const parser = formulaParser;
    parser.addFunc(func);
    expect(parser.evaluate('max()')).to.equal(null);
    expect(parser.evaluate('max(2)')).to.equal(2);
    expect(parser.evaluate('max(1,2,3,4,5,6,7)')).to.equal(7);
    expect(parser.evaluate('max(serie)', { serie: [1,2,3,4,5,6,7]})).to.equal(7);
  });
});
