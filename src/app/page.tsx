'use client';

import { Inter } from 'next/font/google';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { HttpQueryClient } from '@orbitalhq/orbital-client';
import { Observable } from 'rxjs';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {

  function loadData(): Observable<{
    'id' : number,
    'title' : string,
    'provider' : string,
    'cost' : number,
    'reviewScore' : number,
    'reviewText' : string
  }> {
    return new HttpQueryClient('http://localhost:9022').query(`import films.reviews.ReviewText
import films.reviews.FilmReviewScore
import films.StreamingProviderPrice
import films.StreamingProviderName
import film.types.Title
import films.FilmId
find { Film[] } as {
    id: FilmId
    title : Title

    // where can I watch this?
    provider: StreamingProviderName
    cost: StreamingProviderPrice

    // Is it any good?
    reviewScore: FilmReviewScore
    reviewText: ReviewText
}[]`);
  }


  function xloadData(): Observable<{
    id: string,
    title: string,
    provider: string,
    cost: number,
    reviewScore: number,
    reviewText: string
  }> {
    return new HttpQueryClient(`http://localhost:9022`).query(`import films.reviews.ReviewText
import films.reviews.FilmReviewScore
import films.StreamingProviderPrice
import films.StreamingProviderName
import film.types.Title
import films.FilmId
find { Film[] } as {
    id: FilmId
    title : Title

    // where can I watch this?
    provider: StreamingProviderName
    cost: StreamingProviderPrice

    // Is it any good?
    reviewScore: FilmReviewScore
    reviewText: ReviewText
}[]`);
  }

  const [films, setFilms] = useState<any[]>([]);

  useEffect(() => {
    loadData().subscribe(result => {
      setFilms(films.concat(result));
    });
  }, []);

  const headerClass = `py-3.5 px-3 text-left text-sm font-semibold text-gray-900 `
  const cellClass = `px-3 py-4 text-sm text-gray-500 text-ellipsis overflow-hidden`;
  return (
    <main className={styles.main}>
      <div className='mt-8 flow-root'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className={`min-w-full divide-y divide-gray-300`}>
              <thead className={'bg-gray-50'}>
              <tr>
                <th className={`headerClass`}>Film Id</th>
                <th className={`headerClass`}>Film title</th>
                <th className={`headerClass`}>Review Score</th>
                <th className={`headerClass`}>Review</th>
                <th className={`headerClass`}>Provider</th>
                <th className={`headerClass`}>Cost</th>
              </tr>

              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>

              {films.map((film, idx) => {
                return (<tr key={`row-${idx}`}>
                  <td className={cellClass}>{film.id}</td>
                  <td className={cellClass}>{film.title}</td>
                  <td className={cellClass}>{film.reviewScore}</td>
                  <td className={cellClass}>{film.reviewText}</td>
                  <td className={cellClass}>{film.provider}</td>
                  <td className={cellClass}>{film.cost}</td>
                </tr>);
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
