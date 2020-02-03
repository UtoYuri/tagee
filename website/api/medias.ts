import { genFakeData } from '../routes/Home/medias';
import fetch from '../utils/fetch';

export const fetchMedias = async (_key: string|null=null): Promise<Media[]> => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // return genFakeData(100);
  const medias: Media[] = await fetch("http://yuri.local/api/media/");
  return medias;
};