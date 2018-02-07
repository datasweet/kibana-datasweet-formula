import expect from 'expect.js';
import ngMock from 'ng_mock';
import 'ui/private';
import { FormulaParserProvider } from '../../decorators/lib/formula_parser';
import func from '../filter';

describe('filter', ()  => {
  let FormulaParser;

  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private) {
    FormulaParser = Private(FormulaParserProvider);
  }));

  it('should work with infinity', () => {
    const parser = new FormulaParser();
    parser.addFunc(func);
    expect(parser.evaluate('filter(2,"infinity")')).to.equal(2);
    expect(parser.evaluate('filter(series, "infinity")', { series: [-5,0,5,Infinity] })).to.eql([-5,0,5,null]);
  });

  it('should work with negative', () => {
    const parser = new FormulaParser();
    parser.addFunc(func);
    expect(parser.evaluate('filter(2,"negative")')).to.equal(2);
    expect(parser.evaluate('filter(-2,"negative")')).to.equal(null);
    expect(parser.evaluate('filter(series, "negative")', { series: [-5,0,5,Infinity] })).to.eql([null,0,5,Infinity]);
  });

  it('should work with positive', () => {
    const parser = new FormulaParser();
    parser.addFunc(func);
    expect(parser.evaluate('filter(-2,"positive")')).to.equal(-2);
    expect(parser.evaluate('filter(2,"positive")')).to.equal(null);
    expect(parser.evaluate('filter(series, "positive")', { series: [-5,0,5,Infinity] })).to.eql([-5,0,null,null]);
  });

  it('should work with zero', () => {
    const parser = new FormulaParser();
    parser.addFunc(func);
    expect(parser.evaluate('filter(2,"zero")')).to.equal(2);
    expect(parser.evaluate('filter(0,"zero")')).to.equal(null);
    expect(parser.evaluate('filter(series, "zero")', { series: [-5,0,5,Infinity] })).to.eql([-5,null,5,Infinity]);
  });

  it('should work with wrong filter', () => {
    const parser = new FormulaParser();
    parser.addFunc(func);
    expect(parser.evaluate('filter(2,"azerty")')).to.equal(2);
    expect(parser.evaluate('filter(0,"azerty")')).to.equal(0);
    expect(parser.evaluate('filter(series, "azerty")', { series: [-5,0,5,Infinity] })).to.eql([-5,0,5,Infinity]);
  });
});
