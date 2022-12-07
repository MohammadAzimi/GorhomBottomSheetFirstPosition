import { faker } from '@faker-js/faker';
// import { faker } from '@faker-js/faker/locale/de';
faker.seed(120);

export const ZONES = [];

export function createRandomZone() {
  return {
    id: faker.datatype.uuid(),
    cityName: faker.address.cityName(),
    imageUrl: faker.image.city(480, 480, true),
  };
}

export function getZoneList() {
    if (ZONES.length === 0) {
      Array.from({ length: 20 }).forEach(() => {
          ZONES.push(createRandomZone());
      });
    }
    return ZONES;
}