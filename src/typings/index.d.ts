declare module '*.png';

interface Progrma {
  album_id: string;
  file_net_low_url2: string;
  file_size: number;
  file_url: string;
  is_encrypt: number;
  is_gain: string;
  need_download: number;
  play_num: number;
  program_id: string;
  program_name: string;
  program_type: number;
  replay_num: number;
  thumbs_num: number;
  update_time: string;
}

interface AlbumInfo {
  albumInfo: {
    album_author_id: string;
    album_author_name: string;
    album_desc: string | null;
    album_id: string;
    album_title: string;
    has_article: number;
    is_free: number;
    is_gain: string;
    play_num: number;
    price: string;
    replay_num: number;
    scale: number;
    serialize_status: number;
    thumbs_num: number;
    title_file_url: string | null;
    update_time: number;
  };
  albumTagList: {tag_name: string}[];
  programList: Progrma[];
}
