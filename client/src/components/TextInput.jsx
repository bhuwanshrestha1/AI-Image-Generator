import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  padding: 0px 4px;
  text-transform: uppercase;
`;

const OutlinedInput = styled.div`
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.text_secondary + 70};
  background-color: transparent;
  color: ${({ theme }) => theme.text_secondary};
  outline: none;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 14px;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text_secondary};
  resize: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  font-size: 14px;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text_secondary};
  resize: vertical;
`;

const TextInput = ({
  label,
  placeholder,
  name,
  value,
  handleChange,
  textArea,
  rows = 4,
  cols = 50,
}) => {
  return (
    <Container>
      {label && <Label htmlFor={name}>{label}</Label>}
      <OutlinedInput>
        {textArea ? (
          <TextArea
            id={name}
            name={name}
            rows={rows}
            cols={cols}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
        ) : (
          <Input
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
        )}
      </OutlinedInput>
    </Container>
  );
};

export default TextInput;
