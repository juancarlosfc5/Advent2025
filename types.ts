export interface CardData {
  id: number;
  image: string;
  title: string;
  spotifyUrl: string;
  lyricSnippet: string;
  text: string;
  hint: string;
}

export interface CardJson {
  cards: CardData[];
}