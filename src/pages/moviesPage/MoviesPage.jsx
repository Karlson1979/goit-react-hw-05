import React, { useState } from 'react';
import axios from 'axios';

const MoviesPage = () => {
    const [search, setSearch] = useState(''); // Строка поиска
    const [movies, setMovies] = useState([]); // Массив с результатами поиска фильмов
    const [error, setError] = useState(''); // Ошибка, если что-то пойдет не так

    const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTE3ZTYwMWIzMWQwYzNmOTQ1Y2UxMzI4YTYzNTUyOCIsIm5iZiI6MTcyNjA0Mzc2Ni42MzMxODgsInN1YiI6IjY2ZTE0ZjI3NDVlYzhhN2VkN2FmZTc1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dxlPzrbGefKwDvO72FHRFQUtAU-D2YVwtqqkA7HvKM8'; // Ваш API ключ

    // Обработчик изменения строки поиска
    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    // Обработчик отправки формы
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (search.trim() === '') {
            setError('Please enter a search term.');
            return;
        }

        setError(''); // Сбрасываем ошибку перед новым запросом

        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie`,
                {
                    params: {
                        query: search,
                        include_adult: false, // Исключаем взрослые фильмы
                        language: 'en-US', // Устанавливаем язык
                        page: 1, // Номер страницы
                    },
                    headers: {
                        Authorization: API_KEY, // Передача API-ключа через заголовок
                    },
                }
            );

            if (response.data.results && response.data.results.length > 0) {
                setMovies(response.data.results); // Обновляем список фильмов
            } else {
                setError('No results found.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="searchMovies"
                    value={search}
                    onChange={handleChange}
                    placeholder="Search for movies..."
                />
                <button type="submit">Search</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                {movies.length > 0 && (
                    <ul>
                        {movies.map((movie) => (
                            <li key={movie.id}>
                                <h3>{movie.title} ({movie.release_date?.split('-')[0]})</h3>
                                {movie.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt={movie.title}
                                        width="100"
                                    />
                                ) : (
                                    <p>No poster available</p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MoviesPage;
