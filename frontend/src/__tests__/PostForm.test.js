import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import API from '../services/api';
import PostForm from '../components/PostForm';

jest.mock('../services/api');

describe('PostForm', () => {
  it('envoie le formulaire avec succès et réinitialise les champs', async () => {
    const mockOnPostCreated = jest.fn();
    API.post.mockResolvedValue({ data: { title: 'Test', content: 'Contenu test' } });

    render(<PostForm onPostCreated={mockOnPostCreated} />);

    // Remplir le formulaire
    fireEvent.change(screen.getByPlaceholderText('Titre'), {
      target: { value: 'Test', name: 'title' },
    });
    fireEvent.change(screen.getByPlaceholderText('Contenu'), {
      target: { value: 'Contenu test', name: 'content' },
    });

    fireEvent.click(screen.getByText('Publier'));

    await waitFor(() => {
      expect(API.post).toHaveBeenCalledWith('/posts', {
        title: 'Test',
        content: 'Contenu test',
      });
      expect(mockOnPostCreated).toHaveBeenCalled();
      expect(screen.getByPlaceholderText('Titre').value).toBe('');
      expect(screen.getByPlaceholderText('Contenu').value).toBe('');
    });
  });

  it("affiche une alerte et log l'erreur si l'API échoue", async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    API.post.mockRejectedValue(new Error('Erreur API'));

    render(<PostForm onPostCreated={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText('Titre'), {
      target: { value: 'Erreur', name: 'title' },
    });
    fireEvent.change(screen.getByPlaceholderText('Contenu'), {
      target: { value: 'Échec test', name: 'content' },
    });

    fireEvent.click(screen.getByText('Publier'));

    await waitFor(() => {
      expect(API.post).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      expect(alertSpy).toHaveBeenCalledWith("Erreur lors de la création de l'article.");
    });

    consoleSpy.mockRestore();
    alertSpy.mockRestore();
  });
});
