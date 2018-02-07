import expect from 'expect.js';
import ngMock from 'ng_mock';
import 'ui/private';
import { FormulaParserProvider } from '../../decorators/lib/formula_parser';
import func from '../mvavg';

describe('mvavg', ()  => {
  let FormulaParser;

  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private) {
    FormulaParser = Private(FormulaParserProvider);
  }));

  it('should work with defaults', () => {
    const parser = new FormulaParser();
    parser.addFunc(func);
    expect(parser.evaluate('mvavg(serie)', { serie: [10, 20, 30, 40, 50]})).to.eql([null, 20, 30, 40, null]);
  });

  it('should work with center', () => {
    const parser = new FormulaParser();
    parser.addFunc(func);
    expect(parser.evaluate('mvavg(serie,"center")', { serie: [10, 20, 30, 40, 50]})).to.eql([null, 20, 30, 40, null]);
  });

  it('should work with left', () => {
    const parser = new FormulaParser();
    parser.addFunc(func);
    expect(parser.evaluate('mvavg(serie,"left")', { serie: [10, 20, 30, 40, 50]})).to.eql([null, null, 20, 30, 40]);
  });

  it('should work with right', () => {
    const parser = new FormulaParser();
    parser.addFunc(func);
    expect(parser.evaluate('mvavg(serie,"right")', { serie: [10, 20, 30, 40, 50]})).to.eql([20, 30, 40, null, null]);
  });
});