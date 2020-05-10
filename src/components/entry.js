import React from 'react';
import { Icon, Button, Accordion } from 'semantic-ui-react';

import { DATE_FORMATS } from '../constants';

const Entry = ({ entry, isActive, setActive, store }) => {
  const handleDelete = event => {
    event.stopPropagation();
    store.removeEntry(entry.id);
  };

  const handleEdit = event => {
    event.stopPropagation();
    store.setEditId(entry.id);
  }

  return (
    <React.Fragment>
      <Accordion.Title active={isActive} index={entry.id} onClick={setActive}>
        <Icon name="dropdown" />
        {entry.date.format(DATE_FORMATS.time)} — {entry.type}
        {isActive && (
          <div className="entryControls">
            <Button circular icon="pencil" size="mini" onClick={handleEdit} />
            <Button circular icon="trash" size="mini" onClick={handleDelete} />
          </div>
        )}
      </Accordion.Title>
      <Accordion.Content active={isActive}>
        {entry.description.split('\n').map((chunk, idx) => (
          <p key={idx}>{chunk}</p>
        ))}
      </Accordion.Content>
    </React.Fragment>
  );
};

export default Entry;
