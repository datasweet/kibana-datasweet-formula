import expect from '@kbn/expect';
import { formulaParser } from '../formula_parser';

describe('Formula Parser', () => {
  it('unary operators must be wrapped', () => {
    expect(formulaParser.evaluate('sqrt(9)')).to.equal(3);
    expect(formulaParser.evaluate('sqrt(agg1)', { agg1: [4, 9, 16] })).to.eql([2, 3, 4]);
  });

  it('binary operators must be wrapped', () => {
    const agg1 = [3, 4, 6];
    const agg2 = [10, 2, 7];
    const agg3 = [8, 2];

    expect(formulaParser.evaluate('10 - 2')).to.equal(8);
    expect(formulaParser.evaluate('agg1 - 2', { agg1 })).to.eql([1, 2, 4]);
    expect(formulaParser.evaluate('10 - agg1', { agg1 })).to.eql([7, 6, 4]);
    expect(formulaParser.evaluate('agg1 - agg2', { agg1, agg2 })).to.eql([-7, 2, -1]);
    expect(formulaParser.evaluate('agg1 - agg3', { agg1, agg3 })).to.eql([-5, 2, 6]);
    expect(formulaParser.evaluate('agg3 - agg1', { agg1, agg3 })).to.eql([5, -2, -6]);
  });

  it('ternary ops condition must be deactivated', () => {
    expect(function () {
      formulaParser.evaluate('true ? 1 : 0');
    }).to.throwException(/\?/);
  });
});
