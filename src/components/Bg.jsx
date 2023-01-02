import { PRIMARY_COLOR, SECONDARY_COLOR } from 'colors/common';
import styled from 'styled-components';

export default function Bg({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to left, ${PRIMARY_COLOR}, ${SECONDARY_COLOR});
  overflow: hidden;
  position: relative;
`;
