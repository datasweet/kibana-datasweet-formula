import expect from 'expect.js';
import ngMock from 'ng_mock';
import 'ui/private';
import { FormulaParserProvider } from '../formula_parser';

describe('Formula Parser', () => {
  let FormulaParser;

  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private) {
    FormulaParser = Private(FormulaParserProvider);
  }));


  it('unary operators must be wrapped', () => {
    const parser = new FormulaParser();
    expect(parser.evaluate('sqrt(9)')).to.equal(3);
    expect(parser.evaluate('sqrt(agg1)', { 'agg1': [4,9,16]})).to.eql([2,3,4]);
  });

  it('binary operators must be wrapped', () => {
    const parser = new FormulaParser();
    const agg1 = [3,4,6];
    const agg2 = [10,2,7];
    const agg3 = [8,2];

    expect(parser.evaluate('10 - 2')).to.equal(8);
    expect(parser.evaluate('agg1 - 2', { agg1 })).to.eql([1,2,4]);
    expect(parser.evaluate('10 - agg1', { agg1 })).to.eql([7,6,4]);
    expect(parser.evaluate('agg1 - agg2', { agg1, agg2 })).to.eql([-7,2,-1]);
    expect(parser.evaluate('agg1 - agg3', { agg1, agg3 })).to.eql([-5,2,6]);
    expect(parser.evaluate('agg3 - agg1', { agg1, agg3 })).to.eql([5,-2,-6]);
  });

  it('ternary ops condition must be deactivated', () => {
    const parser = new FormulaParser();
    expect(function () {
      parser.evaluate('true ? 1 : 0');
    }).to.throwException(/\?/);
  });
});