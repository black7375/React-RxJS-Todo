import React, { useState, useCallback, useRef } from 'react';
import { TodoItemT } from '../Generic/TodoModel';

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
      setValue(''); // value 값 초기화
    }

    // submit 이벤트는 브라우저에서 새로고침을 발생시킵니다.
    // 이를 방지하기 위해 이 함수를 호출합니다.
    e.preventDefault();
  }, [onInsert, value]
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit} >
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
      <button type="submit">
        추가
      </button>
    </form>
  )
}

export default TodoInsert;
