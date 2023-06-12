import { Injectable } from '@nestjs/common';
import { ACCESS_TOKEN, PAGE_SIZE } from './constants/constants';
import Vibrant = require('node-vibrant');
// eslint-disable-next-line @typescript-eslint/no-var-requires
import fetch from 'node-fetch';

interface heroListItem {
  id: number;
  name: string;
  url: string;
  dominantColor: number[];
}

@Injectable()
export class AppService {
  async getListOfHeroes(page = 1): Promise<any> {
    const heroes = [];
    const startIndex = (page - 1) * PAGE_SIZE + 1;
    const endIndex = startIndex + PAGE_SIZE - 1;
    const promises = [];

    for (let index = startIndex; index <= endIndex; index++) {
      const heroPromise = fetch(
        `https://superheroapi.com/api/${ACCESS_TOKEN}/${index}/image`,
      )
        .then((response) => response.json())
        .then((hero: heroListItem) => {
          return Vibrant.from(hero.url)
            .getPalette()
            .then((palette) => {
              hero.dominantColor = palette.Vibrant.rgb;
              return hero;
            })
            .catch((error) => {
              console.log(error);
              console.log(hero);
              hero.dominantColor = [255, 199, 125];
              return hero;
            });
        });

      promises.push(heroPromise);
    }

    await Promise.all(promises)
      .then((result) => {
        heroes.push(...result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    return heroes;
  }

  async getHero(id: number): Promise<any> {
    const hero = await fetch(
      `https://superheroapi.com/api/${ACCESS_TOKEN}/${id}`,
    )
      .then((response) => response.json())
      .then((result) => result);
    console.log(hero);
    return hero;
  }
}
