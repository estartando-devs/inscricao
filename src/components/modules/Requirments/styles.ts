import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  left: 0;
  bottom: 20px;
  overflow: auto;
  backdrop-filter: blur(5px);
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
`;

export const SectionContainer = styled.section`
  display: flex;
  padding: 1rem 2rem;
  max-width: 1000px ;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 0.25rem;
  box-shadow: 0rem 1rem 2rem -0.25rem rgba(0, 0, 0, 0.25);
  flex-direction: column;

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }

  ul{
    display: flex;
    flex-direction: column;
    padding: 0 0 0 1rem;
    margin-bottom: 1rem ;
    gap: 0.5rem;
  }

  strong {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  button {
    cursor: pointer;
    &:hover {
      box-shadow: 0rem 0rem 1rem -0.125rem rgba(0, 0, 0, 0.1);
      transform: translateY(-0.2rem);
    }
  }
`;
