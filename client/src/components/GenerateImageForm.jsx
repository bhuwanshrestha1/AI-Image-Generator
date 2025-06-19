import React from 'react'
import styled from "styled-components";
import Button from './button';
import TextInput from './TextInput';
import { AutoAwesome, CreateRounded } from '@mui/icons-material';
import { GenerateAIImage, CreatePosts } from "../api"; 
import { useNavigate } from 'react-router-dom';

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Actions = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
`;

const GenerateImageForm = ({
  post,
  setPost,
  createPostLoading,
  setCreatePostLoading,
  setGenerateImageLoading,
  generateImageLoading
}) => {

    const navigate = useNavigate()

  const generateImageFun = async () => {
    try {
      setGenerateImageLoading(true);
      const res = await GenerateAIImage({ prompt: post.prompt });

      if (res?.data?.url) {
        setPost({ ...post, photo: res.data.url });
      } else {
        alert("Failed to get image URL");
      }
    } catch (error) {
      console.error("Image generation failed:", error);
      alert("Image generation error");
    } finally {
      setGenerateImageLoading(false);
    }
  };

    const createPostFun = async () => {
    
      setCreatePostLoading(true);
      await CreatePosts(post)
      .then((res) => {
            alert("✅ Post uploaded successfully");
            navigate("/");
            setCreatePostLoading(false);
      })
        .catch( (error) => {
      console.error("Post creation error:", error);
      alert("❌ Post creation failed");
    })
 };

  return (
    <Form>
      <Top>
        <Title>Generate Image with Prompt</Title>
        <Desc>Write your prompt to generate an AI image.</Desc>
      </Top>

      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your name..."
          name="name"
          value={post.name}
          handleChange={(e) => setPost({ ...post, name: e.target.value })}
        />

        <TextInput
          label="Prompt"
          placeholder="Write a detailed prompt about the image..."
          name="prompt"
          rows="8"
          textArea
          value={post.prompt}
          handleChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />

        ** You can post the AI generated image to the Community **
      
      </Body>

      <Actions>
        <Button
          text="Generate Image"
          flex
          leftIcon={<AutoAwesome />}
          isLoading={generateImageLoading}
          isDisabled={post.prompt === ""}
          onClick={generateImageFun}
        />

        <Button
          text="Post Image"
          flex
          type="secondary"
          leftIcon={<CreateRounded />}
          isLoading={createPostLoading}
          isDisabled={post.name === "" || post.prompt === "" || post.photo === ""}
          onClick={createPostFun}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImageForm;
