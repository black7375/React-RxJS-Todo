import React, { useState, useCallback, useRef } from 'react';
import { TodoItemT } from '../Generic/TodoModel';
import { AiOutlinePlus } from 'react-icons/ai';
import './TodoInsert.scss';

interface TodoInsertProps {
  onInsert: (text: TodoItemT['text']) => void;
}

const TodoInsert = ({ onInsert }: TodoInsertProps) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }, []);
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    if (value === '') {
      inputRef.current?.focus();
    } else {
      onInsert(value);
      setValue(''); // value Init
    }

    // submit's reload event blocking.
    e.preventDefault();
  }, [onInsert, value]
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit} >
      <input
        placeholder="Write Tasks!!"
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
      <button type="submit">
        <AiOutlinePlus />
      </button>
    </form>
  )
}

export default TodoInsert;
