import React from 'react';
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border: 2px dashed ${({ theme }) => theme.yellow};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  background: ${({ theme }) => theme.bg_light || "#1e1e1e"};
  transition: all 0.3s ease-in-out;
`;

const StyledImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 16px;
  background: ${({ theme }) => theme.black + 50};
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
`;

const InfoText = styled.p`
  font-size: 16px;
  font-weight: 400;
  opacity: 0.8;
`;

const GeneratedImageCard = ({ src, loading }) => {
  return (
    <Container>
      {loading ? (
        <>
          <CircularProgress
            sx={{ color: "inherit" }}
          />
          <InfoText>Generating your image...</InfoText>
        </>
      ) : src ? (
        <StyledImage src={src} alt="Generated" />
      ) : (
        <InfoText>🖋️ Write a prompt to generate an image</InfoText>
      )}
    </Container>
  );
};

export default GeneratedImageCard;
