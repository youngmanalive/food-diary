import React from 'react';
import { Header, Accordion } from 'semantic-ui-react';

import { useActiveIndex } from '../hooks/useActiveIndex';
import Entry from './entry';

const Day = ({ data, store }) => {
  const [active, setActive] = useActiveIndex();
  const { entries, header } = data;

  const sorted = Object.values(entries).sort((a, b) => a.date.diff(b.date));

  return (
    <React.Fragment>
      <Header as="h3">{header}</Header>
      <Accordion.Accordion>
        {sorted.map(entry => (
          <Entry
            key={entry.id}
            entry={entry}
            isActive={active === entry.id}
            setActive={setActive}
            store={store}
          />
        ))}
      </Accordion.Accordion>
    </React.Fragment>
  );
};

export default Day;
