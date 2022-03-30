import React, { Fragment } from 'react';
import { formatter } from './formatter';

function FormatterParamEditor(props: any) {
  const { aggParam, setValue, value } = props;

  /**
   * Prevent a change to vis editor
   *
   * @param {string} id
   * @param {{
   *  pattern?: string
   * }} [options]
   */
  const onChange = (id: string, pattern: any) => {
    setValue(formatter(id, { pattern }));
  };

  /**
   * Set the format (use only for numeral)
   *
   * @param event
   */
  const setFormat = (event: any) => {
    onChange(value.id, { pattern: event.target.value });
  };

  /**
   * Set a formatter
   *
   * @param event
   */
  const setFormatter = (event: any) => {
    onChange(event.target.value, value.params);
  };

  return (
    <Fragment>
      <div className="form-group">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Formatter</label>
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select className="form-control" onChange={setFormatter} value={value.id}>
          {aggParam.options.map((f: any) => (
            <option key={f.id} value={f.id}>
              {f.title}
            </option>
          ))}
        </select>
      </div>

      {value.id === 'numeral' && (
        <div className="form-group">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>Numeral format</label>
          <div>
            <input
              type="text"
              onChange={setFormat}
              className="form-control"
              value={value.params.pattern}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
}

export { FormatterParamEditor };
