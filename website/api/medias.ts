import { genFakeData } from '../routes/Home/medias';

export const fetchMedias = async (_key: string|null=null): Promise<Media[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return genFakeData(100);
};