import React from 'react';
import { Container, Icon, Header, Accordion, Loader } from 'semantic-ui-react';

import { useActiveIndex } from './hooks/useActiveIndex';
import { useDiary } from './hooks/useDiary';
import Day from './components/day';
import FormModal from './components/formModal';

const App = () => {
  const [active, setActive] = useActiveIndex();
  const store = useDiary();

  if (store.loading) {
    return <Loader active />;
  }

  return (
    <Container>
      <FormModal store={store} />
      <Header as="h1">Food Diary</Header>
      <Accordion styled fluid>
        {store.diary.map(([day, data]) => (
          <React.Fragment key={day}>
            <Accordion.Title
              active={active === day}
              index={day}
              onClick={setActive}
            >
              <Icon name="dropdown" />
              {data.title}
            </Accordion.Title>
            <Accordion.Content active={active === day}>
              <Day data={data} store={store} />
            </Accordion.Content>
          </React.Fragment>
        ))}
      </Accordion>
    </Container>
  );
};

export default App;
