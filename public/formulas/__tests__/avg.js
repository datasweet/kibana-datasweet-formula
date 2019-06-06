import expect from 'expect.js';
import ngMock from 'ng_mock';
import 'ui/private';
import { formulaParser } from '../../decorators/lib/formula_parser';
import func from '../avg';

describe('average', ()  => {
  beforeEach(ngMock.module('kibana'));

  it('should work', () => {
    const parser = formulaParser;
    parser.addFunc(func);
    expect(parser.evaluate('avg()')).to.equal(null);
    expect(parser.evaluate('avg(2)')).to.equal(2);
    expect(parser.evaluate('avg(1,2,3,4,5,6,7)')).to.equal(4);
    expect(parser.evaluate('avg(serie)', { serie: [1,2,3,4,5,6,7]})).to.equal(4);
  });
});
