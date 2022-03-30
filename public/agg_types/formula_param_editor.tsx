import React from 'react';

function FormulaParamEditor(props: any) {
  const { setValue, value } = props;

  /**
   * Prevent a change to vis editor
   *
   * @param event
   */
  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div className="editor-formula">
      <div className="form-group">
        <span className="hintbox-label">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>Formula Input</label>
        </span>
        <p>
          <textarea className="form-control" onChange={onChange} value={value} />
        </p>
      </div>
      <div className="vis-editor-agg-editor-advanced-toggle">
        <a
          className="kuiLink"
          href="http://www.datasweet.fr/datasweet-formula/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Accepted functions
        </a>
      </div>
    </div>
  );
}

export { FormulaParamEditor };
