"use client";

import React from 'react';
import { Container, Typography, TextField, Button, IconButton, Box, Paper, FormControl, InputLabel } from '@material-ui/core';
import { Formik, Form, Field, FieldArray } from 'formik';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Main from '@/layout/mainLayout';
import DeleteIcon from '@material-ui/icons/Delete';

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

const ProfilePage: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <Container className='w-1/2 justify-start' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Box component={Paper} p={4} style={{ backgroundColor: 'rgba(128, 128, 128, 0.7)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '8px', textAlign: 'center', width: '100%' }}>
          <Typography variant="h1" gutterBottom style={{ color: 'white' }}>Posts</Typography>
          <Formik
            initialValues={{ posts: data.post }}
            onSubmit={(values, actions) => {
              axios.put('/api/user', { ...data, post: values.posts })
                .then(res => {
                  mutate('/api/user', { ...data, post: values.posts }, false);
                  console.log('Posts updated successfully');
                })
                .catch(err => {
                  console.error('Error updating posts:', err);
                })
                .finally(() => {
                  actions.setSubmitting(false);
                });
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <FieldArray name="posts">
                  {({ push, remove }) => (
                    <div>
                      {values.posts.map((post, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                          <FormControl fullWidth style={{ margin: '1rem 1rem 1rem 0', textAlign: 'center' }}>
                            <InputLabel shrink style={{ color: 'darkgray', padding: '-10px 10px' , margin: '-10px'}}>
                              Title
                            </InputLabel>
                            <Field
                              name={`posts.${index}.title`}
                              as={TextField}
                              InputProps={{ style: { color: 'white' } }}
                              style={{ color: 'white' }}
                            />
                          </FormControl>
                          <FormControl fullWidth style={{ margin: '1rem 1rem 1rem 0', textAlign: 'center' }}>
                            <InputLabel shrink style={{ color: 'darkgray', padding: '-10px 10px' , margin: '-10px'}}>
                              Content
                            </InputLabel>
                            <Field
                              name={`posts.${index}.content`}
                              as={TextField}
                              InputProps={{ style: { color: 'white' } }}
                              style={{ color: 'white' }}
                            />
                          </FormControl>
                          <IconButton
                            onClick={() => remove(index)}
                            aria-label="delete"
                            style={{ color: 'white', margin: '1rem 0' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      ))}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => push({ title: '', content: '' })}
                      >
                        Add Post
                      </Button>
                    </div>
                  )}
                </FieldArray><br />
                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>Save</Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Main>
  );
}

export default ProfilePage;
