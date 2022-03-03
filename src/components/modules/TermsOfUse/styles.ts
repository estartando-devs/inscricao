import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  left: 0;
  bottom: 10px;
  overflow: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const SectionContainer = styled.section`
  display: flex;
  justify-content: center;
  padding: 1rem;
  gap: 2rem;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.background.default};
  height: 100%;
  border-radius: 0.25rem;
  box-shadow: 0rem 1rem 2rem -0.25rem rgba(0, 0, 0, 0.25);

  @media (max-width: 425px) {
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    text-align: center;
  }
`;

export const HeadingSection = styled.section`
  padding: 1rem 0;
  text-align: center;
  h2 {
    font-size: 1.75rem;
    line-height: 1.75rem;
    margin: 0;
  }
  small {
    color: #777;
    text-align: center;

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

export const ContentAccept = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;

  @media (max-width: 425px) {
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    text-align: center;
  }

  button {
    cursor: pointer;
    &:hover {
      box-shadow: 0rem 0rem 1rem -0.125rem rgba(0, 0, 0, 0.1);
      transform: translateY(-0.5rem);
    }
  }
  small {
    color: #777;
    margin-right: 1rem;
  }
`;
