import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import { GetPosts } from "../api";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  padding: 30px;
  padding-bottom: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const HeadLine = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Span = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled.div`
  display: grid;
  width: 100%;
  gap: 20px;
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 4px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 10px;
  }
`;

const Message = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 1.1rem;
  text-align: center;
  margin-top: 40px;
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPost, setFilteredPost] = useState([]);

  const getPosts = async () => {
    setLoading(true);
    try {
      const res = await GetPosts();
      const data = res?.data?.data;
      setPosts(data);
      setFilteredPost(data);
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredPost(posts);
      return;
    }

    const lowerSearch = search.toLowerCase();
    const filtered = posts.filter((post) => {
      const promptMatch = post?.prompt?.toLowerCase().includes(lowerSearch);
      const authorMatch = post?.name?.toLowerCase().includes(lowerSearch);
      return promptMatch || authorMatch;
    });

    setFilteredPost(filtered);
  }, [search, posts]);

  return (
    <Container>
      <HeadLine>
        Explore popular posts in the Community!
        <Span>⦾ Generated with AI ⦾</Span>
      </HeadLine>

      <SearchBar
        search={search}
        handleChange={(e) => setSearch(e.target.value)}
      />

      <Wrapper>
        {error && <Message style={{ color: "red" }}>{error}</Message>}

        {loading ? (
          <CircularProgress />
        ) : (
          <CardWrapper>
            {filteredPost.length > 0 ? (
              filteredPost
                .slice()
                .reverse()
                .map((item, index) => (
                  <ImageCard
                    key={index}
                    item={item}
                    large={index === 0} // make last item large (now rendered first)
                  />
                ))
            ) : (
              <Message>No Posts Found 😞</Message>
            )}
          </CardWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
