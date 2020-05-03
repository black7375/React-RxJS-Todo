import React, { useState, useCallback, useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { stylesBind } from '../Tools/Tools';
import TodoService from '../Services/TodoService';
import styles from './TodoInsert.module.scss';

const cx = stylesBind(styles);

const TodoInsert = () => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }, []);
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    if (value === '') {
      inputRef.current?.focus();
    } else {
      TodoService.onInsert(value);
      setValue(''); // value Init
    }

    // submit's reload event blocking.
    e.preventDefault();
  }, [value]
  );

  return (
    <form className={cx('TodoInsert')} onSubmit={onSubmit} >
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
