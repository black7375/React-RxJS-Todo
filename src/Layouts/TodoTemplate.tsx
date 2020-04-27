import React from 'react';

interface TodoTemplateProps {
  children?: React.ReactNode
}
type TodoTemplateT = React.FunctionComponent<TodoTemplateProps>

const TodoTemplate: TodoTemplateT = ({ children }) => {
  return (
    <div className="TodoTemplate">
      <div className="app-title">일정 관리</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default TodoTemplate;
