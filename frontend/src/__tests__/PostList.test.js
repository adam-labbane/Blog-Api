import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import PostList from '../components/PostList';
import API from '../services/api';


jest.mock('../services/api');

describe('PostList - Cas succès', () => {
  it('affiche les articles retournés par l’API', async () => {
    const mockPosts = [
      {
        _id: '1',
        title: 'Premier post',
        content: 'Contenu du premier post',
        createdAt: new Date().toISOString(),
      },
      {
        _id: '2',
        title: 'Deuxième post',
        content: 'Contenu du deuxième post',
        createdAt: new Date().toISOString(),
      },
    ];

    API.get.mockResolvedValue({ data: mockPosts });

    render(<PostList reload={false} />);

    for (const post of mockPosts) {
      await waitFor(() => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.content)).toBeInTheDocument();
      });
    }
  });

  it('affiche rien mais log en cas d’erreur API', async () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  API.get.mockRejectedValue(new Error('Erreur API'));

  render(<PostList reload={false} />);

  await waitFor(() => {
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
  });

  consoleSpy.mockRestore();
});

});
