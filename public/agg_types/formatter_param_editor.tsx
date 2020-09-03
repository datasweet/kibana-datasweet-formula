import React, { Fragment } from 'react';
// import { i18n } from '@kbn/i18n';
import { formatter } from './formatter';

function FormatterParamEditor(props) {

  const { aggParam, setValue, value } = props;

  console.log(value);
  /**
   * Prevent a change to vis editor
   *
   * @param {string} id
   * @param {{
   *  pattern?: string
   * }} [options]
   */
  const onChange = (id, { pattern }) => {
    setValue(formatter(id, { pattern }));
  };

  /**
   * Set the format (use only for numeral)
   *
   * @param event
   */
  const setFormat = (event) => {
    onChange(value.id, { pattern: event.target.value });
  };

  /**
   * Set a formatter
   *
   * @param event
   */
  const setFormatter = (event) => {
    onChange(event.target.value, value.params);
  };

  return (
    <Fragment>
      <div className="form-group">
        <label>Formatter</label>
        <select className="form-control" onChange={setFormatter} value={value.id}>
          {
            aggParam.options.formatters.map((formatter) =>
              <option key={formatter.id} value={formatter.id}>{ formatter.title }</option>
            )
          }
        </select>
      </div>

    {
      value.id === 'numeral' &&
      <div className="form-group">
          <label>Numeral format</label>
          <div>
            <input type="text" onChange={setFormat} className="form-control" value={value.params.pattern} />
          </div>
        </div>
    }
    </Fragment>
  );
}

export { FormatterParamEditor };