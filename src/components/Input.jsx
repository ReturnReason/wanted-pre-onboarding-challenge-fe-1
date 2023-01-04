import styled from 'styled-components';

export default function Input({ required, value, ref, type, name, id, placeholder, onChange }) {
  return (
    <CustomInput
      required={required}
      ref={ref}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}

const CustomInput = styled.input`
  border: none;
  padding: 5px;
  padding-bottom: 8px;
  border-bottom: 2px solid #ad979850;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #b3adad;
    font-size: 12px;
  }
`;
