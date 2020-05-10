import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

import { TYPE } from '../constants';

const options = Object.keys(TYPE).map(type => ({ text: type, value: type }));

const defaultForm = () => ({
  type: '',
  description: '',
  date: Date.now(),
});

const FormModal = ({ store }) => {
  const [form, setForm] = useState(defaultForm());

  const onClose = () => {
    store.setEditId(null);
    setForm(defaultForm());
    store.setFormOpen(false);
  };

  const onChange = (event, data) => {
    const { value, name } = data;
    setForm(form => ({ ...form, [name]: value }));
  };

  const onDateChange = date => {
    onChange(null, { value: date, name: 'date' });
  };

  const onSubmit = () => {
    if (store.formEntry) {
      store.editEntry(form);
    } else {
      store.addEntry(form);
    }
    onClose();
  };

  useEffect(() => {
    if (store.formEntry) {
      const { id, date, type, description } = store.formEntry;
      setForm({
        id,
        date: new Date(date),
        type,
        description,
      });
      store.setFormOpen(true);
    }
  }, [store]);

  return (
    <Modal
      open={store.formOpen}
      onClose={onClose}
      trigger={
        <Button
          floated="right"
          circular
          icon="plus"
          onClick={() => store.setFormOpen(true)}
        />
      }
    >
      <Modal.Header>
        {store.formEntry ? 'Edit' : 'Add'} Diary Entry
      </Modal.Header>
      <Modal.Content>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label>Date</label>
            <DatePicker
              selected={form.date}
              onChange={onDateChange}
              showTimeSelect
              timeFormat="hh:mm aa"
              timeIntervals={15}
              maxDate={Date.now()}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </Form.Field>
          <Form.Select
            label="Type"
            name="type"
            options={options}
            onChange={onChange}
            value={form.type}
          />
          <Form.TextArea
            label="Description"
            name="description"
            rows={10}
            value={form.description}
            onChange={onChange}
          />
          <Form.Button
            color="green"
            type="submit"
            disabled={!form.type || !form.description}
            content="Submit"
          />
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default FormModal;
