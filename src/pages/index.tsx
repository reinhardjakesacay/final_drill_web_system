import React from "react";
import useSWR from 'swr';
import axios from 'axios';
import Main from "@/layout/mainLayout";
import { Container, Typography, Box, Paper } from '@material-ui/core';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Post {
  title: string;
  content: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  post: Post[];
}

const Home: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <Container className='profile-section' style={{ padding: '2rem', maxWidth: '800px' }}>
        <Box component={Paper} p={4} mb={4} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
          <Typography variant="h3" gutterBottom style={{ color: 'white' }}>{data.name}</Typography>
          <Typography variant="h6" gutterBottom style={{ color: 'white' }}>{data.email}</Typography>
          <Typography variant="body2" gutterBottom style={{ color: 'white' }}>{data.bio}</Typography>
        </Box>
        <Typography variant="h6" gutterBottom style={{ marginTop: '2rem', color: 'white' }}>Posts</Typography>
        {data.post.map((post, index) => (
          <Box key={index} component={Paper} p={2} mb={3} style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
            <Typography variant="h6" gutterBottom style={{ color: 'white' }}>{post.title}</Typography>
            <Typography variant="body2" gutterBottom style={{ color: 'white' }}>{post.content}</Typography>
          </Box>
        ))}
      </Container>
    </Main>
  );
};

export default Home;
