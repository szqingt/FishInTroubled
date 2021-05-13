declare module '*.png';

interface Progrma {
  albumId: string;
  albumName: string;
  authorNickname: string;
  programId: string;
  programName: string;
  programPrice: number;
  hasProgram: number;
  updateTimeStr: string;
  outFileUrl: string;
}

interface AlbumInfo {
  authorNickname: string;
  albumDesc: string | null;
  albumId: string;
  albumName: string;
  hasAlbum: number;
  playNum: number;
  albumPrice: string;
  replyNum: number;
  scale: number;
  categoryName: string;
  categorySubName: string;
  serializeStatus: number;
  thumbsNum: number;
  titleFilePath: string | null;
  updateTimeStr: number;
  albumTag: string[];
}
